import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Solutions from './pages/Solutions.jsx';
import Contact from './pages/Contact.jsx';
import Booking from './pages/Booking.jsx';
import LegalNotice from './pages/LegalNotice.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/index.css';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="contact" element={<Contact />} />
        {/* Route stable utilisée par le QR code : ne pas renommer. */}
        <Route path="reserver" element={<Booking />} />
        <Route path="mentions-legales" element={<LegalNotice />} />
        <Route path="confidentialite" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
