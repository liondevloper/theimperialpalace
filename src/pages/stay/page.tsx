import PageLayout from "../../components/page-layout.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES, ROOMS } from "../../lib/hotel-data.ts";
import RoomCard from "./_components/room-card.tsx";

export default function StayPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="A place to belong" title="Rooms & Suites" image={HOTEL_IMAGES.executive} subtitle="Discover a more considered kind of stay, where gracious comfort and thoughtful detail come naturally." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Find your retreat" title="Seven ways to feel at home" description="From quietly refined rooms to our signature Imperial Suite, every space is designed around comfort, warmth, and the art of a gracious stay." align="center" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room, index) => <Reveal key={room.slug} delay={index * 0.05}><RoomCard room={room} /></Reveal>)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
