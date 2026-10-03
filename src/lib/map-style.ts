// Which footer map(s) visitors see. Chosen in admin > Contact details > Footer map.
export const MAP_STYLES = ["Premium map", "Google map", "Both maps"] as const;
export type MapStyle = (typeof MAP_STYLES)[number];

export function parseMapStyle(value: unknown): MapStyle {
  return MAP_STYLES.find((s) => s === value) ?? "Premium map";
}
