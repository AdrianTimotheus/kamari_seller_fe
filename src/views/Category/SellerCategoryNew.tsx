/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { routeSellerCategories } from '../../utils/RouteList';
import {
  validateVoucherTitle,
} from '../../utils/FormValidations';
import SellerCategoriesInfoForm from '../../layouts/Form/Category/SellerCategoriesInfoForm';
import SubmitButton from '../../components/Form/Basic/SubmitButton';

export default function VoucherNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
  });
  const [validationMsg, setValidationMsg] = useState({
    title: '',
  });
  const handleChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const submitNew = () => {
    axiosPrivate.post('/sellers/categories', {
      name: form.title,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Kategori berhasil dibuat',
        });
        navigate(routeSellerCategories);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal membuat kategori',
        });
        throw new Error(err);
      })
      .finally(() => {
        navigate(routeSellerCategories);
      });
  };

  const validateFormNew = () => {
    const titleValidation = validateVoucherTitle(form.title);

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
    });

    return titleValidation === '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormNew()) submitNew();
  };

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Kategori Baru" />
        <PageBreadcrumb main="Produk" sub="Kategori Toko" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="page-content">
            <SectionTitle text="Kategori Baru" />
            <SellerCategoriesInfoForm
              form={form}
              handleChange={handleChange}
              validationMsg={validationMsg}
            />
          </div>
          <div className="page-content d-flex justify-content-end">
            <SubmitButton text="Buat Kategori Baru" />
          </div>
        </form>
      </div>
    </div>
  );
}
