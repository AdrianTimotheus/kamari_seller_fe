/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

const decodeToken:any = (token: string) => jwt_decode(token);

export const getToken = () => localStorage.getItem('token');

export const saveLogin = (token: string) => {
  setToken(token);
};

export const deleteLogin = () => {
  localStorage.removeItem('token');
};

export const getUserFromToken = (token: string | null) => {
  const { user } = decodeToken(token);
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    roleId: user.role_id,
    picUrl: user.pic_url,
  };
};

export const isLoggedIn = () => {
  if (getToken() === null) return false;
  return true;
};
