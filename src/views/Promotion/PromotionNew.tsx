/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { routePromotionList } from '../../utils/RouteList';
import {
  validatePromotionTitle,
  validatePromoType,
  validateStock,
  validateStartEndDate,
  validatePercentage,
  validateMaxItem,
  validatePromoAmount,
} from '../../utils/FormValidations';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PromotionInfoForm from '../../layouts/Form/Promotion/PromotionInfoForm';
import PromotionItemsForm from '../../layouts/Form/Promotion/PromotionItemsForm';
import '../../assets/style/promotion.css';
import promoItemData from '../../models/promoItemData';
import { convertDateToUnix } from '../../utils/Date';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import { setDocumentTitle } from '../../utils/Utils';

export default function PromotionNew() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formPromotionItems, setFormPromotionItems] = useState<promoItemData[]>([]);
  const [formPromotionInfo, setFormPromotionInfo] = useState({
    title: '',
    start_date: '',
    end_date: '',
  });
  const [validationMsg, setValidationMsg] = useState({
    title: '',
    start_end_date: '',
  });
  const [itemsValidationMsg, setItemsValidationMsg] = useState<{
    promoType: string[],
    discount: string[],
    stock: string[],
    maxItem: string[],
  }>({
    promoType: [],
    discount: [],
    stock: [],
    maxItem: [],
  });

  const handleChangePromotionInfo = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setFormPromotionInfo({ ...formPromotionInfo, [name]: value });
  };
  const handleChangeFormPromotionItems = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    const [key, id] = name.split('#');
    setFormPromotionItems((prev) => prev.map((item) => {
      if (item.product_id === parseInt(id, 10)) {
        return {
          ...item,
          [key]: value,
        };
      }
      return item;
    }));
  };
  const handleUpdateProductItems = (product: any) => {
    if (formPromotionItems.find((item) => item.product_id === product.id)) {
      setFormPromotionItems((prev) => prev.filter((item) => item.product_id !== product.id));
    } else {
      setFormPromotionItems([...formPromotionItems, {
        promo_item_id: 0,
        product_id: product.id,
        promo_type_id: '',
        discount_amount: '',
        stock_left: '',
        maximum_item: '',
        product,
      }]);
    }
  };
  const fetchPromoItems = () => {
    //
  };

  const submitNew = () => {
    const promoItems = formPromotionItems.map((item) => ({
      product_id: item.product_id,
      promo_type_id: parseInt(item.promo_type_id, 10),
      discount_amount: parseInt(item.discount_amount, 10),
      stock_left: parseInt(item.stock_left, 10),
      maximum_item: parseInt(item.maximum_item, 10),
    }));
    axiosPrivate.post('/sellers/promos', {
      title: formPromotionInfo.title,
      start_date: convertDateToUnix(formPromotionInfo.start_date),
      end_date: convertDateToUnix(formPromotionInfo.end_date),
      promo_items: promoItems,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Promosi berhasil dibuat',
        });
        navigate(routePromotionList);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal membuat promosi',
        });
        throw new Error(err);
      });
  };

  const validateFormNew = () => {
    const titleValidation = validatePromotionTitle(formPromotionInfo.title);
    const startEndDateValidation = validateStartEndDate('new', formPromotionInfo.start_date, formPromotionInfo.end_date);

    const promoTypeValidations = formPromotionItems
      .map((item) => validatePromoType(item.promo_type_id));
    const discountValidations = formPromotionItems.map((item) => {
      if (item.promo_type_id === '1') return validatePromoAmount(item.discount_amount, 1, item.product.price);
      return validatePercentage(item.discount_amount);
    });
    const stockValidations = formPromotionItems.map((item) => validateStock(item.stock_left));
    const maxItemValidations = formPromotionItems.map((item) => validateMaxItem(item.maximum_item));

    setItemsValidationMsg({
      ...itemsValidationMsg,
      promoType: promoTypeValidations,
      discount: discountValidations,
      stock: stockValidations,
      maxItem: maxItemValidations,
    });

    setValidationMsg({
      ...validationMsg,
      title: titleValidation,
      start_end_date: startEndDateValidation,
    });

    if (titleValidation !== ''
    || startEndDateValidation !== ''
    ) return false;

    for (let i = 0; i < promoTypeValidations.length; i += 1) {
      if (promoTypeValidations[i] !== '') return false;
    }
    for (let i = 0; i < discountValidations.length; i += 1) {
      if (discountValidations[i] !== '') return false;
    }
    for (let i = 0; i < stockValidations.length; i += 1) {
      if (stockValidations[i] !== '') return false;
    }
    for (let i = 0; i < maxItemValidations.length; i += 1) {
      if (maxItemValidations[i] !== '') return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormNew()) submitNew();
  };

  useEffect(() => {
    setDocumentTitle('Buat Promosi');
    if (searchParams.get('copy')) {
      axiosPrivate.get(`/sellers/promos/${searchParams.get('copy')}`)
        .then((res) => {
          const promotion = res.data;
          setFormPromotionInfo({
            ...formPromotionInfo,
            title: promotion.title,
          });
        })
        .catch(() => {
          navigate(routePromotionList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Promosi" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Promosi" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="page-content">
            <SectionTitle text="Informasi Dasar" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <PromotionInfoForm
                mode="new"
                formPromotionInfo={formPromotionInfo}
                handleChange={handleChangePromotionInfo}
                validationMsg={validationMsg}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Produk Yang Dipromosikan" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <PromotionItemsForm
                mode="new"
                formPromotionItems={formPromotionItems}
                setFormPromotionItems={setFormPromotionItems}
                handleChangeFormPromotionItems={handleChangeFormPromotionItems}
                handleUpdateProductItems={handleUpdateProductItems}
                itemsValidationMsg={itemsValidationMsg}
                fetchPromoItems={fetchPromoItems}
              />
            )}
          </div>
          {!isLoading && (
            <div className="page-content d-flex justify-content-end">
              <SubmitButton text="Buat Promosi" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
