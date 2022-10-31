import Checkbox from '../../../components/Form/Basic/Checkbox';

type props = {
    selectedProducts: any[],
    handleChange: Function,
    product: any,
}
export default function SellerCategoryAddProductTableItem({
  selectedProducts,
  handleChange,
  product,
}:props) {
  // console.log(product);
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
      </td>
      <td>
        <span>{product.name}</span>
      </td>
      <td>
        <span>{product.description}</span>
      </td>
    </tr>
  );
}
