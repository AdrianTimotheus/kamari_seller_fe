import OrderDetailItem from '../../components/Order/OrderDetailItem';

type props = {
  order: any,
}
export default function OrderDetailItemList({ order }:props) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Produk</th>
          <th scope="col">Variasi</th>
          <th scope="col">Kuantitas</th>
          <th scope="col">Harga</th>
          <th scope="col">Dibayar</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {order.order_items.map((item: any, index: number) => (
          <OrderDetailItem
            key={item.id}
            no={index + 1}
            item={item}
          />
        ))}
      </tbody>
    </table>
  );
}
