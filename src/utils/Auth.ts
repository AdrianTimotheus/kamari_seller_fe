/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';

const decodeToken:any = (token: string) => jwt_decode(token);

const isTokenValid = (token: string) => {
  if (token === null || token === undefined || token === '') return false;
  let decodedToken = {
    iss: '',
    user: '',
  };

  try {
    decodedToken = decodeToken(token);
  } catch {
    return false;
  }

  const { iss, user } = decodedToken;
  if (iss !== 'kamari') return false;
  if (!user) return false;
  return true;
};

export const getToken = () => localStorage.getItem('token');

export const saveLogin = (token: string) => {
  localStorage.setItem('token', token);
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
  const token = getToken();
  const isValid = isTokenValid(token || '');
  if (!isValid) deleteLogin();
  return isValid;
};
