import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bath, BedDouble, Coffee, ShieldCheck, Tv, Wifi, Wind, ConciergeBell } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import { GoldButton, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { ROOMS } from "../../lib/hotel-data.ts";
import RoomCard from "./_components/room-card.tsx";

const ICONS = [BedDouble, Wifi, Wind, Tv, Coffee, ShieldCheck, Bath, ConciergeBell];
export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const room = ROOMS.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  if (!room) return <PageLayout><section className="mx-auto max-w-4xl px-6 py-28 text-center"><p className="font-serif text-4xl text-foreground">Room not found</p><Link to="/stay" className="mt-6 inline-flex text-[#9a7730] underline">Back to rooms</Link></section></PageLayout>;
  const suggestions = ROOMS.filter((candidate) => candidate.slug !== room.slug).slice(0, 3);
  return (
    <PageLayout>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8">
        <Link to="/stay" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9a7730]"><ArrowLeft className="h-4 w-4" /> Back to rooms</Link>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div>
              <div className="overflow-hidden"><img src={room.images[activeImage]} alt={room.name} className="h-[360px] w-full object-cover md:h-[520px]" /></div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {room.images.map((image, index) => (
                  <button key={image + index} onClick={() => setActiveImage(index)} aria-label={`View room image ${index + 1}`} className={`h-24 overflow-hidden border ${activeImage === index ? "border-[#c9a84c]" : "border-border"}`}>
                    <img src={image} alt="" className="h-full w-full object-cover transition-transform hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#9a7730]">The Imperial Palace · Rajkot</p>
              <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">{room.name}</h1>
              <span className="mt-5 inline-block border border-[#c9a84c]/50 px-3 py-1.5 text-xs text-[#9a7730]">{room.size}</span>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">{room.longDesc}</p>
              <div className="mt-8">
                <h2 className="mb-4 font-serif text-2xl text-foreground">Room amenities</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {room.amenities.map((amenity, index) => { const Icon = ICONS[index % ICONS.length]; return <div key={amenity} className="flex items-center gap-2.5 text-sm text-muted-foreground"><Icon className="h-4 w-4 shrink-0 text-[#9a7730]" />{amenity}</div>; })}
                </div>
              </div>
              <GoldButton onClick={() => setModalOpen(true)} className="mt-9 w-full sm:w-auto">Request Booking</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-accent/25 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="You may also like" title="Similar rooms" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion, index) => <Reveal key={suggestion.slug} delay={index * 0.05}><RoomCard room={suggestion} /></Reveal>)}
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Book ${room.name}`} subtitle="Complete the form and our reservations team will be in touch." />
    </PageLayout>
  );
}
