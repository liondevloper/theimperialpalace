import type { ReactNode } from "react";

const ZOOM = 16;
const TILE = 256;
const HOTEL = { lat: 22.2950232, lng: 70.7908472 };
// Pin sits a little above the middle so an overlay card at the bottom never covers it.
const PIN_TOP = 42;
const COLS = [-3, -2, -1, 0, 1, 2, 3];
const ROWS = [-2, -1, 0, 1, 2];

// Standard web-mercator maths: lat/lng -> fractional tile coordinates.
function project(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n;
  const y = ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * n;
  return { x, y };
}

// Static, non-interactive map built from CARTO dark tiles (OpenStreetMap data) tinted with the hotel's gold.
export default function PremiumMap({ className = "", children }: { className?: string; children?: ReactNode }) {
  const { x, y } = project(HOTEL.lat, HOTEL.lng, ZOOM);
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  return (
    <div role="img" aria-label="Map showing The Imperial Palace, Dr. Yagnik Road, Rajkot" className={`relative overflow-hidden bg-[#0b1426] ${className}`}>
      {ROWS.flatMap((dy) =>
        COLS.map((dx) => (
          <img
            key={`${dx}-${dy}`}
            src={`https://basemaps.cartocdn.com/dark_all/${ZOOM}/${tx + dx}/${ty + dy}@2x.png`}
            alt=""
            width={TILE}
            height={TILE}
            loading="lazy"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ width: TILE, height: TILE, left: `calc(50% + ${(tx + dx - x) * TILE}px)`, top: `calc(${PIN_TOP}% + ${(ty + dy - y) * TILE}px)` }}
          />
        )),
      )}
      <div className="pointer-events-none absolute inset-0 bg-[#1c2a4a]/25 mix-blend-color" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1426]/70 via-transparent to-[#0b1426]/30" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#c9a84c]/30" />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: `${PIN_TOP}%` }}>
        <span className="absolute inset-0 m-auto h-14 w-14 animate-ping rounded-full bg-[#d9bc6a]/35" />
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#b8933a] to-[#ecd594] shadow-[0_0_0_6px_rgba(217,188,106,0.25)]" />
      </div>
      <p className="absolute bottom-1.5 right-2 text-[10px] text-white/50">&copy; OpenStreetMap &copy; CARTO</p>
      {children}
    </div>
  );
}
