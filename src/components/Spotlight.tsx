"use client";

import { useEffect, useState } from "react";

export function Spotlight() {
  const [position, setPosition] = useState({ x: "50%", y: "0%" });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setPosition({ x: `${event.clientX}px`, y: `${event.clientY}px` });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x} ${position.y}, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
}
