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
  if (text === '') return 'Masukkan tipe promo';
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

export const validateStock = (text: string) => {
  if (text === '') return 'Masukkan stok';
  const re = /^[0-9]+$/;
  if (!re.test(text)) {
    return 'Angka tidak valid';
  }

  const inInt = parseInt(text, 10);
  if (inInt < 1) return 'Tidak boleh kurang dari 1';
  return '';
};
