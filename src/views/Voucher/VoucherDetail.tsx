/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HasEndedBadge from '../../components/Badge/Status/HasEndedBadge';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { isEnded, parseDate } from '../../utils/Date';
import { routeVoucherList } from '../../utils/RouteList';
import { formatPrice } from '../../utils/Utils';

export default function VoucherDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [voucher, setVoucher] = useState<any>({});

  useEffect(() => {
    if (params.voucherId) {
      axiosPrivate.get(`/sellers/vouchers/${params.voucherId}`)
        .then((res) => {
          if (isEnded(res.data.end_date)) {
            setVoucher(res.data);
          } else {
            navigate(routeVoucherList);
          }
        })
        .catch(() => {
          navigate(routeVoucherList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Voucher Toko" />
        <PageBreadcrumb main="Voucher" sub="Voucher Toko" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Detail Voucher" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <table className="table table-borderless m-0 table-sm">
              <tbody>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Nama Voucher
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {voucher.title}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Kode Voucher
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {voucher.code}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Tipe Promo
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {voucher.promo_type.Type === 'Amount' ? 'Nominal' : 'Persentase'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Diskon
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {voucher.promo_type.Type === 'Amount' ? (
                        <span>{formatPrice(voucher.discount_amount)}</span>
                      ) : (
                        <span>
                          {voucher.discount_amount}
                          {' '}
                          %
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Kuota Tersisa
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {voucher.stock_left}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Status
                    </span>
                  </td>
                  <td>
                    <HasEndedBadge />
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <span className="text-grey2">
                      Masa Berlaku
                    </span>
                  </td>
                  <td>
                    <span className="text-grey3">
                      {parseDate(voucher.start_date)}
                      {' - '}
                      {parseDate(voucher.end_date)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
