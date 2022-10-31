export const baseUrl = process.env.REACT_APP_BASE_URL;
export const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
export const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
export const appName = 'Kamari for Seller';
export const imgBbKey = process.env.REACT_APP_IMGBB_KEY;
export const maxProductPhotos = 5;
export const maxVariantItems = 3;

export const orderStatuses = [
  {
    id: 0,
    name: '',
    text: 'Semua',
  },
  {
    id: 1,
    name: 'Waiting for confirmation',
    text: 'Menunggu konfirmasi',
    badge: 'badge-yellow',
  },
  {
    id: 2,
    name: 'Processed',
    text: 'Diproses',
    badge: 'badge-yellow',
  },
  {
    id: 3,
    name: 'On Delivery',
    text: 'Dikirim',
    badge: 'badge-blue',
  },
  {
    id: 4,
    name: 'Delivered',
    text: 'Sampai',
    badge: 'badge-purple',
  },
  {
    id: 6,
    name: 'Completed',
    text: 'Selesai',
    badge: 'badge-green',
  },
  // {
  //   id: 5,
  //   name: 'Canceled',
  //   text: 'Dibatalkan',
  // },
  // {
  //   id: 7,
  //   name: 'Refunded',
  //   text: 'Dikembalikan',
  // },
];
