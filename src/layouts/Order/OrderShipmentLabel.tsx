import Kamari from '../../assets/png/Kamari.png';

type props = {
  merchant: any,
  order: any,
}
export default function OrderShipmentLabel({
  merchant,
  order,
}:props) {
  return (
    <div className="address-label">

      <div>
        <img src={Kamari} alt="" />
        <div className="d-flex flex-column">
          <span>
            No. Pesanan
          </span>
          <span>
            {order.invoice}
          </span>
        </div>
      </div>

      <div>
        <div>
          <h6 className="fw-bold mb-2 text-primary-1">Penerima</h6>
          <span>{order.user.address.recipient_name}</span>
          <span>{order.user.address.phone}</span>
          <span>{order.user.address.address_detail}</span>
          <span>{order.user.address.city.name}</span>
        </div>
        <div>
          <h6 className="fw-bold mb-2 text-primary-1">Pengirim</h6>
          <span>{merchant?.name}</span>
          <span>{merchant.address?.detail_address}</span>
          <span>{merchant.address?.city.name}</span>
          <span>{merchant.address?.city.province.name}</span>
        </div>
      </div>

      <div>
        <div>
          <h6 className="fw-bold mb-2 text-primary-1">Daftar Pesanan</h6>
        </div>
        <div>
          <table className="table-plain">
            <thead>
              <tr>
                <th scope="col">
                  <span>#</span>
                </th>
                <th scope="col">
                  <span>Produk</span>
                </th>
                <th scope="col">
                  <span>Variasi</span>
                </th>
                <th scope="col">
                  <span>Kuantitas</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item:any, index:number) => (
                <tr key={item.id}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>
                    <span>{item.product_name}</span>
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
                  <td>
                    <span>{item.quantity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
