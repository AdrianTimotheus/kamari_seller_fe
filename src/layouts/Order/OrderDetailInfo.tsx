import Toast from '../../components/Interaction/Toast';
import { orderStatuses } from '../../utils/Values';

type props = {
  order: any,
}
export default function OrderDetailInfo({ order }:props) {
  const handleCopyInvoice = () => {
    navigator.clipboard.writeText(order.invoice);
    Toast.fire({
      icon: 'success',
      title: 'No Pesanan berhasil disalin',
    });
  };
  return (
    <div className="d-flex flex-column gap-4">

      <div className="row">
        <div className="col-12 col-sm-3 text-grey2">
          No. Pesanan
        </div>
        <div className="col-12 col-sm-9 d-flex align-item-center gap-2">
          <span>{order.invoice}</span>
          <button
            type="button"
            className="icon-micro icon-mini-gray"
            onClick={() => handleCopyInvoice()}
          >
            <i className="bi bi-files" />
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-3 text-grey2">
          Status
        </div>
        <div className="col-12 col-sm-9">
          <span className={orderStatuses.find((item) => item.name === order.order_status)?.badge}>
            {orderStatuses.find((item) => item.name === order.order_status)?.text}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-3 text-grey2">
          Pemesan
        </div>
        <div className="col-12 col-sm-9">
          <div className="order-item__user">
            <img
              src={order.user.pic_url
              || 'https://img.freepik.com/free-photo/woman-with-balloon-image-torn-paper-style_53876-128762.jpg'}
              alt=""
            />
            <span>{order.user.name}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-3 text-grey2">
          Alamat Pengiriman
        </div>
        <div className="col-12 col-sm-9 d-flex flex-column gap-2">
          <span>{order.user.address.recipient_name}</span>
          <span>{order.user.address.phone}</span>
          <span>{order.user.address.address_detail}</span>
          <span>{order.user.address.city.name}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-3 text-grey2">
          Jasa Kirim
        </div>
        <div className="col-12 col-sm-9">
          {order.shipping_option.courier}
        </div>
      </div>

    </div>
  );
}
