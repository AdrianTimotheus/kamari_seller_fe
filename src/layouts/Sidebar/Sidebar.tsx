/* eslint-disable react/no-array-index-key */
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { NavLink } from 'react-router-dom';
import KamariSeller from '../../assets/png/Kamari-Seller.png';

type props = {
  showSidebar: boolean,
  setShowSidebar: Dispatch<SetStateAction<boolean>>,
}

export default function Sidebar({ showSidebar, setShowSidebar }:props) {
  const match = useMediaQuery('(min-width: 768px)');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const menu = [
    {
      text: 'Dashboard',
      icon: 'bi-house',
      children: [
        {
          text: 'Dashboard',
          url: '/dashboard',
        },
      ],
    },
    {
      text: 'Produk',
      icon: 'bi-bag',
      children: [
        {
          text: 'Produk Saya',
          url: '/myproduct/all',
        },
        {
          text: 'Tambah Produk',
          url: '/myproduct/new',
        },
      ],
    },
    {
      text: 'Voucher',
      icon: 'bi-tag',
      children: [
        {
          text: 'Voucher Saya',
          url: '/myvoucher/all',
        },
        {
          text: 'Tambah Voucher',
          url: '/myvoucher/new',
        },
      ],
    },
    {
      text: 'Promosi',
      icon: 'bi-megaphone',
      children: [
        {
          text: 'Promosi Saya',
          url: '/mypromotion/all',
        },
        {
          text: 'Tambah Promosi',
          url: '/mypromotion/new',
        },
      ],
    },
    {
      text: 'Pengiriman',
      icon: 'bi-box-seam',
      children: [
        {
          text: 'Semua Pengiriman',
          url: '/shipment',
        },
      ],
    },
  ];
  return (
    <aside
      className={`${match ? 'sidebar' : ''}
        ${(!match && showSidebar) ? 'sidebar-float' : ''}
        ${(!match && !showSidebar) ? 'sidebar-hide' : ''}`}
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
            <div>
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
                    to={child.url}
                  >
                    {child.text}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
