// import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../assets/style/product.css';
import productData from '../../models/productData';
import { axiosPrivate } from '../../utils/API';
import { formatPrice } from '../../utils/Utils';
import Toast from '../Interaction/Toast';

type props = {
  product: productData,
}
export default function ProductItem({ product }:props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const handleDelete = () => {
    Swal.fire({
      text: 'Hapus produk ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/products/${product.id}`)
          .then((res) => {
            if (res.status === 200) {
              Toast.fire({
                icon: 'success',
                title: 'Produk dihapus',
              });
              setIsDeleted(true);
            }
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: err.message,
            });
          });
      }
    });
  };
  if (isDeleted) return <div />;
  return (
    <tr className="product-item">
      <td>
        <div>
          <img src={product.thumbnail_url} alt={product.title} />
        </div>
        <div>
          <span>{product.title}</span>
        </div>
      </td>
      <td>
        {formatPrice(product.price)}
      </td>
      <td>
        {product.item_sold}
      </td>
      <td>
        <div>
          {/* <Link
            to={`/product/${product.id}`}
            title="Detail"
            className="icon-mini icon-mini-blue"
          >
            <i className="bi bi-eye" />
          </Link>
          <Link
            to={`/product/${product.id}/edit`}
            title="Edit"
            className="icon-mini icon-mini-orange"
          >
            <i className="bi bi-pencil" />
          </Link>
          <button
            type="button"
            title="Duplikat"
            className="icon-mini icon-mini-gray"
          >
            <i className="bi bi-files" />
          </button> */}
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
