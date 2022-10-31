import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/Utils';
import { orderStatuses } from '../../utils/Values';

type props = {
  order: any,
}
export default function OrderItem({ order }:props) {
  return (
    <Link
      className="order-item"
      to={`/order/${order.id}`}
    >
      <div>
        <div className="d-flex align-item-center gap-2">
          <span>
            No. Pesanan
            {' '}
            {order.invoice}
          </span>
        </div>
        <span className={orderStatuses.find((item) => item.name === order.status)?.badge}>
          {orderStatuses.find((item) => item.name === order.status)?.text}
        </span>
      </div>
      <div className="d-flex flex-column">
        <table>
          <tbody>
            {order.order_items.map((item:any) => (
              <tr className="order-item__items" key={item.id}>
                <td>
                  <img src={item.thumbnail_url} alt="" />
                  <span>{item.product_name}</span>
                </td>
                <td>
                  <span>
                    x
                    {' '}
                    {item.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div>
          <div>
            <span>Pemesan</span>
            <div className="order-item__user">
              <img src={order.user_pic_url || 'https://img.freepik.com/free-photo/woman-with-balloon-image-torn-paper-style_53876-128762.jpg'} alt="" />
              <span>{order.user_name}</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>Jasa Kirim</span>
            <div>
              <span>{order.courier_name}</span>
            </div>
          </div>
          <div>
            <span>Total Pesanan</span>
            <div>
              <span>{formatPrice(order.user_total_payment)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
