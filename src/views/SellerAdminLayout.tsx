import { Outlet } from 'react-router-dom';
import Footer from '../layouts/Footer/Footer';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';

export default function SellerAdminLayout() {
  return (
    <>
      <Header />
      <main>
        <aside>
          <Sidebar />
        </aside>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
