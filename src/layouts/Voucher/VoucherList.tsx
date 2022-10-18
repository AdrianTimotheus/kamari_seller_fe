import { Link } from 'react-router-dom';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import SectionTitle from '../../components/Text/SectionTitle';
import VoucherItem from '../../components/Voucher/VoucherItem';
import voucherData from '../../models/voucherData';
import { routeVoucherNew } from '../../utils/RouteList';
import VoucherSearch from './VoucherSearch';

type props = {
  vouchers: voucherData[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getVouchers: Function,
}

export default function VoucherList({
  vouchers,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getVouchers,
}:props) {
  return (
    <div className="page-content">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <SectionTitle text="Daftar Voucher" />
        </div>
        <Link
          to={routeVoucherNew}
          className="btn btn-secondary"
        >
          <i className="bi bi-plus" />
          Buat
        </Link>
      </div>
      <VoucherSearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getVouchers={getVouchers}
      />
      {isLoading ? (
        <div className="d-flex flex-column gap-3">
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </div>
      ) : (
        <>
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nama / Kode</th>
                  <th scope="col">Diskon</th>
                  <th scope="col">Kuota Tersisa</th>
                  <th scope="col">Status / Masa Berlaku</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <VoucherItem key={`voucher-item-${voucher.id}`} voucher={voucher} />
                ))}
              </tbody>
            </table>
            {vouchers.length === 0 && 'Tidak ada data'}
          </div>
          {vouchers.length !== 0 && (
            <div className="justify-content-end d-flex">
              <Pagination
                currentPage={searchOpt.page}
                totalPage={totalPage}
                changePage={changePage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
