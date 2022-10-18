/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import VoucherForm from '../../layouts/Form/Voucher/VoucherForm';
import { axiosPrivate } from '../../utils/API';
import {
  convertDateToUnix,
  isOnGoing,
  isWillCome,
  parseCalendar,
} from '../../utils/Date';
import { routeVoucherList } from '../../utils/RouteList';
import {
  validateVoucherTitle,
  validatePromoType,
  validateStock,
  validateStartEndDate,
  validatePrice,
  validatePercentage,
} from '../../utils/FormValidations';
import FormSkeleton from '../../components/Loading/FormSkeleton';

export default function VoucherEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [voucher, setVoucher] = useState<any>({});
  const [form, setForm] = useState({
    title: '',
    promo_type_id: '',
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
    setForm({ ...form, [name]: value });
  };

  const submitEdit = () => {
    if (isWillCome(voucher.start_date) || isOnGoing(voucher.start_date, voucher.end_date)) {
      axiosPrivate.patch(`/sellers/vouchers/${voucher.id}`, {
        title: form.title,
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
            title: 'Voucher berhasil diedit',
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
    } else {
      navigate(routeVoucherList);
    }
  };

  const validateFormEdit = () => {
    const titleValidation = validateVoucherTitle(form.title);
    const promoTypeValidation = validatePromoType(form.promo_type_id);
    const stockValidation = validateStock(form.stock_left);
    const startEndDateValidation = validateStartEndDate('edit', form.start_date, form.end_date);
    const discountValidation = form.promo_type_id === '1' ? validatePrice(form.discount_amount, 1000)
      : validatePercentage(form.discount_amount);
    const minPaymentValidation = validatePrice(form.minimum_payment, 0);

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
      promo_type_id: promoTypeValidation,
      stock_left: stockValidation,
      discount_amount: discountValidation,
      start_end_date: startEndDateValidation,
      minimum_payment: minPaymentValidation,
    });

    if (titleValidation !== ''
    || promoTypeValidation !== ''
    || stockValidation !== ''
    || discountValidation !== ''
    || startEndDateValidation !== ''
    || minPaymentValidation !== ''
    ) return false;

    return true;
  };

  const handleSubmit = () => {
    if (validateFormEdit()) submitEdit();
  };

  useEffect(() => {
    if (params.voucherId) {
      axiosPrivate.get(`/sellers/vouchers/${params.voucherId}`)
        .then((res) => {
          setVoucher(res.data);
        })
        .catch(() => {
          navigate(routeVoucherList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (voucher.id) {
      if (isWillCome(voucher.start_date) || isOnGoing(voucher.start_date, voucher.end_date)) {
        setForm({
          title: voucher.title,
          promo_type_id: voucher.promo_type_id.toString(),
          discount_amount: voucher.discount_amount,
          start_date: parseCalendar(voucher.start_date),
          end_date: parseCalendar(voucher.end_date),
          stock_left: voucher.stock_left,
          minimum_payment: voucher.minimum_payment,
        });
      } else {
        navigate(routeVoucherList);
      }
    }
  }, [voucher]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Edit Voucher" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Voucher Toko" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Edit Voucher" />
          {isLoading || !voucher.id ? (
            <FormSkeleton />
          ) : (
            <VoucherForm
              mode="edit"
              voucher={voucher}
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
