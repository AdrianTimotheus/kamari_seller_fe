/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import RowSkeleton from '../../components/Loading/RowSkeleton';

moment.locale('id');
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type props = {
  isLoading: boolean,
  orders: any[],
}

export default function OrderChart({
  isLoading,
  orders,
}:props) {
  const [labels, setLabels] = useState<string[]>(
    [
      moment().subtract(6, 'd').format('DD MMM'),
      moment().subtract(5, 'd').format('DD MMM'),
      moment().subtract(4, 'd').format('DD MMM'),
      moment().subtract(3, 'd').format('DD MMM'),
      moment().subtract(2, 'd').format('DD MMM'),
      'Kemarin',
      'Hari ini',
    ],
  );
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Pesanan',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pesanan 7 hari terakhir',
      },
    },
  };
  useEffect(() => {
    let orderCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    orders.forEach((order) => {
      if (moment().diff(moment(order.order_created_at), 'days') === 0) orderCount = { ...orderCount, 0: orderCount[0] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 1) orderCount = { ...orderCount, 1: orderCount[1] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 2) orderCount = { ...orderCount, 2: orderCount[2] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 3) orderCount = { ...orderCount, 3: orderCount[3] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 4) orderCount = { ...orderCount, 4: orderCount[4] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 5) orderCount = { ...orderCount, 5: orderCount[5] + 1 };
      if (moment().diff(moment(order.order_created_at), 'days') === 6) orderCount = { ...orderCount, 6: orderCount[6] + 1 };
    });
    setData({
      ...data,
      datasets: [
        {
          label: 'Pesanan',
          data: [
            orderCount[0],
            orderCount[1],
            orderCount[2],
            orderCount[3],
            orderCount[4],
            orderCount[5],
            orderCount[6],
          ],
          backgroundColor: 'rgba(243, 160, 28, 0.5)',
        },
      ],
    });
  }, [orders]);
  return (
    <div className="dashboard-item">
      {isLoading ? (
        <RowSkeleton />
      ) : (
        <div className="">
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
  );
}
