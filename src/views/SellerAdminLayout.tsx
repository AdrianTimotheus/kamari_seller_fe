import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';
import '../assets/style/seller-layout.css';

export default function SellerAdminLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <>
      <div className="page-background" />
      <div className="page__container">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className="main-layout">
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <main className="main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
