import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import ProfileSection from '../../layouts/Profile/ProfileSection';
import { axiosPrivate } from '../../utils/API';
import '../../assets/style/dashboard.css';
import { setDocumentTitle } from '../../utils/Utils';
import { routeOrder, routeProductList, routeWithdraw } from '../../utils/RouteList';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [merchant, setMerchant] = useState<any>({});
  useEffect(() => {
    setDocumentTitle('Dashboard');
    const fetchMerchant = axiosPrivate.get('/merchants');
    Promise.all([fetchMerchant])
      .then(([merchantRes]) => {
        setMerchant(merchantRes.data);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Terdapat masalah koneksi',
        });
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
            <FormSkeleton />
          </div>
        ) : (
          <ProfileSection
            merchant={merchant}
          />
        )}

        <div className="row gap-2">

          <div className="col">
            <div className="page-content dashboard-item">
              <Link to={routeOrder} className="text-blue">
                <i className="bi bi-box-seam" />
                <span>Pesanan</span>
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="page-content dashboard-item">
              <Link to={routeProductList} className="text-yellow">
                <i className="bi bi-bag" />
                <span>Produk</span>
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="page-content dashboard-item">
              <Link to={routeWithdraw} className="text-purple">
                <i className="bi bi-wallet2" />
                <span>Penarikan Dana</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
