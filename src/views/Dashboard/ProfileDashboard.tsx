import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';

export default function ProfileDashboard() {
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Profil Toko" />
        <PageBreadcrumb main="Dashboard" sub="Profile Toko" />
      </div>
      <div>
        <div className="page-content">
          <span>
            Content
          </span>
        </div>
      </div>
    </div>
  );
}
