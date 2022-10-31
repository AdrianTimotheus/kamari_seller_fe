/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import SellerCategoriesItemsForm from '../../layouts/Form/Category/SellerCategoriesItemsForm';
import sellerCategoryItems from '../../models/sellerCategoryItems';
import FormSkeleton from '../../components/Loading/FormSkeleton';

export default function SellerCategoryEdit() {
  const params = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  const [formSellerCategoriesItems, setFormSellerCategoriesItems] = useState<sellerCategoryItems[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formSellerCategoriesInfo, setFormSellerCategoriesInfo] = useState({
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
    setFormSellerCategoriesInfo({ ...formSellerCategoriesInfo, [name]: value });
  };

  const handleUpdateProductItems = (product: any) => {
    setFormSellerCategoriesItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  const submitEdit = () => {
    axiosPrivate.put(`/sellers/categories/${params.sellerCategoriesId}`, {
      name: formSellerCategoriesInfo.title,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Kategori berhasil diubah',
        });
        navigate(routeSellerCategories);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mengubah kategori',
        });
        throw new Error(err);
      });
  };

  const validateFormEdit = () => {
    const titleValidation = validateVoucherTitle(formSellerCategoriesInfo.title);

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
    });

    return titleValidation === '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormEdit()) submitEdit();
  };

  useEffect(() => {
    if (params.sellerCategoriesId) {
      axiosPrivate.get(`/sellers/categories/${params.sellerCategoriesId}`)
        .then((res) => {
          setFormSellerCategoriesInfo({ ...formSellerCategoriesInfo, title: res.data.title });
        })
        .catch(() => {
          navigate(routeSellerCategories);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Edit Kategori" />
        <PageBreadcrumb main="Produk" sub="Kategori Toko" />
      </div>
      <div>
        {isLoading ? (
          <FormSkeleton />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="page-content">
              <SectionTitle text="Informasi Dasar" />
              <SellerCategoriesInfoForm
                form={formSellerCategoriesInfo}
                handleChange={handleChange}
                validationMsg={validationMsg}
              />
            </div>
            <div className="page-content">
              <SectionTitle text="Produk Yang termasuk kategori ini" />
              <SellerCategoriesItemsForm
                mode="edit"
                sellerCategoriesId={Number(params.sellerCategoriesId)}
                formSellerCategoriesItems={formSellerCategoriesItems}
                handleUpdateProductItems={handleUpdateProductItems}
              />
            </div>
            <div className="page-content d-flex justify-content-end">
              <SubmitButton text="Ubah Kategori" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
