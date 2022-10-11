/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
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
      url: '',
      icon: 'bi-house',
      childern: [
        {
          text: 'Dashboard',
          url: '',
        },
      ],
    },
    {
      text: 'Produk',
      url: '',
      icon: 'bi-bag',
      children: [
        {
          text: 'Produk Saya',
          url: '',
        },
        {
          text: 'Tambah Produk',
          url: '',
        },
      ],
    },
    {
      text: 'Voucher',
      url: '',
      icon: 'bi-tag',
      children: [
        {
          text: 'Voucher Saya',
          url: '',
        },
        {
          text: 'Tambah Voucher',
          url: '',
        },
      ],
    },
    {
      text: 'Promosi',
      url: '',
      icon: 'bi-megaphone',
      children: [
        {
          text: 'Promosi Saya',
          url: '',
        },
        {
          text: 'Tambah Promosi',
          url: '',
        },
      ],
    },
    {
      text: 'Pengiriman',
      url: '',
      icon: 'bi-box-seam',
      children: [
        {
          text: 'Semua Pengiriman',
          url: '',
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
            <div
              key={`menu-${index}`}
              className={`${selectedIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
