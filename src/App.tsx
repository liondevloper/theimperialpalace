import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scroll-to-top.tsx";
import Index from "./pages/Index.tsx";
import StayPage from "./pages/stay/page.tsx";
import RoomDetailPage from "./pages/stay/room-detail.tsx";
import DiningPage from "./pages/dining/page.tsx";
import WeddingsPage from "./pages/weddings/page.tsx";
import EventsPage from "./pages/events/page.tsx";
import WellnessPage from "./pages/wellness/page.tsx";
import ExperiencesPage from "./pages/experiences/page.tsx";
import TourPage from "./pages/tour/page.tsx";
import GalleryPage from "./pages/gallery/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import AdminPage from "./pages/admin/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/stay" element={<StayPage />} />
        <Route path="/stay/:slug" element={<RoomDetailPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/weddings" element={<WeddingsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/wellness" element={<WellnessPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
