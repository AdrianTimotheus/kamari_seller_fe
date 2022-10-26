import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../assets/style/product.css';
import { axiosPrivate } from '../../utils/API';
import { formatPrice } from '../../utils/Utils';
import Toast from '../Interaction/Toast';

type props = {
  product: any,
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
              title: 'Gagal menghapus produk',
            });
            throw new Error(err);
          });
      }
    });
  };

  const priceList = product.product_variants
    .map((item:any) => item.price)
    .sort((a: number, b: number) => a - b);
  const stockList = product.product_variants
    .map((item:any) => item.stock)
    .sort((a: number, b: number) => a - b);

  if (isDeleted) return <div />;
  return (
    <tr className="product-item">
      <td>
        <div>
          <img src={product.thumbnail_url} alt={product.title} />
        </div>
        <div>
          <div>
            <span>{product.title}</span>
          </div>
          {product.product_variants[0].main_variant !== '' && (
            <div>
              <span className="badge-blue-smaller">
                {product.product_variants.length}
                {' '}
                variasi
              </span>
            </div>
          )}
        </div>
      </td>
      <td>
        {formatPrice(priceList[0])}
        {priceList[0] !== priceList[priceList.length - 1] && (
          <>
            {' '}
            -
            {' '}
            {formatPrice(priceList[priceList.length - 1])}
          </>
        )}
      </td>
      <td>
        {stockList[0]}
        {stockList[0] !== stockList[stockList.length - 1] && (
          <>
            {' '}
            -
            {' '}
            {stockList[stockList.length - 1]}
          </>
        )}
      </td>
      <td>
        {product.item_sold}
      </td>
      <td>
        <div>
          <Link
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
