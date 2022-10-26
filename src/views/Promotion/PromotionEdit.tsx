/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toast from '../../components/Interaction/Toast';
import '../../assets/style/promotion.css';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { routePromotionList } from '../../utils/RouteList';
import promoItemData from '../../models/promoItemData';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PromotionInfoForm from '../../layouts/Form/Promotion/PromotionInfoForm';
import PromotionItemsForm from '../../layouts/Form/Promotion/PromotionItemsForm';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import {
  isOnGoing,
  isWillCome,
  parseCalendar,
} from '../../utils/Date';
import {
  validatePromotionTitle,
  validatePromoType,
  validateStock,
  validatePercentage,
  validateMaxItem,
  validatePromoAmount,
} from '../../utils/FormValidations';

export default function PromotionEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<string>('');
  const [promotion, setPromotion] = useState<any>({});
  const [formPromotionItems, setFormPromotionItems] = useState<promoItemData[]>([]);
  const [formPromotionInfo, setFormPromotionInfo] = useState({
    title: '',
    start_date: '',
    end_date: '',
  });
  const [validationMsg, setValidationMsg] = useState({
    title: '',
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
  const handleUpdateProductItems = () => {
    //
  };

  const fetchPromoItems = () => {
    setIsProcessing('promo-items');
    setFormPromotionItems([]);
    axiosPrivate.get(`/sellers/promos/${params.promotionId}`)
      .then((res) => {
        setFormPromotionItems(res.data.product_promo_items.map((item:any) => ({
          promo_item_id: item.id,
          product_id: item.product.id,
          promo_type_id: item.promo_type_id.toString(),
          discount_amount: item.discount_amount.toString(),
          stock_left: item.stock_left.toString(),
          maximum_item: item.maximum_item.toString(),
          product: item.product,
        })));
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Terdapat masalah koneksi',
        });
        throw new Error(err);
      })
      .finally(() => {
        setIsProcessing('');
      });
  };

  const submitEdit = () => {
    const promoItems = formPromotionItems.map((item) => ({
      id: item.promo_item_id,
      product_id: item.product_id,
      promo_type_id: parseInt(item.promo_type_id, 10),
      discount_amount: parseInt(item.discount_amount, 10),
      stock_left: parseInt(item.stock_left, 10),
      maximum_item: parseInt(item.maximum_item, 10),
    }));
    axiosPrivate.put(`/sellers/promos/${promotion.id}`, {
      title: formPromotionInfo.title,
      promo_items: promoItems,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Promosi berhasil diedit',
        });
        navigate(routePromotionList);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mengedit promosi',
        });
        throw new Error(err);
      });
  };

  const validateFormEdit = () => {
    const titleValidation = validatePromotionTitle(formPromotionInfo.title);

    const promoTypeValidations = formPromotionItems
      .map((item) => validatePromoType(item.promo_type_id));
    const discountValidations = formPromotionItems.map((item) => {
      if (item.promo_type_id === '2') return validatePercentage(item.discount_amount);
      let price = 0;
      if (item.product) {
        if (item.product.price) {
          price = item.product.price;
        } else if (item.product.ProductVariants) {
          const priceRange = item.product.ProductVariants
            .map((mapItem:any) => mapItem.price)
            .sort((a: number, b: number) => a - b);
          [price] = priceRange;
        }
      }
      return validatePromoAmount(item.discount_amount, 1, price);
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
    });

    if (titleValidation !== ''
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
    if (validateFormEdit()) submitEdit();
  };

  const handleEndPromotion = () => {
    Swal.fire({
      text: 'Akhiri promosi ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, akhiri',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/sellers/promos/${promotion.id}`)
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Promosi diakhiri',
            });
            navigate(routePromotionList);
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: 'Gagal mengakhiri promosi',
            });
            throw new Error(err);
          });
      }
    });
  };

  useEffect(() => {
    if (params.promotionId) {
      axiosPrivate.get(`/sellers/promos/${params.promotionId}`)
        .then((res) => {
          setPromotion(res.data);
        })
        .catch(() => {
          navigate(routePromotionList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate(routePromotionList);
    }
  }, []);

  useEffect(() => {
    if (promotion.id) {
      if ((isWillCome(promotion.start_date) && !promotion.has_ended)
        || (isOnGoing(promotion.start_date, promotion.end_date) && !promotion.has_ended)
      ) {
        setFormPromotionInfo({
          title: promotion.title,
          start_date: parseCalendar(promotion.start_date),
          end_date: parseCalendar(promotion.end_date),
        });
        if (promotion.product_promo_items) {
          setFormPromotionItems(promotion.product_promo_items.map((item:any) => ({
            promo_item_id: item.id,
            product_id: item.product.id,
            promo_type_id: item.promo_type_id.toString(),
            discount_amount: item.discount_amount.toString(),
            stock_left: item.stock_left.toString(),
            maximum_item: item.maximum_item.toString(),
            product: item.product,
          })));
        }
      } else {
        navigate(routePromotionList);
      }
    }
  }, [promotion]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Edit Promosi" />
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
                mode="edit"
                formPromotionInfo={formPromotionInfo}
                handleChange={handleChangePromotionInfo}
                validationMsg={validationMsg}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Produk Yang Dipromosikan" />
            {isLoading || isProcessing === 'promo-items' ? (
              <FormSkeleton />
            ) : (
              <PromotionItemsForm
                mode="edit"
                promotionId={promotion.id}
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
            <div className="page-content d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => handleEndPromotion()}
              >
                Akhiri Promosi
              </button>
              <SubmitButton text="Simpan Promosi" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
