/** Fallback center used until a real location fix arrives, so the map never opens on Null Island (0,0). */
export const LYON_CENTER = { latitude: 45.764043, longitude: 4.835659 } as const;

export const LYON_CENTER_LNG_LAT: [number, number] = [LYON_CENTER.longitude, LYON_CENTER.latitude];
