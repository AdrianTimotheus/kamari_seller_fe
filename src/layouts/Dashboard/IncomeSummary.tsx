/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import { axiosPrivate } from '../../utils/API';
import { routeWithdraw } from '../../utils/RouteList';
import { formatPrice } from '../../utils/Utils';

export default function IncomeSummary() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [income, setIncome] = useState({
    remaining: 0,
    total: 0,
  });
  useEffect(() => {
    const fetchPaycheck = axiosPrivate.get('/paychecks');
    const fetchWithdrawHistories = axiosPrivate.get('/paychecks/history');
    Promise.all([fetchPaycheck, fetchWithdrawHistories])
      .then(([paycheckRes, withdrawHistoriesRes]) => {
        if (withdrawHistoriesRes.data) {
          setIncome({
            ...income,
            remaining: paycheckRes.data.income,
            total: withdrawHistoriesRes.data
              .map((history:any) => history.amount).reduce((a:number, b:number) => a + b, 0),
          });
        } else {
          setIncome({
            ...income,
            remaining: paycheckRes.data.income,
          });
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Terdapat masalah koneksi',
        });
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="dashboard-item">
      {isLoading ? (
        <RowSkeleton />
      ) : (
        <>
          <div className="dashboard__income-summary">
            <div>
              <span>Dana Belum Ditarik</span>
              <h4>{formatPrice(income.remaining)}</h4>
            </div>
            <div>
              <span>Total Penghasilan</span>
              <h6>{formatPrice(income.total + income.remaining)}</h6>
            </div>
          </div>
          <div className="dashboard-item__link">
            <Link to={routeWithdraw} className="text-purple">
              <i className="bi bi-wallet2" />
              <span>Penarikan Dana</span>
              <i className="bi bi-chevron-right" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
