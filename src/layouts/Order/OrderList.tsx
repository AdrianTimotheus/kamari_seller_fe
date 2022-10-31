/* eslint-disable react/no-array-index-key */
import RowSkeleton from '../../components/Loading/RowSkeleton';
import OrderItem from '../../components/Order/OrderItem';
import Pagination from '../../components/Pagination';
import SectionTitle from '../../components/Text/SectionTitle';
import OrderSearch from './OrderSearch';

type props = {
  orders: any[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getOrders: Function,
}

export default function OrderList({
  orders,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getOrders,
}:props) {
  return (
    <div className="page-content">
      <SectionTitle text="Daftar Pesanan" />
      <OrderSearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getOrders={getOrders}
      />
      {isLoading ? (
        <div className="d-flex flex-column gap-3">
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </div>
      ) : (
        <>
          <div className="d-flex flex-column gap-4">
            {orders.map((order, index) => (
              <OrderItem key={`order-item-${index}`} order={order} />
            ))}
            {orders.length === 0 && 'Tidak ada data'}
          </div>
          {orders.length !== 0 && (
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
