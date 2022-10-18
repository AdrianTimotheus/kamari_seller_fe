/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import useAppSelector from '../../hooks/useAppSelector';
import VoucherForm from '../../layouts/Form/Voucher/VoucherForm';
import { selectUser } from '../../store/userSlice';
import { axiosPrivate } from '../../utils/API';
import { convertDateToUnix } from '../../utils/Date';
import { routeVoucherList } from '../../utils/RouteList';
import { parseVoucherCode } from '../../utils/Utils';
import {
  validateVoucherTitle,
  validateVoucherCode,
  validatePromoType,
  validateStock,
  validateStartEndDate,
  validatePrice,
  validatePercentage,
} from '../../utils/FormValidations';
import FormSkeleton from '../../components/Loading/FormSkeleton';

export default function VoucherNew() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector(selectUser);
  const [prefix, setPrefix] = useState<string>('');
  const [form, setForm] = useState({
    title: '',
    code: '',
    promo_type_id: '1',
    discount_amount: '',
    start_date: '',
    end_date: '',
    stock_left: '',
    minimum_payment: '',
  });
  const [validationMsg, setValidationMsg] = useState({
    title: '',
    code: '',
    promo_type_id: '',
    discount_amount: '',
    start_end_date: '',
    stock_left: '',
    minimum_payment: '',
  });
  const handleChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    if (name === 'code') setForm({ ...form, [name]: parseVoucherCode(value) });
    else setForm({ ...form, [name]: value });
  };

  const submitNew = () => {
    axiosPrivate.post('/sellers/vouchers', {
      title: form.title,
      prefix,
      code: form.code,
      promo_type_id: parseInt(form.promo_type_id, 10),
      discount_amount: parseInt(form.discount_amount, 10),
      start_date: convertDateToUnix(form.start_date),
      end_date: convertDateToUnix(form.end_date),
      stock_left: parseInt(form.stock_left, 10),
      minimum_payment: parseInt(form.minimum_payment, 10),
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Voucher berhasil dibuat',
        });
        navigate(routeVoucherList);
      })
      .catch((err) => {
        if (err.response.data.code === 'VOUCHER_EXIST') {
          setValidationMsg({ ...validationMsg, code: 'Kode voucher sudah pernah dibuat' });
          Toast.fire({
            icon: 'error',
            title: 'Kode voucher sudah pernah dibuat',
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: err.message,
          });
        }
      });
  };

  const validateFormNew = () => {
    const titleValidation = validateVoucherTitle(form.title);
    const codeValidation = validateVoucherCode(form.code);
    const promoTypeValidation = validatePromoType(form.promo_type_id);
    const stockValidation = validateStock(form.stock_left);
    const startEndDateValidation = validateStartEndDate('new', form.start_date, form.end_date);
    const discountValidation = form.promo_type_id === '1' ? validatePrice(form.discount_amount, 1000)
      : validatePercentage(form.discount_amount);
    const minPaymentValidation = validatePrice(form.minimum_payment, 0);

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
      code: codeValidation,
      promo_type_id: promoTypeValidation,
      stock_left: stockValidation,
      discount_amount: discountValidation,
      start_end_date: startEndDateValidation,
      minimum_payment: minPaymentValidation,
    });

    if (titleValidation !== ''
    || codeValidation !== ''
    || promoTypeValidation !== ''
    || stockValidation !== ''
    || discountValidation !== ''
    || startEndDateValidation !== ''
    || minPaymentValidation !== ''
    ) return false;

    return true;
  };

  const handleSubmit = () => {
    if (validateFormNew()) submitNew();
  };

  useEffect(() => {
    if (searchParams.get('copy')) {
      axiosPrivate.get(`/sellers/vouchers/${searchParams.get('copy')}`)
        .then((res) => {
          const voucher = res.data;
          setForm({
            ...form,
            title: voucher.title,
            promo_type_id: voucher.promo_type_id.toString(),
            discount_amount: voucher.discount_amount,
            stock_left: voucher.stock_left,
            minimum_payment: voucher.minimum_payment,
          });
        })
        .catch(() => {
          navigate(routeVoucherList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    setPrefix(user.username.slice(0, 4).toUpperCase());
  }, [user]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Voucher" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Voucher Toko" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Voucher Baru" />
          {prefix === '' || isLoading ? (
            <FormSkeleton />
          ) : (
            <VoucherForm
              mode="new"
              prefix={prefix}
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              validationMsg={validationMsg}
            />
          )}
        </div>
      </div>
    </div>
  );
}
