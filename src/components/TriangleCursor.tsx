import { useEffect, useRef } from "react";

const TriangleCursor = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const outerPosRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Start the animation loop only after the first mouse move to avoid
    // unnecessary rAF cycles before the cursor has entered the page.
    const startLoop = () => {
      if (rafRef.current) return;
      const animate = () => {
        const { x, y } = posRef.current;

        if (innerRef.current) {
          innerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }

        // Outer triangle follows with smooth lag (lerp factor 0.12)
        const dx = x - outerPosRef.current.x;
        const dy = y - outerPosRef.current.y;
        outerPosRef.current.x += dx * 0.12;
        outerPosRef.current.y += dy * 0.12;

        if (outerRef.current) {
          outerRef.current.style.transform = `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px)`;
        }

        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        // Snap outer to current position on first appearance to avoid jump
        outerPosRef.current = { x: e.clientX, y: e.clientY };
        if (innerRef.current) innerRef.current.style.opacity = "1";
        if (outerRef.current) outerRef.current.style.opacity = "1";
        visibleRef.current = true;
      }
      startLoop();
    };

    const onMouseLeave = () => {
      if (innerRef.current) innerRef.current.style.opacity = "0";
      if (outerRef.current) outerRef.current.style.opacity = "0";
      // Reset positions so there is no stale jump when the cursor re-enters
      posRef.current = { x: -200, y: -200 };
      outerPosRef.current = { x: -200, y: -200 };
      visibleRef.current = false;
    };

    const onMouseEnter = () => {
      if (innerRef.current) innerRef.current.style.opacity = "1";
      if (outerRef.current) outerRef.current.style.opacity = "1";
      visibleRef.current = true;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  return (
    <>
      {/* Inner small triangle – sits exactly on the cursor */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      >
        {/* translate offset = –(size / 2) to centre the SVG on the cursor point */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          style={{ display: "block", transform: "translate(-7px, -7px)" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Solid white fill */}
          <polygon
            points="7,1 13,13 1,13"
            fill="white"
            opacity="0.95"
          />
          {/* Subtle blue inner stroke */}
          <polygon
            points="7,1 13,13 1,13"
            fill="none"
            stroke="rgba(147,197,253,0.9)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Outer triangle – follows with slight lag, inverted for visual contrast */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      >
        {/* translate offset = –(size / 2) to centre the SVG on the cursor point */}
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          style={{ display: "block", transform: "translate(-19px, -19px)" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer triangle – inverted (pointing down) for a layered look */}
          <polygon
            points="19,36 35,7 3,7"
            fill="none"
            stroke="rgba(59,130,246,0.75)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Soft glow duplicate */}
          <polygon
            points="19,36 35,7 3,7"
            fill="none"
            stroke="rgba(147,197,253,0.25)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default TriangleCursor;
