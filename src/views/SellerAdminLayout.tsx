/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';
import '../assets/style/seller-layout.css';
import useAppDispatch from '../hooks/useAppDispatch';
import { userActions } from '../store/userSlice';
import { isLoggedIn, getUserFromToken, getToken } from '../utils/Auth';

export default function SellerAdminLayout() {
  const dispatch = useAppDispatch();
  const viewDesktop = useMediaQuery('(min-width: 768px)');
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(userActions.setUser(getUserFromToken(getToken())));
    } else {
      window.location.href = '/logout';
    }
  }, []);

  useEffect(() => {
    if (!viewDesktop) setShowSidebar(false);
  }, [viewDesktop]);

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
          <main className={`main ${(viewDesktop && !showSidebar) ? 'main-without-sidebar' : ''}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
