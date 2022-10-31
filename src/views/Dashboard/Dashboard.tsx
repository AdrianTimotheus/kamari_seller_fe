import { useState, useEffect } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import ProfileSection from '../../layouts/Dashboard/ProfileSection';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';
import IncomeSummary from '../../layouts/Dashboard/IncomeSummary';
import '../../assets/style/dashboard.css';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import OrderChart from '../../layouts/Dashboard/OrderChart';
import OrderSummary from '../../layouts/Dashboard/OrderSummary';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [merchant, setMerchant] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setDocumentTitle('Dashboard');
    const fetchMerchant = axiosPrivate.get('/merchants');
    const fetchOrders = axiosPrivate.get('/sellers/orders/summary');
    Promise.all([fetchMerchant, fetchOrders])
      .then(([merchantRes, ordersRes]) => {
        setMerchant(merchantRes.data);
        setOrders(ordersRes.data.orders);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Terdapat masalah koneksi',
        });
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Dashboard" />
        <PageBreadcrumb main="Dashboard" sub="Dashboard" />
      </div>
      <div>

        {isLoading ? (
          <div className="page-content">
            <RowSkeleton />
          </div>
        ) : (
          <ProfileSection
            merchant={merchant}
          />
        )}

        <div className="row gap-2">

          <div className="col dashboard__order-chart">
            <OrderChart
              isLoading={isLoading}
              orders={orders}
            />
          </div>

          <div className="col d-flex flex-column gap-4">
            <OrderSummary
              isLoading={isLoading}
              orders={orders}
            />
            <IncomeSummary />
          </div>

        </div>
      </div>
    </div>
  );
}
