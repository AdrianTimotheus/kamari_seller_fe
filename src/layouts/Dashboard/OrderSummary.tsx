import { Link } from 'react-router-dom';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import { routeOrder } from '../../utils/RouteList';
import { orderStatuses } from '../../utils/Values';

type props = {
  isLoading: boolean,
  orders: any[],
}
export default function OrderSummary({
  isLoading,
  orders,
}:props) {
  const count = orders.filter((order) => [orderStatuses[1].name, orderStatuses[2].name]
    .includes(order.status)).length;
  return (
    <div className="dashboard-item">
      {isLoading ? (
        <RowSkeleton />
      ) : (
        <>
          <div className="dashboard__order-summary">
            <div>
              <span>Pesanan perlu dikirim</span>
              <h4>{count}</h4>
            </div>
          </div>
          <div className="dashboard-item__link">
            <Link to={routeOrder} className="text-blue">
              <i className="bi bi-box-seam" />
              <span>Semua Pesanan</span>
              <i className="bi bi-chevron-right" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
