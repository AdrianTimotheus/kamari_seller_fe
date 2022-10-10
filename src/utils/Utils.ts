import moment from 'moment';
import 'moment/locale/id';
import { getToken } from './Auth';

moment.locale('id');

export const convertDateToUnix = (date:string) => Math.floor(new Date(date).getTime() / 1000);

export const parseMonthYear = (date:string) => moment(date).format('MMMM YYYY');
export const parseFullDate = (date:string) => moment(date).format('DD MMMM YYYY HH:mm');

export const removeDuplicates = (arr:any[]) => arr.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);

export const axiosConfig = {
  headers: { Authorization: `Bearer ${getToken()}` },
};
