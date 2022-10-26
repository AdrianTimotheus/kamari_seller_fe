import { formatPrice } from '../../utils/Utils';

type props = {
  product: any,
}
export default function ProductDetailSelling({
  product,
}:props) {
  return (
    <div className="d-flex flex-column gap-3">

      {product.product_variants[0].main_variant === '' && (
        <>
          <div className="row">
            <div className="col-12 col-lg-3 text-grey2">
              Harga
            </div>
            <div className="col-12 col-lg-9">
              {formatPrice(product.product_variants[0].price)}
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-3 text-grey2">
              Stok
            </div>
            <div className="col-12 col-lg-9">
              {product.product_variants[0].stock}
            </div>
          </div>
        </>
      )}

      {product.product_variants[0].main_variant !== '' && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">{product.product_variants[0].main_variant}</th>
              {product.product_variants[0].sub_variant !== '' && (
                <th scope="col">{product.product_variants[0].sub_variant}</th>
              )}
              <th scope="col">Harga</th>
              <th scope="col">Stok</th>
            </tr>
          </thead>
          <tbody>
            {product.product_variants.map((item:any) => (
              <tr>
                <td>
                  {item.main_variant_item}
                </td>
                {product.product_variants[0].sub_variant !== '' && (
                  <td>
                    {item.sub_variant_item}
                  </td>
                )}
                <td>
                  {formatPrice(item.price)}
                </td>
                <td>
                  {item.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
