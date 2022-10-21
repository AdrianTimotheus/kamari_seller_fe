import PromoAddProductTableItem from './PromoAddProductTableItem';

type props = {
  selectedProducts: any[],
  handleChange: Function,
  products: any[];
}
export default function PromoAddProductTable({
  selectedProducts,
  handleChange,
  products,
}:props) {
  return (
    <table className="table table-bordered promo-add-product-table">
      <thead>
        <tr>
          <th scope="col">Pilih</th>
          <th scope="col">Nama Produk</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <PromoAddProductTableItem
            key={`promo-add-product-table-item-${product.id}`}
            selectedProducts={selectedProducts}
            handleChange={handleChange}
            product={product}
          />
        ))}
      </tbody>
    </table>
  );
}
