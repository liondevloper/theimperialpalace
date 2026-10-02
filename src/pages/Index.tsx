import Header from "./home/_components/header.tsx";
import Hero from "./home/_components/hero.tsx";
import Intro from "./home/_components/intro.tsx";
import Rooms from "./home/_components/rooms.tsx";
import Dining from "./home/_components/dining.tsx";
import Weddings from "./home/_components/weddings.tsx";
import Events from "./home/_components/events.tsx";
import Tour from "./home/_components/tour.tsx";
import Wellness from "./home/_components/wellness.tsx";
import Gallery from "./home/_components/gallery.tsx";
import Location from "./home/_components/location.tsx";
import Footer from "./home/_components/footer.tsx";
import FloatingElements from "./home/_components/floating-elements.tsx";

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Rooms />
        <Dining />
        <Weddings />
        <Events />
        <Tour />
        <Wellness />
        <Gallery />
        <Location />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
