/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { routeCategoryList } from '../../utils/RouteList';
import {
  validateCategoryTitle,
} from '../../utils/FormValidations';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import CategoryFormInfo from '../../layouts/Form/Category/CategoryFormInfo';
import { setDocumentTitle } from '../../utils/Utils';

export default function CategoryNew() {
  const navigate = useNavigate();
  const [formCategoryInfo, setFormCategoryInfo] = useState({
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
    setFormCategoryInfo({ ...formCategoryInfo, [name]: value });
  };

  const submitNew = () => {
    axiosPrivate.post('/sellers/categories', {
      name: formCategoryInfo.title,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Kategori berhasil dibuat',
        });
        navigate(routeCategoryList);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal membuat kategori',
        });
        throw new Error(err);
      });
  };

  const validateFormNew = () => {
    const titleValidation = validateCategoryTitle(formCategoryInfo.title);

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
    });

    if (titleValidation !== ''
    ) return false;

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormNew()) {
      submitNew();
    }
  };

  useEffect(() => {
    setDocumentTitle('Buat Kategori Toko');
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Kategori Toko" />
        <PageBreadcrumb main="Produk" sub="Kategori Toko" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="page-content">
            <SectionTitle text="Kategori Toko Baru" />
            <CategoryFormInfo
              form={formCategoryInfo}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              validationMsg={validationMsg}
            />
          </div>
          <div className="page-content d-flex justify-content-end">
            <SubmitButton text="Buat Kategori" />
          </div>
        </form>
      </div>
    </div>
  );
}
