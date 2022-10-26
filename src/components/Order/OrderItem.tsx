/* eslint-disable */
import orderData from '../../models/orderData';

type props = {
  order: orderData,
}
export default function OrderItem({ order }:props) {
  return (
    <tr className="order">
      <td>
        <div>
          {order.order_number}
        </div>
        <div>
          {order.buyer.name}
        </div>
      </td>
      <td>
        {order.status}
      </td>
      <td>
        <div>
          ACTION
        </div>
      </td>
    </tr>
  );
}
