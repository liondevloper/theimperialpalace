import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import { BookStayButton } from "../../components/book-stay-modal.tsx";
import Img from "../../components/img.tsx";
import { Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { ROOMS } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";
import RoomCard from "./_components/room-card.tsx";

export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const room = ROOMS.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!room) {
    return (
      <PageLayout title="Room not found | The Imperial Palace Rajkot" description="This room could not be found.">
        <section className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="font-serif text-4xl text-foreground">Room not found</h1>
          <Link to="/stay" className={`${BTN.outline} mt-6`}>Back to rooms</Link>
        </section>
      </PageLayout>
    );
  }

  const suggestions = ROOMS.filter((candidate) => candidate.slug !== room.slug).slice(0, 3);
  return (
    <PageLayout title={`${room.name} | The Imperial Palace Rajkot`} description={room.longDesc}>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8">
        <Link to="/stay" className="mb-6 inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary"><ArrowLeft className="h-4 w-4" /> All rooms</Link>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Img key={room.images[activeImage]} src={room.images[activeImage]} alt={`${room.name}, view ${activeImage + 1}`} priority width={1200} height={800} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {room.images.map((image, index) => (
                <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1} of ${room.images.length}`} aria-pressed={activeImage === index} className={`cursor-pointer overflow-hidden border-2 ${activeImage === index ? "border-[#c9a84c]" : "border-transparent"}`}>
                  <Img src={image} alt="" width={400} height={300} sizes="(min-width: 1024px) 20vw, 33vw" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary">The Imperial Palace, Rajkot</p>
            <h1 className="mt-3 font-serif text-4xl font-light text-foreground md:text-5xl">{room.name}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{room.size}</p>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">{room.longDesc}</p>
            <h2 className="mb-4 mt-8 font-serif text-2xl text-foreground">Room amenities</h2>
            <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              {room.amenities.map((amenity) => <li key={amenity} className="flex items-center gap-2.5 text-sm text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-primary" />{amenity}</li>)}
            </ul>
            <BookStayButton defaultRoom={room.name} className={`${BTN.gold} mt-8 w-full sm:w-auto`}>Book this room</BookStayButton>
          </div>
        </div>
      </section>
      <section className="bg-card px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="You may also like" title="Similar rooms" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{suggestions.map((s) => <RoomCard key={s.slug} room={s} />)}</div>
        </div>
      </section>
    </PageLayout>
  );
}
