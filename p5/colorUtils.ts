export function getCssColor(varName: string, fallback = "#0000ff"): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return value || fallback;
}

export function generateTints(
  p: any,
  baseColorString: string,
  steps: number,
  maxAmt = 0.85,
) {
  const base = p.color(baseColorString);
  const white = p.color(255, 255, 255);

  const tints: any[] = [];
  for (let i = 0; i < steps; i++) {
    const amt = (i / (steps - 1)) * maxAmt;
    tints.push(p.lerpColor(base, white, amt));
  }
  return tints;
}
