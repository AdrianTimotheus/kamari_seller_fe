/* eslint-disable react/no-array-index-key */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import Swal from 'sweetalert2';
import Toast from '../../../components/Interaction/Toast';
import promoItemData from '../../../models/promoItemData';
import { axiosPrivate } from '../../../utils/API';
import AddProductModal from '../../Promotion/AddProductModal';
import PromotionFormItemForm from './PromotionFormItemForm';
import PromotionItemsController from './PromotionItemsController';

type props = {
  mode: string,
  promotionId?: number,
  formPromotionItems: promoItemData[],
  setFormPromotionItems: Dispatch<SetStateAction<promoItemData[]>>,
  handleChangeFormPromotionItems: Function,
  handleUpdateProductItems: Function,
  itemsValidationMsg: {
    promoType: string[],
    discount: string[],
    stock: string[],
    maxItem: string[],
  },
  fetchPromoItems: Function,
}

const defaultProps = {
  promotionId: 0,
};

export default function PromotionItemsForm({
  mode,
  promotionId,
  formPromotionItems,
  setFormPromotionItems,
  handleChangeFormPromotionItems,
  handleUpdateProductItems,
  itemsValidationMsg,
  fetchPromoItems,
}:props) {
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const [tempSelectedProductIds, setTempSelectedProductIds] = useState<number[]>([]);
  const handleChangeCheckedProductId = (e: FormEvent<HTMLInputElement>) => {
    const productId = parseInt(e.currentTarget.value, 10);
    if (checkedProductIds.includes(productId)) {
      setCheckedProductIds((prev) => prev.filter((item) => item !== productId));
    } else {
      setCheckedProductIds([...checkedProductIds, productId]);
    }
  };
  const handleSelectAll = () => {
    if (checkedProductIds.length < formPromotionItems.length) {
      setCheckedProductIds(() => formPromotionItems.map((item) => item.product_id));
    } else {
      setCheckedProductIds([]);
    }
  };
  const handleUpdateAll = (
    promoType: string,
    discount: string,
    stock: string,
    maxItem: string,
  ) => {
    setFormPromotionItems((prev) => prev.map((item) => {
      if (checkedProductIds.includes(item.product_id)) {
        return {
          promo_item_id: item.promo_item_id,
          product_id: item.product_id,
          promo_type_id: promoType,
          discount_amount: discount,
          stock_left: stock,
          maximum_item: maxItem,
          product: item.product,
        };
      }
      return item;
    }));
  };
  const handleChangeTempSelectedProductIds = (product: any) => {
    if (tempSelectedProductIds.includes(product.id)) {
      setTempSelectedProductIds((prev) => prev.filter((item) => item !== product.id));
    } else {
      setTempSelectedProductIds([...tempSelectedProductIds, product.id]);
    }
  };
  const submitPostPromoItems = () => {
    axiosPrivate.post(`/sellers/promos/${promotionId}/promo-items`, {
      promotionItems: tempSelectedProductIds.map((item) => ({
        product_id: item,
        promo_type_id: 1,
      })),
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Produk berhasil ditambahkan ke promosi',
        });
        fetchPromoItems();
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal menambah ke promosi',
        });
        throw new Error(err);
      });
  };
  const submitDeletePromoItems = (product: any) => {
    Swal.fire({
      text: 'Hapus produk ini dari promosi?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/sellers/promos/${promotionId}/promo-items`, {
          data: {
            promo_items_id: formPromotionItems
              .filter((filterItem) => filterItem.product_id === product.id)
              .map((mapItem) => mapItem.promo_item_id),
          },
        })
          .then((res) => {
            if (res.status === 200) {
              Toast.fire({
                icon: 'success',
                title: 'Produk dihapus dari promosi',
              });
              fetchPromoItems();
            }
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: 'Gagal menghapus dari promosi',
            });
            throw new Error(err);
          });
      }
    });
  };
  return (
    <div>
      <div>
        <AddProductModal
          mode={mode}
          formPromotionItems={formPromotionItems}
          handleUpdateProductItems={mode === 'new' ? handleUpdateProductItems : handleChangeTempSelectedProductIds}
          submitPostPromoItems={submitPostPromoItems}
        />
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          <i className="bi bi-plus" />
          Tambah Produk
        </button>
      </div>
      {formPromotionItems.length !== 0 && (
        <>
          <PromotionItemsController
            isAllSelected={checkedProductIds.length === formPromotionItems.length}
            handleSelectAll={handleSelectAll}
            handleUpdateAll={handleUpdateAll}
          />
          <div className="d-flex flex-column gap-3">
            {formPromotionItems.map((item, index: number) => (
              <PromotionFormItemForm
                key={`promotion-form-item-form-${index}`}
                index={index}
                item={item}
                handleUpdateProductItems={mode === 'new' ? handleUpdateProductItems : submitDeletePromoItems}
                handleChangeFormPromotionItems={handleChangeFormPromotionItems}
                itemsValidationMsg={itemsValidationMsg}
                checkedProductIds={checkedProductIds}
                handleChangeCheckedProductId={handleChangeCheckedProductId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
PromotionItemsForm.defaultProps = defaultProps;
