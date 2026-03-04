import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 16;
const LERP = 0.18;

// Colors along the trail: vivid yellow → orange → red → magenta → blue
const TRAIL_COLORS = [
  "#facc15", // yellow (tip)
  "#fbbf24",
  "#f97316",
  "#ef4444",
  "#e11d48",
  "#c026d3",
  "#a855f7",
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#0ea5e9",
  "#06b6d4",
  "#14b8a6",
  "#22c55e",
  "#4ade80",
  "#86efac", // pale green (tail end)
];

const CustomCursor = () => {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -200, y: -200 });
  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const visible = useRef(false);
  const animFrame = useRef<number>();

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        // Snap all trail dots to cursor on first move to avoid initial sweep
        trail.current = trail.current.map(() => ({ ...mouse.current }));
        visible.current = true;
      }
    };
    const onMouseLeave = () => { visible.current = false; };
    const onMouseEnter = () => { visible.current = true; };

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      // Each segment lerps toward the one before it
      trail.current[0].x += (mouse.current.x - trail.current[0].x) * LERP;
      trail.current[0].y += (mouse.current.y - trail.current[0].y) * LERP;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * LERP;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * LERP;
      }

      // Update DOM directly for max perf
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const dot = dotsRef.current[i];
        if (!dot) continue;
        const size = Math.max(3, 13 - i * 0.65);
        dot.style.opacity = visible.current ? String(1 - i * 0.045) : "0";
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.transform = `translate(${trail.current[i].x - size / 2}px, ${trail.current[i].y - size / 2}px)`;
      }

      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          className="cursor-trail-dot"
          style={{
            backgroundColor: TRAIL_COLORS[i],
            boxShadow: `0 0 ${i === 0 ? 8 : 4}px 2px ${TRAIL_COLORS[i]}88`,
            zIndex: 100000 - i,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;

