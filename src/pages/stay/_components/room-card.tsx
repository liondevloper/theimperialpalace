import { Link } from "react-router-dom";
import { BedDouble, Coffee, ShieldCheck, Wifi } from "lucide-react";
import type { Room } from "../../lib/hotel-data.ts";

const AMENITY_ICONS = [Wifi, BedDouble, Coffee, ShieldCheck];
export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group overflow-hidden border border-border bg-card transition-colors hover:border-[#c9a84c]/40">
      <Link to={`/stay/${room.slug}`} className="relative block h-[260px] overflow-hidden">
        <img src={room.images[0]} alt={room.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {room.badge && <span className="absolute right-4 top-4 bg-[#c9a84c] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#1a1510]">{room.badge}</span>}
      </Link>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl font-light text-foreground">{room.name}</h3>
          <span className="shrink-0 pt-2 text-[10px] text-muted-foreground">{room.size}</span>
        </div>
        <p className="min-h-[72px] text-sm leading-6 text-muted-foreground">{room.desc}</p>
        <div className="my-5 flex flex-wrap gap-3">
          {room.amenities.slice(0, 4).map((amenity, index) => { const Icon = AMENITY_ICONS[index] ?? Wifi; return <span key={amenity} title={amenity} className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><Icon className="h-3.5 w-3.5 text-[#9a7730]" />{amenity}</span>; })}
        </div>
        <Link to={`/stay/${room.slug}`} className="inline-flex border border-[#c9a84c] px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#9a7730] transition-colors hover:bg-[#c9a84c] hover:text-[#1a1510]">View Details</Link>
      </div>
    </article>
  );
}
