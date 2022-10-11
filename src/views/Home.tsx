import PageBreadcrumb from '../components/PageBreadcrumb';
import PageTitle from '../components/PageTitle';

export default function Home() {
  return (
    <div className="w-100">
      <PageTitle text="Dashboard" />
      <PageBreadcrumb main="Dashboard" sub="Admin" />
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
  );
}
