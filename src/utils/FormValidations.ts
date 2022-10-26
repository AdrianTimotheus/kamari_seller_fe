/* eslint-disable no-plusplus */
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export const validateEmail = (text:string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(text)) {
    return 'Masukkan email yang valid';
  }
  return '';
};

export const validateUsername = (text: string) => {
  if (text.length < 3) {
    return 'Username harus lebih dari 3 karakter';
  }

  const re = /^[a-z0-9]+$/;
  if (!re.test(text)) {
    return 'Username hanya terdiri dari huruf kecil dan angka';
  }

  return '';
};

export const validateName = (text:string) => {
  if (text.length < 3) {
    return 'Nama harus lebih dari 3 karakter';
  }
  const re = /^[a-z A-Z]+$/;
  if (!re.test(text)) {
    return 'Nama hanya terdiri dari spasi, huruf besar dan kecil';
  }
  return '';
};

export const validatePhone = (text:string) => {
  if (text.length < 8) {
    return 'Nomor telepon harus lebih dari 8 karakter';
  }
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Nomor telepon hanya terdiri dari angka';
  }
  return '';
};

export const validatePassword = (text: string) => {
  if (text.length < 8) {
    return 'Password harus lebih dari 8 karakter';
  }
  return '';
};

export const validateGender = (text: string) => {
  if (text !== '1' && text !== '2') return 'Masukkan jenis kelamin';
  return '';
};

export const validateDob = (text: string) => {
  if (text === '') {
    return 'Masukkan tanggal lahir';
  }
  return '';
};

export const validateStartEndDate = (mode: string, start: string, end: string) => {
  if (start === '') return 'Masukkan tanggal mulai';
  if (end === '') return 'Masukkan tanggal berakhir';

  const startDate = moment(start).startOf('day');
  const endDate = moment(end).endOf('day');

  if (!startDate.isBefore(endDate)) return 'Tanggal berakhir tidak boleh sebelum tanggal mulai';
  if (mode === 'new') {
    if (moment().isAfter(startDate)) return 'Tanggal mulai harus sesudah tanggal sekarang';
  }

  return '';
};

export const validateVoucherCode = (text: string) => {
  if (text === '') return 'Masukkan kode voucher';
  if (text.length > 5) return 'Kode voucher maksimal 5 karakter';

  const re = /^[A-Z0-9]+$/;
  if (!re.test(text)) {
    return 'Kode voucher terdiri dari kombinasi huruf besar dan angka';
  }
  return '';
};

export const validateVoucherTitle = (text: string) => {
  if (text === '') return 'Masukkan nama voucher';
  if (text.length > 20) return 'Nama voucher maksimal 20 karakter';

  const re = /^[a-zA-Z 0-9]+$/;
  if (!re.test(text)) {
    return 'Nama voucher terdiri dari kombinasi huruf kecil, huruf besar dan angka';
  }
  return '';
};

export const validatePromoType = (text: string) => {
  if (text === '') return 'Pilih tipe promo';
  if (text === '1' || text === '2') return '';
  return 'Tipe promo tidak valid';
};

export const validatePrice = (text: string, min: number) => {
  if (text === '') return 'Masukkan nominal';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }

  const inInt = parseInt(text, 10);
  if (inInt < min) return `Tidak boleh kurang dari Rp ${min}`;
  return '';
};

export const validatePromoAmount = (text: string, min: number, normalPrice: number) => {
  if (text === '') return 'Masukkan nominal';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }

  const inInt = parseInt(text, 10);
  if (inInt < min) return `Tidak boleh kurang dari Rp ${min}`;
  if (inInt > normalPrice) return 'Tidak boleh melebihi harga produk';
  return '';
};

export const validatePercentage = (text: string) => {
  if (text === '') return 'Masukkan persentase';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }

  const inInt = parseInt(text, 10);
  if (inInt < 1) return 'Tidak boleh kurang dari 1%';
  if (inInt > 100) return 'Tidak boleh lebih dari 100%';
  return '';
};

export const validateStock = (text: string, min: number = 1) => {
  if (text === '') return 'Masukkan stok';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }

  const stockInt = parseInt(text, 10);
  if (stockInt < min) return `Tidak boleh kurang dari ${min}`;
  return '';
};

export const validateMinOrder = (text: string) => {
  if (text === '') return 'Masukkan minimum order';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }
  const minOrderInt = parseInt(text, 10);
  if (minOrderInt < 1) return 'Tidak boleh kurang dari 1';
  return '';
};

export const validateMaxOrder = (minOrder: string, maxOrder: string) => {
  if (maxOrder === '') return 'Masukkan minimum order';
  const re = /^[0-9]+$/;
  if (!re.test(maxOrder)) {
    return 'Angka tidak valid';
  }
  const minOrderInt = parseInt(minOrder, 10);
  const maxOrderInt = parseInt(maxOrder, 10);
  if (maxOrderInt < 1) return 'Tidak boleh kurang dari 1';
  if (maxOrderInt < minOrderInt) return 'Maksimum pemesanan tidak boleh kurang dari minimum pemesanan';
  return '';
};

export const validateWeight = (text: string) => {
  if (text === '') return 'Masukkan berat produk';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }
  const weightInt = parseInt(text, 10);
  if (weightInt < 1) return 'Tidak boleh kurang dari 1';
  return '';
};

export const validateIsHazardous = (text: string) => {
  if (!['0', '1'].includes(text)) return 'Pilih salah satu';
  return '';
};

export const validateProductName = (text: string) => {
  if (text === '') return 'Masukkan nama produk';
  if (text.length > 255) return 'Nama produk maksimal 255 karakter';

  const re = /^[a-zA-Z 0-9]+$/;
  if (!re.test(text)) {
    return 'Nama produk terdiri dari kombinasi huruf kecil, huruf besar dan angka';
  }
  return '';
};

export const validateProductDesc = (text: string) => {
  if (text === '') return 'Masukkan deskripsi produk';
  if (text.length > 3000) return 'Nama produk maksimal 3000 karakter';
  return '';
};

export const validateCategory = (text: string, list: {id: number}[]) => {
  if (text === '') return 'Pilih kategori';
  const listArr = list.map((item) => item.id);
  if (!listArr.includes(parseInt(text, 10))) return 'Kategori tidak valid';
  return '';
};

export const validateSubCategory = (text: string, list: {id: number}[]) => {
  if (text === '') return 'Pilih sub kategori';
  const listArr = list.map((item) => item.id);
  if (!listArr.includes(parseInt(text, 10))) return 'Sub kategori tidak valid';
  return '';
};

export const validateComplementarytegory = (text: string, list: {id: number}[]) => {
  if (text === '') return 'Pilih sub kategori pelengkap';
  const listArr = list.map((item) => item.id);
  if (!listArr.includes(parseInt(text, 10))) return 'Sub kategori pelengkap tidak valid';
  return '';
};

export const validateMainVariantTitle = (mainTitle: string) => {
  if (mainTitle === '') return 'Masukkan nama variasi 1';
  const re = /^[a-zA-Z 0-9]+$/;
  if (!re.test(mainTitle)) {
    return 'Nama variasi terdiri dari kombinasi huruf kecil, huruf besar dan angka';
  }
  if (mainTitle.length > 20) return 'Nama variasi 1 maksimal 20 karakter';
  return '';
};
export const validateSubVariantTitle = (mainTitle: string, subTitle: string) => {
  if (subTitle === '') return 'Masukkan nama variasi 2';
  const re = /^[a-zA-Z 0-9]+$/;
  if (!re.test(subTitle)) {
    return 'Nama variasi terdiri dari kombinasi huruf kecil, huruf besar dan angka';
  }
  if (subTitle.length > 20) return 'Nama variasi 2 maksimal 20 karakter';
  if (mainTitle === subTitle) return 'Nama variasi 1 dan variasi 2 tidak boleh sama';
  return '';
};

export const validateVariantItems = (items: string[]) => {
  let msg = '';
  const re = /^[a-zA-Z 0-9]+$/;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === '') {
      msg = 'Masukkan pilihan variasi';
      break;
    }
    if (!re.test(items[i])) {
      msg = 'Pilihan variasi terdiri dari kombinasi huruf kecil, huruf besar dan angka';
      break;
    }
    if (items[i].length > 20) {
      msg = 'Pilihan variasi maksimal 20 karakter';
      break;
    }
    if (items.filter((itemFilter) => itemFilter === items[i]).length > 1) {
      msg = 'Pilihan variasi tidak boleh sama';
      break;
    }
  }
  return msg;
};

export const validateVariantPriceItems = (items: string[]) => {
  let msg = '';
  const re = /^[0-9]+$/;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === '') {
      msg = 'Masukkan harga';
      break;
    }
    if (!re.test(items[i])) {
      msg = 'Angka tidak valid';
      break;
    }
    const inInt = parseInt(items[i], 10);
    if (inInt < 1000) {
      msg = 'Harga tidak boleh kurang dari Rp 1000';
      break;
    }
  }
  return msg;
};
export const validateVariantStockItems = (items: string[]) => {
  let msg = '';
  const re = /^[0-9]+$/;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === '') {
      msg = 'Masukkan stok';
      break;
    }
    if (!re.test(items[i])) {
      msg = 'Angka tidak valid';
      break;
    }
    const inInt = parseInt(items[i], 10);
    if (inInt < 0) {
      msg = 'Stok tidak boleh kurang dari 0';
      break;
    }
  }
  return msg;
};

export const validatePhoto = (text: string) => {
  if (text === '') return 'Upload foto';
  return '';
};

export const validatePromotionTitle = (text: string) => {
  if (text === '') return 'Masukkan nama promosi';
  if (text.length > 50) return 'Nama promosi maksimal 50 karakter';

  const re = /^[a-zA-Z 0-9]+$/;
  if (!re.test(text)) {
    return 'Nama promosi terdiri dari kombinasi huruf kecil, huruf besar dan angka';
  }
  return '';
};

export const validateMaxItem = (text: string) => {
  if (text === '') return 'Masukkan batas pembelian';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }
  const maxItemInt = parseInt(text, 10);
  if (maxItemInt < 1) return 'Tidak boleh kurang dari 1';
  return '';
};
