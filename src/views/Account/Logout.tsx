import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../utils/API';
import { deleteLogin } from '../../utils/Auth';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    deleteLogin();
    axiosPublic.get('/logout')
      .catch((err) => {
        throw new Error(err);
      });
    navigate('/login');
    window.location.reload();
  });
  return (
    <div>Logout</div>
  );
}
