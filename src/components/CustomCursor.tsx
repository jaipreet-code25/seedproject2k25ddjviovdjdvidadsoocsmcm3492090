import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const outerPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>();

  useEffect(() => {
    // Don't show custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, label, [onclick], .cursor-pointer');
      setIsPointer(!!clickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth follow animation for outer circle
    const animate = () => {
      outerPos.current.x += (position.x - outerPos.current.x) * 0.15;
      outerPos.current.y += (position.y - outerPos.current.y) * 0.15;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [position.x, position.y]);

  // Don't render on touch devices or SSR
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer circle - follows with smooth lag */}
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        style={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? '50px' : '40px',
          height: isPointer ? '50px' : '40px',
          borderColor: isPointer ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      />
      {/* Inner circle - follows cursor exactly */}
      <div
        className="custom-cursor-inner"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isClicking ? 0.5 : isPointer ? 1.5 : 1})`,
          backgroundColor: isPointer ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.8)',
        }}
      />
    </>
  );
};

export default CustomCursor;
