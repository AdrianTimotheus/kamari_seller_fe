import PageBreadcrumb from '../components/PageBreadcrumb';
import PageTitle from '../components/PageTitle';

export default function Home() {
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Dashboard" />
        <PageBreadcrumb main="Dashboard" sub="Admin" />
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
