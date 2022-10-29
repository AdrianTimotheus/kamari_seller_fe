import { Skeleton } from '@mui/material';
import SectionTitle from '../../components/Text/SectionTitle';
import { parseFullDate } from '../../utils/Date';
import { formatPrice } from '../../utils/Utils';

type props = {
  isLoading: boolean,
  withdrawHistories: any[],
}
export default function WithdrawHistory({
  isLoading,
  withdrawHistories,
}:props) {
  return (
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
          {isLoading && (
            <tr>
              <td>
                <Skeleton variant="text" width={20} sx={{ fontSize: '1.5rem' }} />
              </td>
              <td>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
              </td>
              <td>
                <Skeleton variant="text" width={200} sx={{ fontSize: '1.5rem' }} />
              </td>
            </tr>
          )}
          {withdrawHistories.map((history: any, index: number) => (
            <tr key={history.id}>
              <td>{index + 1}</td>
              <td>{formatPrice(history.amount)}</td>
              <td>{parseFullDate(history.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {withdrawHistories.length === 0 && 'Tidak ada data'}
    </div>
  );
}
