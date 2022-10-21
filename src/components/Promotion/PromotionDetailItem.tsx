import { formatPrice } from '../../utils/Utils';

type props = {
  promoItem: any,
}
export default function PromotionDetailItem({ promoItem }:props) {
  return (
    <div className="promo-detail-item">
      <div>
        <img src={promoItem.product.thumbnail_url} alt={promoItem.product.name} />
        <span>{promoItem.product.name}</span>
      </div>
      <div>
        <table className="table table-borderless m-0 w-100">
          <tbody>
            <tr>
              <td>
                <span className="text-grey2">Harga Produk</span>
              </td>
              <td>
                {formatPrice(promoItem.price)}
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Tipe Promo</span>
              </td>
              <td>
                {promoItem.promo_type_id.toString() === '1' ? 'Nominal' : 'Persentase'}
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Diskon</span>
              </td>
              <td>
                {promoItem.promo_type_id.toString() === '1'
                  ? formatPrice(promoItem.discount_amount)
                  : `${promoItem.discount_amount} %`}
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Stok Promosi</span>
              </td>
              <td>
                {promoItem.stock_left}
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Batas Pembelian</span>
              </td>
              <td>
                {promoItem.maximum_item}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
