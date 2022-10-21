import Checkbox from '../../../components/Form/Basic/Checkbox';
import { formatPrice } from '../../../utils/Utils';

type props = {
  selectedProducts: any[],
  handleChange: Function,
  product: any,
}
export default function PromoAddProductTableItem({
  selectedProducts,
  handleChange,
  product,
}:props) {
  const handleChangeCheckbox = () => {
    handleChange(product);
  };
  return (
    <tr className="promo-add-product-item">
      <td>
        <Checkbox
          value={product.id.toString()}
          content=""
          handleChange={handleChangeCheckbox}
          currentState={selectedProducts.find((item) => item.id === product.id)}
          hideLabel
        />
      </td>
      <td>
        <img src={product.thumbnail_url} alt={product.title} />
        <span>{product.title}</span>
      </td>
      <td>
        {formatPrice(product.price)}
      </td>
    </tr>
  );
}
