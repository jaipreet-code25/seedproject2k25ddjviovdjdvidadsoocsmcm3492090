// @ts-nocheck

import { useEffect } from 'react';

const SPACING = 5;
const HISTORY_MAX = 800;

// Bright yellow head → amber → dark yellow → near-black tail
const TRAIL_COLORS = [
  '#ffff00',
  '#fffc00',
  '#fff700',
  '#ffef00',
  '#ffe500',
  '#ffd900',
  '#ffcc00',
  '#ffbf00',
  '#ffb300',
  '#ffa500',
  '#ff9800',
  '#e68a00',
  '#cc7a00',
  '#b36b00',
  '#995c00',
  '#804d00',
  '#663d00',
  '#4d2e00',
  '#331f00',
  '#1a1000',
  '#0d0800',
  '#060300',
  '#030100',
  '#020100',
  '#010000',
  '#000000',
  '#000000',
  '#000000',
];

const TRAIL_LENGTH = TRAIL_COLORS.length;

const useCanvasCursor = () => {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const history: { x: number; y: number }[] = [];
    let visible = false;
    let isPointer = false;
    let lastMoveTime = performance.now();

    // Tail fade config
    const TAIL_FADE_DELAY = 100;
    const TAIL_FADE_STAGGER = 40;
    const TAIL_FADE_DURATION = 250;

    const onMouseMove = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      lastMoveTime = performance.now();
      const target = e.target as HTMLElement;
      isPointer = !!target.closest('a, button, [role="button"], input, textarea, select, label, [onclick], .cursor-pointer');
      if (!visible) {
        for (let k = 0; k < HISTORY_MAX; k++) history.push({ ...pos });
        visible = true;
      } else {
        history.unshift(pos);
        if (history.length > HISTORY_MAX) history.length = HISTORY_MAX;
      }
    };
    const onMouseLeave = () => { visible = false; };
    const onMouseEnter = () => { visible = true; };

    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visible && history.length > 0) {
        // Sample positions spaced SPACING px apart along the path
        const sampled: { x: number; y: number }[] = [];
        let accumulated = 0;
        let prev = history[0];
        sampled.push(prev);

        for (let j = 1; j < history.length && sampled.length < TRAIL_LENGTH; j++) {
          const dx = history[j].x - prev.x;
          const dy = history[j].y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          accumulated += dist;
          if (accumulated >= SPACING) {
            sampled.push(history[j]);
            accumulated = 0;
            prev = history[j];
          }
        }

        const idle = performance.now() - lastMoveTime;

        for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
          const pos = sampled[i] ?? sampled[sampled.length - 1] ?? history[history.length - 1];
          const radius = i === 0
            ? (isPointer ? 3.5 : 2.5)
            : Math.max(0.5, 2 - i * 0.055);

          // Base opacity from position in trail
          const baseOpacity = Math.max(0, 1 - i * 0.052);

          // Idle fade per dot (head never fades, tail fades from end inward)
          let idleFade = 1;
          if (i > 0) {
            const dotDelay = TAIL_FADE_DELAY + (TRAIL_LENGTH - 1 - i) * TAIL_FADE_STAGGER;
            idleFade = idle < dotDelay ? 1 : Math.max(0, 1 - (idle - dotDelay) / TAIL_FADE_DURATION);
          }

          const opacity = baseOpacity * idleFade;
          if (opacity <= 0) continue;

          // Parse hex color → rgba
          const hex = TRAIL_COLORS[i] ?? '#000000';
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);

          // Glow for head and near-head dots
          if (i < 5) {
            ctx.save();
            ctx.shadowColor = i === 0 ? `rgba(255,255,0,${opacity * 0.7})` : `rgba(255,200,0,${opacity * 0.5})`;
            ctx.shadowBlur = i === 0 ? 6 : 3;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
            ctx.fill();
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', resize);
    };
  }, []);
};

export default useCanvasCursor;
