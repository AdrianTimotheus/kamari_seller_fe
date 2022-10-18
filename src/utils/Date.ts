import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export const convertDateToUnix = (date:string) => Math.floor(new Date(date).getTime() / 1000);
export const parseMonthYear = (date:string) => moment(date).format('MMMM YYYY');
export const parseFullDate = (date:string) => moment(date).format('DD MMMM YYYY HH:mm');
export const parseDate = (date:string) => moment(date).format('DD MMMM YYYY');
export const parseCalendar = (date:string) => moment(date).format('YYYY-MM-DD');

export const isEnded = (endDate: string) => moment().startOf('day').isAfter(endDate);
export const isWillCome = (startDate: string) => moment().endOf('day').isBefore(startDate);
export const isOnGoing = (startDate: string, endDate: string) => !isEnded(endDate)
  && !isWillCome(startDate);
