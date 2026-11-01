/**
 * The "black hole": a piece that is leaving the screen, through the top or the bottom, drifts away and
 * fades, tied to the scroll position itself. Each function returns 0 (in place) to 1 (gone).
 * Tall pieces start to go as they begin to leave, not when their last line is about to.
 * The effect eases in over the first 120px of scrolling, so a tall preview screen at the top of the page
 * is never faded.
 */
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const ramp = (scrolled: number) => clamp(scrolled / 120);

/** Leaving through the top. */
export function leaving(
  rect: { top: number; bottom: number },
  vh: number,
  scrolled = window.scrollY,
): number {
  const ref = Math.min(rect.bottom, rect.top + 200);
  return ease(clamp((vh * 0.24 - ref) / (vh * 0.36))) * ramp(scrolled);
}

/** Leaving through the bottom (or not yet arrived from it). */
export function approaching(
  rect: { top: number; bottom: number },
  vh: number,
  scrolled = window.scrollY,
): number {
  const ref = Math.max(rect.top, rect.bottom - 200);
  return ease(clamp((ref - vh * 0.76) / (vh * 0.36))) * ramp(scrolled);
}

export const OUT_DISTANCE = 30;

/** Opacity and vertical offset (px) for a piece, given how far it is through the top and the bottom. */
export function hole(top: number, bottom: number) {
  return {
    opacity: (1 - 0.92 * top) * (1 - 0.92 * bottom),
    y: (bottom - top) * OUT_DISTANCE,
  };
}
