/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import '../../assets/style/finance.css';
import Toast from '../../components/Interaction/Toast';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import MyWallet from '../../layouts/Finance/MyWallet';
import Paycheck from '../../layouts/Finance/Paycheck';
import WithdrawHistory from '../../layouts/Finance/WithdrawHistory';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';

export default function WithdrawDashboard() {
  const [isProcessing, setIsProcessing] = useState<string[]>(['wallet', 'paycheck', 'histories']);
  const [isUpdating, setIsUpdating] = useState<string[]>([]);
  const [wallet, setWallet] = useState<any>({});
  const [balance, setBalance] = useState<number>(1);
  const [income, setIncome] = useState<number>(1);
  const [withdrawHistories, setWithdrawHistories] = useState<any[]>([]);

  const fetchWithdrawHistories = () => {
    if (!isProcessing.includes('histories')) setIsProcessing([...isProcessing, 'histories']);
    axiosPrivate.get('/paychecks/history')
      .then((res) => {
        if (res.data) setWithdrawHistories(res.data);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data riwayat penarikan',
        });
      })
      .finally(() => {
        setIsProcessing((prev) => prev.filter((item) => item !== 'histories'));
      });
  };
  const fetchPaycheck = () => {
    if (!isProcessing.includes('paycheck')) setIsProcessing([...isProcessing, 'paycheck']);
    axiosPrivate.get('/paychecks')
      .then((res) => {
        setIncome(res.data.income);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data penghasilan',
        });
      })
      .finally(() => {
        setIsProcessing((prev) => prev.filter((item) => item !== 'paycheck'));
        fetchWithdrawHistories();
      });
  };
  const fetchWallet = () => {
    if (!isProcessing.includes('wallet')) setIsProcessing([...isProcessing, 'wallet']);
    axiosPrivate.get('/wallets')
      .then((res) => {
        setBalance(res.data.balance);
        setWallet(res.data);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data wallet',
        });
      })
      .finally(() => {
        setIsProcessing((prev) => prev.filter((item) => item !== 'wallet'));
        fetchPaycheck();
      });
  };
  const updateBalance = () => {
    axiosPrivate.get('/wallets')
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data wallet',
        });
      })
      .finally(() => {
        setIsUpdating((prev) => prev.filter((item) => item !== 'balance'));
      });
  };
  const updateIncome = () => {
    axiosPrivate.get('/paychecks')
      .then((res) => {
        setIncome(res.data.income);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data penghasilan',
        });
      })
      .finally(() => {
        setIsUpdating((prev) => prev.filter((item) => item !== 'income'));
      });
  };
  const updateHistories = () => {
    axiosPrivate.get('/paychecks/history')
      .then((res) => {
        if (res.data) setWithdrawHistories([res.data[0], ...withdrawHistories]);
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendapat data riwayat penarikan',
        });
      })
      .finally(() => {
        setIsUpdating((prev) => prev.filter((item) => item !== 'new-history'));
      });
  };

  useEffect(() => {
    setDocumentTitle('Penarikan Dana');
    fetchWallet();
  }, []);
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Penarikan Dana" />
        <PageBreadcrumb main="Keuangan" sub="Penarikan Dana" />
      </div>
      <div>
        {isProcessing.includes('wallet') ? (
          <div className="page-content">
            <RowSkeleton />
          </div>
        ) : (
          <div className="page-content">
            <MyWallet
              isLoading={isUpdating.includes('balance')}
              balance={balance}
              wallet={wallet}
            />
          </div>
        )}
        {isProcessing.includes('paycheck') ? (
          <div className="page-content">
            <RowSkeleton />
          </div>
        ) : (
          <Paycheck
            isLoading={isUpdating.includes('income')}
            income={income}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
            updateBalance={updateBalance}
            updateIncome={updateIncome}
            updateHistories={updateHistories}
          />
        )}
        {isProcessing.includes('histories') ? (
          <div className="page-content">
            <RowSkeleton />
          </div>
        ) : (
          <WithdrawHistory
            isLoading={isUpdating.includes('new-history')}
            withdrawHistories={withdrawHistories}
          />
        )}
      </div>
    </div>
  );
}
