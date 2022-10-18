/* eslint-disable react/no-array-index-key */
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import KamariSeller from '../../assets/png/Kamari-Seller.png';
import {
  routeCategoryList,
  routeDashboard,
  routeProductList,
  routeProductNew,
  routeProfile,
  routePromotionList,
  routeVoucherList,
  routeWithdraw,
} from '../../utils/RouteList';

type props = {
  showSidebar: boolean,
  setShowSidebar: Dispatch<SetStateAction<boolean>>,
}

export default function Sidebar({ showSidebar, setShowSidebar }:props) {
  const viewDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const menu = [
    {
      text: 'Dashboard',
      icon: 'bi-house',
      children: [
        {
          text: 'Dashboard',
          url: routeDashboard,
        },
        {
          text: 'Profil Toko',
          url: routeProfile,
        },
      ],
    },
    {
      text: 'Pengiriman',
      icon: 'bi-box-seam',
      children: [
        {
          text: 'Pengiriman',
          url: '/shipment/list',
        },
        {
          text: 'Pengaturan Pengiriman',
          url: '/shipment/setting',
        },
      ],
    },
    {
      text: 'Produk',
      icon: 'bi-bag',
      children: [
        {
          text: 'Produk Saya',
          url: routeProductList,
        },
        {
          text: 'Tambah Produk',
          url: routeProductNew,
        },
        {
          text: 'Kategori Toko',
          url: routeCategoryList,
        },
      ],
    },
    {
      text: 'Voucher dan Promosi',
      icon: 'bi-tag',
      children: [
        {
          text: 'Voucher Toko',
          url: routeVoucherList,
        },
        {
          text: 'Promosi',
          url: routePromotionList,
        },
      ],
    },
    {
      text: 'Keuangan',
      icon: 'bi-wallet2',
      children: [
        {
          text: 'Penarikan Uang',
          url: routeWithdraw,
        },
      ],
    },
  ];
  return (
    <aside
      className={`
        ${(viewDesktop && showSidebar) ? 'sidebar' : ''}
        ${(viewDesktop && !showSidebar) ? 'sidebar-hide' : ''}
        ${(!viewDesktop && showSidebar) ? 'sidebar-float' : ''}
        ${(!viewDesktop && !showSidebar) ? 'sidebar-hide' : ''}
      `}
    >
      <div className="sidebar-overlay" />
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img
            src={KamariSeller}
            alt="Kamari Seller"
          />
        </div>
        <div className="sidebar-control">
          <button
            type="button"
            onClick={() => setShowSidebar(false)}
          >
            <i className="bi bi-list" />
          </button>
        </div>
        <div className="sidebar-menu">
          {menu.map((item, index) => (
            <div key={`sidebar-menu-${item.text}`}>
              <button
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseMenu${index}`}
                aria-expanded="false"
                aria-controls={`collapseMenu${index}`}
                key={`menu-${index}`}
                className={`sidebar-menu-item ${selectedIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div><i className={`bi ${item.icon}`} /></div>
                <div><span>{item.text}</span></div>
              </button>
              <div className="collapse sidebar-menu-item-child" id={`collapseMenu${index}`}>
                {item.children.map((child) => (
                  <NavLink
                    key={`sidebar-menu-${item.text}-child-${child.text}`}
                    to={child.url}
                  >
                    {child.text}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
          <div className="sidebar-logout">
            <div><i className="bi bi-arrow-bar-left" /></div>
            <div>
              <Link
                to="/logout"
              >
                Keluar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
