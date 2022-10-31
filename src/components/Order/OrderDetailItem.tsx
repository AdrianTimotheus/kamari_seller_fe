import { formatPrice } from '../../utils/Utils';

type props = {
  no: number,
  item: any,
}
export default function OrderDetailItem({ no, item }:props) {
  return (
    <tr className="order-detail-item">
      <td>
        <span>{no}</span>
      </td>
      <td>
        <div>
          <img src={item.thumbnail_url} alt="" />
          <span>{item.product_name}</span>
        </div>
      </td>
      <td>
        {item.main_variant.name !== '' && (
          <span>
            {item.main_variant.name}
            {': '}
            {item.main_variant.item}
          </span>
        )}
        {item.sub_variant.name !== '' && (
          <>
            <br />
            <span>
              {item.sub_variant.name}
              {': '}
              {item.sub_variant.item}
            </span>
          </>
        )}
        {item.main_variant.name === '' && (
          <span>-</span>
        )}
      </td>
      <td>{item.quantity}</td>
      <td>{formatPrice(item.real_price)}</td>
      <td>{formatPrice(item.price)}</td>
      <td>{formatPrice(item.total_price)}</td>
    </tr>
  );
}
