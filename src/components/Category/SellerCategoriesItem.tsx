import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/style/voucher.css';
import sellerCategoriesData from '../../models/sellerCategoriesData';
import { axiosPrivate } from '../../utils/API';
import Toast from '../Interaction/Toast';

type props = {
  sellerCategories: sellerCategoriesData,
}
export default function SellerCategoriesItem({ sellerCategories }:props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

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
        axiosPrivate.delete(`/sellers/categories/${sellerCategories.id}`)
          .then((res) => {
            if (res.status === 200) {
              Toast.fire({
                icon: 'success',
                title: 'Kategori dihapus',
              });
              setIsDeleted(true);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.code === 'CATEGORY_USED_ERROR') {
              Toast.fire({
                icon: 'error',
                title: 'Terdapat produk di dalam kategori',
              });
            } else {
              Toast.fire({
                icon: 'error',
                title: 'Gagal menghapus kategori',
              });
            }
            throw new Error(err);
          });
      }
    });
  };

  if (isDeleted) return <div />;

  return (
    <tr className="voucher">
      <td>
        <span>{sellerCategories.id}</span>
      </td>
      <td>
        <span>{sellerCategories.title}</span>
      </td>
      <td>
        <span>{sellerCategories.products_count}</span>
      </td>
      <td>
        <div>
          <Link
            to={`${(sellerCategories.id).toString()}/edit`}
            title="Edit"
            className="icon-mini icon-mini-orange"
          >
            <i className="bi bi-pencil" />
          </Link>
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
