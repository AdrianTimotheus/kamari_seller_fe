import { formatPrice } from '../../utils/Utils';

type props = {
  order: any,
}
export default function OrderDetailSales({ order }:props) {
  return (
    <div className="order-sales">
      <table>
        <tbody>
          <tr>
            <td>
              <span>Total Pesanan</span>
            </td>
            <td>
              <span>{formatPrice(order.user_total_payment)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Ongkos Kirim</span>
            </td>
            <td>
              <span>{formatPrice(order.shipping_fee)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Total Penjualan</span>
            </td>
            <td>
              <span>{formatPrice(order.merchant_income)}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
