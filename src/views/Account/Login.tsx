/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LabeledInput from '../../components/Form/Basic/LabeledInput';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import Toast from '../../components/Interaction/Toast';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import useAppDispatch from '../../hooks/useAppDispatch';
import { googleAuthActions } from '../../store/googleAuthSlice';
import { axiosPublic } from '../../utils/API';
import { saveLogin, isLoggedIn } from '../../utils/Auth';
import { setDocumentTitle } from '../../utils/Utils';
import { googleClientId } from '../../utils/Values';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };
  const fetchToken = () => {
    setIsProcessing(true);
    axiosPublic.post('/login', {
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        saveLogin(res.data.idToken);
        navigate('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Toast.fire({
            icon: 'warning',
            title: 'Username atau password salah',
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Terdapat masalah koneksi',
          });
          throw new Error(err);
        }
      })
      .finally(() => setIsProcessing(false));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchToken();
  };

  useEffect(() => {
    if (isLoggedIn()) navigate('/');
  }, [navigate]);

  const handleSigninGoogleResponse = (response: any) => {
    setIsProcessing(true);
    const decoded:any = jwt_decode(response.credential);
    axiosPublic.post('/login-with-google', {
      token: response.credential,
    })
      .then((res) => {
        saveLogin(res.data.idToken);
        navigate('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // when email is valid, but not registered
          dispatch(googleAuthActions.setGoogleAuth({
            email: decoded.email,
            name: decoded.name,
          }));
          navigate('/signup');
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Terdapat masalah koneksi',
          });
          throw new Error(err);
        }
      })
      .finally(() => setIsProcessing(false));
  };

  useEffect(() => {
    setDocumentTitle('Login');
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleSigninGoogleResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('signinGoogle'),
      { theme: 'outline', size: 'large' },
    );
  }, []);

  return (
    <div className="account__form-container">
      <div className=" d-flex justify-content-center align-items-center login__account-container">
        <div className="p-4 shadow rounded bg-white form__login-container">
          <h4 className="mb-5 text-center">Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <LabeledInput
                type="email"
                label="Email"
                fieldName="email"
                value={form.email}
                handleChange={(e:FormEvent<HTMLInputElement>) => handleChange(e)}
                validationMsg=""
                isRequired
              />
            </div>
            <div className="mb-3">
              <LabeledInput
                type="password"
                label="Password"
                fieldName="password"
                value={form.password}
                handleChange={(e:FormEvent<HTMLInputElement>) => handleChange(e)}
                validationMsg=""
                isRequired
              />
            </div>
            <div className="mb-3 d-flex flex-column gap-3 justify-content-center align-items-center">
              {isProcessing ? (
                <button type="button" className="btn btn-secondary w-100">
                  <LoadingSpinner />
                </button>
              ) : (
                <SubmitButton text="Login" />
              )}
              <div id="signinGoogle" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
