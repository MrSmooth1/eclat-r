import { Outlet } from 'react-router';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import ScrollManager from '../components/ScrollManager.jsx';

export default function MainLayout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton floating />
    </>
  );
}
