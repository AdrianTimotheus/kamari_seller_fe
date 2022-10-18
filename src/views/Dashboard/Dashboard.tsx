import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';

export default function Dashboard() {
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Dashboard" />
        <PageBreadcrumb main="Dashboard" sub="Dashboard" />
      </div>
      <div>
        <div className="page-content">
          <span>
            Content
          </span>
        </div>
        <div className="page-content">
          <span>
            Content
          </span>
        </div>
      </div>
    </div>
  );
}
