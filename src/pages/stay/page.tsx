import { CalendarDays } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import { BookStayButton } from "../../components/book-stay-modal.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES, ROOMS } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";
import RoomCard from "./_components/room-card.tsx";

export default function StayPage() {
  return (
    <PageLayout title="Rooms & Suites | The Imperial Palace Rajkot" description="Rooms and suites at The Imperial Palace, Rajkot, a 5-star hotel, from refined Superior Rooms to the signature Imperial Suite.">
      <PageHero eyebrow="A place to belong" title="Rooms & Suites" image={HOTEL_IMAGES.executive} subtitle="Discover a more considered kind of stay, where gracious comfort and thoughtful detail come naturally." />
      {/* Booking opens as a pop-up form. */}
      <section id="book" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-10 lg:px-8" aria-label="Book your stay">
        <div className="flex flex-col items-start justify-between gap-5 border border-border bg-card p-6 shadow-[0_30px_60px_-35px_rgba(6,12,26,0.9)] md:flex-row md:items-center md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary">Reservations</p>
            <h2 className="mt-2 font-serif text-3xl font-light text-foreground">Plan your stay with us</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose your dates, guests and room. Our team confirms availability and rates.</p>
          </div>
          <BookStayButton className={BTN.gold}><CalendarDays className="h-4 w-4" />Book your stay</BookStayButton>
        </div>
      </section>
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Find your retreat" title="Ways to feel at home" description="From quietly refined rooms to our signature Imperial Suite, every space is designed around comfort, warmth and the art of a gracious stay." align="center" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room, index) => <Reveal key={room.slug} delay={(index % 3) * 0.05}><RoomCard room={room} /></Reveal>)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
