import { Skeleton } from '@mui/material';
import useAppSelector from '../../hooks/useAppSelector';
import { selectUser } from '../../store/userSlice';
import { formatPrice } from '../../utils/Utils';

type props = {
  isLoading: boolean,
  balance: number,
  wallet: any,
}
export default function MyWallet({
  isLoading,
  balance,
  wallet,
}:props) {
  const user = useAppSelector(selectUser);
  return (
    <div className="my-wallet">
      <div>
        <span>Saldo</span>
        {isLoading ? (
          <Skeleton variant="text" width={200} sx={{ fontSize: '3rem' }} />
        ) : (
          <h2>{formatPrice(balance)}</h2>
        )}
      </div>
      <div>
        <span className="fw-bold">
          {user.name}
        </span>
        <span>
          Wallet ID
          {' '}
          {wallet.id}
        </span>
      </div>
    </div>
  );
}
