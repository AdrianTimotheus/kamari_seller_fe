import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../assets/style/voucher.css';
import { axiosPrivate } from '../../utils/API';
import Toast from '../Interaction/Toast';
import sellerCategoryItems from '../../models/sellerCategoryItems';

type props = {
    sellerCategoryItemsProps: sellerCategoryItems,
}
export default function SellerCategoryItems({ sellerCategoryItemsProps }:props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const idParam = sellerCategoryItemsProps.id.toString();
  console.log(idParam);

  const handleDelete = () => {
    Swal.fire({
      text: 'Hapus kategori ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/sellers/categories/items/${idParam}`)
          .then((res) => {
            if (res.status === 200) {
              Toast.fire({
                icon: 'success',
                title: 'Produk dihapus dari kategori',
              });
              setIsDeleted(true);
            }
          })
          .catch((err) => {
            console.log(err);
            Toast.fire({
              icon: 'error',
              title: 'Gagal menghapus produk dari kategori',
            });
            throw new Error(err);
          });
      }
    });
  };

  if (isDeleted) return <div />;

  return (
    <tr className="voucher">
      <td>
        <span>{sellerCategoryItemsProps.name}</span>
      </td>
      <td>
        <div className="promo-list__product">
          <img alt="" src={sellerCategoryItemsProps.thumbnail_url} width="100px" height="100px" />
        </div>
      </td>
      <td>
        <div>
          <button
            type="button"
            title="Hapus"
            className="icon-mini icon-mini-red"
            onClick={() => handleDelete()}
          >
            <i className="bi bi-trash2" />
          </button>
        </div>
      </td>
    </tr>
  );
}
