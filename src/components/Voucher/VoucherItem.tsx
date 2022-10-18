import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/style/voucher.css';
import voucherData from '../../models/voucherData';
import { axiosPrivate } from '../../utils/API';
import {
  isEnded,
  isOnGoing,
  isWillCome,
  parseDate,
} from '../../utils/Date';
import { formatPrice } from '../../utils/Utils';
import Toast from '../Interaction/Toast';
import HasEndedBadge from '../Badge/Status/HasEndedBadge';
import OnGoingBadge from '../Badge/Status/OnGoingBadge';
import WillComeBadge from '../Badge/Status/WillComeBadge';

type props = {
  voucher: voucherData,
}
export default function VoucherItem({ voucher }:props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  let status = '';
  if (isEnded(voucher.end_date)) status = 'hasEnded';
  else if (isWillCome(voucher.start_date)) status = 'willCome';
  else if (isOnGoing(voucher.start_date, voucher.end_date)) status = 'onGoing';

  const handleDelete = () => {
    Swal.fire({
      text: 'Hapus voucher ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E75B5B',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/sellers/vouchers/${voucher.id}`)
          .then((res) => {
            if (res.status === 200) {
              Toast.fire({
                icon: 'success',
                title: 'Voucher dihapus',
              });
              setIsDeleted(true);
            }
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: err.message,
            });
          });
      }
    });
  };

  if (isDeleted) return <div />;

  return (
    <tr className="voucher">
      <td>
        <div>
          <div>
            {voucher.promo_type.Type === 'Amount' ? (
              <span className="icon-orange">Rp</span>
            ) : (
              <span className="icon-blue">%</span>
            )}
          </div>
          <div>
            <span>{voucher.title}</span>
            <span>
              Kode:
              {' '}
              {voucher.code}
            </span>
          </div>
        </div>
      </td>
      <td>
        {voucher.promo_type.Type === 'Amount' ? (
          <span>{formatPrice(voucher.discount_amount)}</span>
        ) : (
          <span>
            {voucher.discount_amount}
            {' '}
            %
          </span>
        )}
      </td>
      <td>
        {voucher.stock_left}
      </td>
      <td>
        <div className="d-flex flex-column gap-2">
          <div>
            {status === 'hasEnded' && <HasEndedBadge />}
            {status === 'willCome' && <WillComeBadge />}
            {status === 'onGoing' && <OnGoingBadge />}
          </div>
          <div>
            {parseDate(voucher.start_date)}
            {' - '}
            {parseDate(voucher.end_date)}
          </div>
        </div>
      </td>
      <td>
        <div>
          {status === 'hasEnded' && (
            <Link
              to={`/voucher/${voucher.id}`}
              title="Detail"
              className="icon-mini icon-mini-blue"
            >
              <i className="bi bi-eye" />
            </Link>
          )}
          {['willCome', 'onGoing'].includes(status) && (
            <Link
              to={`/voucher/${voucher.id}/edit`}
              title="Edit"
              className="icon-mini icon-mini-orange"
            >
              <i className="bi bi-pencil" />
            </Link>
          )}
          <Link
            to={`/voucher/new?copy=${voucher.id}`}
            title="Duplikat"
            className="icon-mini icon-mini-gray"
          >
            <i className="bi bi-files" />
          </Link>
          {status === 'willCome' && (
            <button
              type="button"
              title="Hapus"
              className="icon-mini icon-mini-red"
              onClick={() => handleDelete()}
            >
              <i className="bi bi-trash2" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
