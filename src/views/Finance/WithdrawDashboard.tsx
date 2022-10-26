import { useEffect } from 'react';
import '../../assets/style/finance.css';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import MyWallet from '../../layouts/Finance/MyWallet';
import { formatPrice, setDocumentTitle } from '../../utils/Utils';

export default function WithdrawDashboard() {
  useEffect(() => {
    setDocumentTitle('Penarikan Dana');
  }, []);
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Penarikan Dana" />
        <PageBreadcrumb main="Keuangan" sub="Penarikan Dana" />
      </div>
      <div>
        <div className="page-content">
          <MyWallet />
        </div>
        <div className="page-content">
          <SectionTitle text="Buat Penarikan Dana" />
          <div className="new-withdraw">
            <div className="d-flex flex-column gap-2">
              <span>Dana Belum Ditarik</span>
              <h4>{formatPrice(1250000)}</h4>
            </div>
            <div>
              <button type="button" className="btn btn-secondary">
                Tarik Dana
              </button>
            </div>
          </div>
        </div>
        <div className="page-content">
          <SectionTitle text="Riwayat Penarikan Dana" />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nominal</th>
                <th scope="col">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{formatPrice(50000)}</td>
                <td>01 Jan 1970</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{formatPrice(250000)}</td>
                <td>01 Feb 1970</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
