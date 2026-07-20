// Maps a horizontal mouse position (0-100% of viewport width) to the
// nearest Redaction optical-size cut. These values intentionally mirror
// the font's own naming (10, 20, 35, 50, 70, 100) since that's roughly
// the scale you wanted the mouse position to map onto.
const REDACTION_STOPS: { value: number; family: string }[] = [
  { value: 0, family: "Redaction" },
  { value: 10, family: "Redaction 10" },
  { value: 20, family: "Redaction 20" },
  { value: 35, family: "Redaction 35" },
  { value: 50, family: "Redaction 50" },
  { value: 70, family: "Redaction 70" },
  { value: 100, family: "Redaction 100" },
];

export function getNearestRedactionFamily(percent: number) {
  let closest = REDACTION_STOPS[0];
  let minDiff = Math.abs(percent - closest.value);
  for (const stop of REDACTION_STOPS) {
    const diff = Math.abs(percent - stop.value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = stop;
    }
  }
  return closest.family;
}
