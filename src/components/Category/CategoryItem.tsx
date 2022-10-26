/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/style/category.css';
import categoryData from '../../models/categoryData';
import { axiosPrivate } from '../../utils/API';
import Toast from '../Interaction/Toast';

type props = {
  category: categoryData,
}
export default function CategoryItem({ category }:props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleDelete = () => {
    Swal.fire({
      text: 'Hapus category ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/sellers/categories/${category.id}`)
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
            Toast.fire({
              icon: 'error',
              title: 'Gagal menghapus kategori',
            });
            throw new Error(err);
          });
      }
    });
  };

  if (isDeleted) return <div />;

  return (
    <tr className="category-item">
      <td>
        <span>{category.title}</span>
      </td>
      <td>
        <span>{category.product_count}</span>
      </td>
      <td>
        <div>
          <Link
              to={`/category/${category.id}/edit`}
              title="Edit"
              className="icon-mini icon-mini-orange"
            >
              <i className="bi bi-pencil" />
            </Link>
          <button
            type="button"
            title="Hapus"
            className="icon-mini icon-mini-red"
          >
            <i className="bi bi-trash2" />
          </button>
        </div>
      </td>
    </tr>
  );
}
