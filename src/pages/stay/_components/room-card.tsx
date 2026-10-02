import { Link } from "react-router-dom";
import Img from "../../../components/img.tsx";
import type { Room } from "../../../lib/hotel-data.ts";
import { BTN } from "../../../lib/styles.ts";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card">
      <Link to={`/stay/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={`View ${room.name}`}>
        <Img src={room.images[0]} alt={`${room.name} at The Imperial Palace`} width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {room.badge && <span className="absolute right-3 top-3 bg-[#c9a84c] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#14110c]">{room.badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl font-light text-foreground">{room.name}</h3>
          <span className="shrink-0 text-xs text-muted-foreground">{room.size}</span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{room.desc}</p>
        <Link to={`/stay/${room.slug}`} className={`${BTN.outline} mt-6 w-fit`}>View details</Link>
      </div>
    </article>
  );
}
