import { formatPrice } from '../../utils/Utils';

export default function MyWallet() {
  return (
    <div className="my-wallet">
      <div>
        <span>Saldo</span>
        <h2>{formatPrice(100000)}</h2>
      </div>
      <div>
        <span className="fw-bold">Nama User</span>
        <span>1234567</span>
      </div>
    </div>
  );
}
