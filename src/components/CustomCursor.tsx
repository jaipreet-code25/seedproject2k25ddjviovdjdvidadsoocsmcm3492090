import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 20;
const SPACING = 6; // px between each dot along the path
const HISTORY = 600; // max stored mouse positions

// White head → bright blue → deeper blue → near-black
const TRAIL_COLORS = [
  "#ffffff",
  "#e0f2fe",
  "#bae6fd",
  "#7dd3fc",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#172554",
  "#0f172a",
  "#0a1128",
  "#060d1a",
  "#03070f",
  "#01030a",
  "#000510",
  "#00020a",
  "#000105",
];

const CustomCursor = () => {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Ring buffer of actual mouse positions
  const history = useRef<{ x: number; y: number }[]>([]);
  const visible = useRef(false);
  const isPointer = useRef(false);
  const animFrame = useRef<number>();
  const lastMoveTime = useRef<number>(0);
  const TAIL_FADE_DELAY = 100;    // ms before the very tip of the tail starts fading
  const TAIL_FADE_STAGGER = 40;   // extra ms delay per dot closer to head
  const TAIL_FADE_DURATION = 250; // ms each dot takes to fade once it starts

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = performance.now();
      const target = e.target as HTMLElement;
      isPointer.current = !!target.closest('a, button, [role="button"], input, textarea, select, label, [onclick], .cursor-pointer');
      if (!visible.current) {
        // Pre-fill history so trail starts at cursor, not origin
        history.current = Array(HISTORY).fill(pos).map(() => ({ ...pos }));
        visible.current = true;
      } else {
        history.current.unshift(pos);
        if (history.current.length > HISTORY) history.current.length = HISTORY;
      }
    };
    const onMouseLeave = () => { visible.current = false; };
    const onMouseEnter = () => { visible.current = true; };

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      const h = history.current;
      if (h.length > 0) {
        // Walk along the history buffer sampling every SPACING px
        let sampled: { x: number; y: number }[] = [];
        let accumulated = 0;
        let prev = h[0];
        sampled.push(prev);

        for (let j = 1; j < h.length && sampled.length < TRAIL_LENGTH; j++) {
          const dx = h[j].x - prev.x;
          const dy = h[j].y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          accumulated += dist;
          if (accumulated >= SPACING) {
            sampled.push(h[j]);
            accumulated = 0;
            prev = h[j];
          }
        }

        for (let i = 0; i < TRAIL_LENGTH; i++) {
          const dot = dotsRef.current[i];
          if (!dot) continue;
          const pos = sampled[i] ?? sampled[sampled.length - 1] ?? h[h.length - 1];
          const size = i === 0
            ? (isPointer.current ? 16 : 11)
            : Math.max(2, 15 - i * 0.85);
          const idle = performance.now() - lastMoveTime.current;
          let idleFade: number;
          if (i === 0) {
            // Head: never fades
            idleFade = 1;
          } else {
            // Tail end fades first, dots closer to head fade later
            const dotDelay = TAIL_FADE_DELAY + (TRAIL_LENGTH - 1 - i) * TAIL_FADE_STAGGER;
            idleFade = idle < dotDelay ? 1 : Math.max(0, 1 - (idle - dotDelay) / TAIL_FADE_DURATION);
          }
          dot.style.opacity = visible.current ? String(Math.max(0, 1 - i * 0.052) * idleFade) : "0";
          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
          dot.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;
        }
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
            boxShadow: i === 0
              ? `0 0 10px 3px rgba(255,255,255,0.6)`
              : i < 5
              ? `0 0 6px 2px rgba(14,165,233,0.5)`
              : `none`,
            zIndex: 100000 - i,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;


