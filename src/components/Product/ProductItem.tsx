import { Link } from 'react-router-dom';
import '../../assets/style/product.css';
import productData from '../../models/productData';
import { formatPrice } from '../../utils/Utils';

type props = {
  product: productData,
}
export default function ProductItem({ product }:props) {
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
            title="Duplikat"
            className="icon-mini icon-mini-gray"
          >
            <i className="bi bi-files" />
          </button>
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
