import { useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import ProfileDetailInfo from '../../layouts/Profile/ProfileDetailInfo';
import { axiosPrivate } from '../../utils/API';
import '../../assets/style/profile.css';
import { setDocumentTitle } from '../../utils/Utils';
import ProfileDetailAddress from '../../layouts/Profile/ProfileDetailAddress';

export default function ProfileDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [merchant, setMerchant] = useState<any>({});
  useEffect(() => {
    setDocumentTitle('Profil Toko');
    axiosPrivate.get('/merchants')
      .then((res) => {
        setMerchant(res.data);
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
        <PageTitle text="Profil Toko" />
        <PageBreadcrumb main="Dashboard" sub="Profile Toko" />
      </div>
      <div>
        {isLoading ? (
          <div className="page-content">
            <FormSkeleton />
          </div>
        ) : (
          <ProfileDetailInfo
            merchant={merchant}
          />
        )}
        {isLoading ? (
          <div className="page-content">
            <FormSkeleton />
          </div>
        ) : (
          <ProfileDetailAddress
            merchant={merchant}
          />
        )}
      </div>
    </div>
  );
}
