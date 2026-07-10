import { mkdir, writeFile } from "node:fs/promises";
import { createConnection } from "node:net";
import { request } from "node:http";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const target = process.env.TARGET_URL || "https://brittanychiang.com/";
const captureName = process.env.CAPTURE_NAME || "brittany";
const outResearch = "docs/research";
const outRefs = "docs/design-references";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9223;

async function waitForPort(host, portNumber, timeoutMs = 12000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const open = await new Promise((resolve) => {
      const socket = createConnection(portNumber, host);
      socket.once("connect", () => { socket.destroy(); resolve(true); });
      socket.once("error", () => resolve(false));
      socket.setTimeout(500, () => { socket.destroy(); resolve(false); });
    });
    if (open) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome debugging port did not open");
}

function getJson(url, method = "GET") {
  return new Promise((resolve, reject) => {
    request(url, { method }, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
      });
    }).on("error", reject).end();
  });
}

function encodeFrame(buffer) {
  const mask = Buffer.from([0x12, 0x34, 0x56, 0x78]);
  const maskedPayload = Buffer.from(buffer);
  for (let i = 0; i < maskedPayload.length; i += 1) maskedPayload[i] ^= mask[i % 4];
  if (buffer.length < 126) return Buffer.concat([Buffer.from([0x81, 0x80 | buffer.length]), mask, maskedPayload]);
  if (buffer.length < 65536) {
    const header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(buffer.length, 2);
    return Buffer.concat([header, mask, maskedPayload]);
  }
  const header = Buffer.alloc(10);
  header[0] = 0x81;
  header[1] = 0x80 | 127;
  header.writeBigUInt64BE(BigInt(buffer.length), 2);
  return Buffer.concat([header, mask, maskedPayload]);
}

function decodeFrames(buffer) {
  const messages = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const first = buffer[offset];
    const second = buffer[offset + 1];
    let length = second & 0x7f;
    let cursor = offset + 2;
    if (length === 126) {
      if (cursor + 2 > buffer.length) break;
      length = buffer.readUInt16BE(cursor);
      cursor += 2;
    } else if (length === 127) {
      if (cursor + 8 > buffer.length) break;
      length = Number(buffer.readBigUInt64BE(cursor));
      cursor += 8;
    }
    const masked = Boolean(second & 0x80);
    let mask;
    if (masked) {
      if (cursor + 4 > buffer.length) break;
      mask = buffer.subarray(cursor, cursor + 4);
      cursor += 4;
    }
    if (cursor + length > buffer.length) break;
    const payload = Buffer.from(buffer.subarray(cursor, cursor + length));
    if (masked && mask) {
      for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
    }
    if ((first & 0x0f) === 1) messages.push(payload.toString("utf8"));
    offset = cursor + length;
  }
  return { messages, remaining: buffer.subarray(offset) };
}

async function connectWs(wsUrl) {
  const url = new URL(wsUrl);
  const key = Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64");
  const socket = createConnection(Number(url.port), url.hostname);
  await new Promise((resolve, reject) => {
    socket.once("connect", resolve);
    socket.once("error", reject);
  });
  socket.write([
    `GET ${url.pathname}${url.search} HTTP/1.1`,
    `Host: ${url.host}`,
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Key: ${key}`,
    "Sec-WebSocket-Version: 13",
    "\r\n",
  ].join("\r\n"));

  await new Promise((resolve) => {
    let header = "";
    const onData = (chunk) => {
      header += chunk.toString("binary");
      if (header.includes("\r\n\r\n")) {
        socket.off("data", onData);
        resolve();
      }
    };
    socket.on("data", onData);
  });

  let id = 0;
  const pending = new Map();
  let buffered = Buffer.alloc(0);
  socket.on("data", (chunk) => {
    buffered = Buffer.concat([buffered, chunk]);
    const decoded = decodeFrames(buffered);
    buffered = decoded.remaining;
    for (const message of decoded.messages) {
      const parsed = JSON.parse(message);
      if (parsed.id && pending.has(parsed.id)) {
        pending.get(parsed.id)(parsed);
        pending.delete(parsed.id);
      }
    }
  });

  return {
    send(method, params = {}) {
      id += 1;
      const commandId = id;
      socket.write(encodeFrame(Buffer.from(JSON.stringify({ id: commandId, method, params }))));
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(commandId);
          reject(new Error(`CDP timeout: ${method}`));
        }, 30000);
        pending.set(commandId, (response) => {
          clearTimeout(timer);
          if (response.error) reject(new Error(JSON.stringify(response.error)));
          else resolve(response.result);
        });
      });
    },
    close() { socket.destroy(); },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  return result.result.value;
}

async function waitForDocument(client) {
  const started = Date.now();
  while (Date.now() - started < 20000) {
    const state = await evaluate(client, "document.readyState");
    if (state === "complete") return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

async function capture(client, viewport, name) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 600,
  });
  await client.send("Page.navigate", { url: target });
  await waitForDocument(client);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const metrics = await client.send("Page.getLayoutMetrics");
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: metrics.cssContentSize.width,
      height: metrics.cssContentSize.height,
      scale: 1,
    },
  });
  await writeFile(`${outRefs}/${captureName}-${name}.png`, Buffer.from(screenshot.data, "base64"));
}

const extractionScript = `(() => {
  const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','textDecoration','backgroundColor','background','padding','paddingTop','paddingRight','paddingBottom','paddingLeft','margin','marginTop','marginRight','marginBottom','marginLeft','width','height','maxWidth','minWidth','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','borderRadius','border','boxShadow','overflow','position','top','right','bottom','left','zIndex','opacity','transform','transition','cursor'];
  function styles(el) {
    const cs = getComputedStyle(el);
    return Object.fromEntries(props.map((p) => [p, cs[p]]).filter(([, v]) => v && !['none', 'normal', 'auto', '0px', 'rgba(0, 0, 0, 0)'].includes(v)));
  }
  function node(el, depth = 0) {
    if (!el || depth > 4) return null;
    const rect = el.getBoundingClientRect();
    const children = [...el.children].slice(0, 30);
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: String(el.className || '').slice(0, 180),
      text: [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).filter(Boolean).join(' ').slice(0, 250),
      rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
      styles: styles(el),
      href: el.href || null,
      aria: el.getAttribute('aria-label'),
      children: children.map((child) => node(child, depth + 1)).filter(Boolean),
    };
  }
  const sections = [...document.querySelectorAll('header, main > section, main > div, footer')].map((el, index) => ({ index, selector: el.id ? '#' + el.id : el.tagName.toLowerCase() + ':nth-of-type(' + (index + 1) + ')', tree: node(el) }));
  return {
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || null,
    bodyText: document.body.innerText,
    fonts: [...new Set([...document.querySelectorAll('body, h1, h2, h3, p, a, li, span, button')].map((el) => getComputedStyle(el).fontFamily))],
    colors: [...new Set([...document.querySelectorAll('*')].slice(0, 350).flatMap((el) => { const cs = getComputedStyle(el); return [cs.color, cs.backgroundColor, cs.borderColor].filter((v) => v && !['rgba(0, 0, 0, 0)', 'transparent'].includes(v)); }))],
    links: [...document.querySelectorAll('a')].map((a) => ({ text: a.innerText.trim(), href: a.href, aria: a.getAttribute('aria-label') })),
    assets: {
      images: [...document.querySelectorAll('img')].map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight })),
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({ href: l.href, rel: l.rel, sizes: l.sizes?.toString() })),
      svgs: [...document.querySelectorAll('svg')].map((svg) => svg.outerHTML.slice(0, 3000)),
    },
    sections,
  };
})()`;

async function main() {
  await mkdir(outResearch, { recursive: true });
  await mkdir(`${outResearch}/components`, { recursive: true });
  await mkdir(outRefs, { recursive: true });
  const chrome = spawn(chromePath, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--disable-gpu",
    "--hide-scrollbars",
    `--user-data-dir=${join(tmpdir(), `codex-brittany-${Date.now()}`)}`,
  ], { stdio: "ignore" });

  try {
    await waitForPort("127.0.0.1", port);
    const tab = await getJson(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(target)}`, "PUT");
    const client = await connectWs(tab.webSocketDebuggerUrl);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await capture(client, { width: 1440, height: 1000 }, "desktop-full");
    await capture(client, { width: 768, height: 1000 }, "tablet-full");
    await capture(client, { width: 390, height: 900 }, "mobile-full");
    await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await client.send("Page.navigate", { url: target });
    await waitForDocument(client);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const extraction = await evaluate(client, extractionScript);
    await writeFile(`${outResearch}/GLOBAL_EXTRACTION.json`, JSON.stringify(extraction, null, 2));
    client.close();
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});



