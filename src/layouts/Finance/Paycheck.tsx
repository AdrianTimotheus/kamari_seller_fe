import { Skeleton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import Toast from '../../components/Interaction/Toast';
import SectionTitle from '../../components/Text/SectionTitle';
import { axiosPrivate } from '../../utils/API';
import { formatPrice } from '../../utils/Utils';

type props = {
  isLoading: boolean,
  income: number,
  isUpdating: string[],
  setIsUpdating: Dispatch<SetStateAction<string[]>>,
  updateBalance: Function,
  updateIncome: Function,
  updateHistories: Function,
}
export default function Paycheck({
  isLoading,
  income,
  isUpdating,
  setIsUpdating,
  updateBalance,
  updateIncome,
  updateHistories,
}:props) {
  const handleCreateWithdraw = () => {
    setIsUpdating([...isUpdating, 'income', 'balance', 'new-history']);
    axiosPrivate.post('/paychecks/withdraw')
      .then((res) => {
        if (res.status === 200) {
          setTimeout(updateBalance, 1500);
          setTimeout(updateIncome, 2000);
          setTimeout(updateHistories, 2500);
          setTimeout(() => {
            Toast.fire({
              icon: 'success',
              title: 'Berhasil menarik dana',
            });
          }, 3000);
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal menarik dana',
        });
        throw new Error(err);
      });
  };
  return (
    <div className="page-content">
      <SectionTitle text="Buat Penarikan Dana" />
      <div className="new-withdraw">
        <div className="d-flex flex-column gap-2">
          <span>Dana Belum Ditarik</span>
          {isLoading ? (
            <Skeleton variant="text" width={150} sx={{ fontSize: '2.5rem' }} />
          ) : (
            <h4>{formatPrice(income)}</h4>
          )}
        </div>
        <div>
          {(income !== 0 && !isLoading) && (
            <button
              type="button"
              className="btn btn-secondary d-flex flex-row gap-1"
              onClick={() => handleCreateWithdraw()}
            >
              <i className="bi bi-wallet2" />
              Tarik Dana
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
