import { appName } from './Values';

export const removeDuplicates = (arr:any[]) => arr.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);

export const formatPrice = (balance: number) => {
  const newBalance = balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  return newBalance.split(',')[0];
};

export const parseVoucherCode = (code: string) => code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

export const setDocumentTitle = (text: string) => {
  document.title = `${text} - ${appName}`;
};
