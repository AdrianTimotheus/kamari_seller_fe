/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useState, FormEvent, useEffect } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import OrderList from '../../layouts/Order/OrderList';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';
import '../../assets/style/order.css';

export default function OrderDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    page: 1,
    limit: '10',
    orderStatus: '',
  });

  const changePage = (page: number) => {
    setSearchOpt({ ...searchOpt, page });
  };
  const handleChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setSearchOpt({ ...searchOpt, [name]: value });
  };

  useEffect(() => {
    setSearchOpt({ ...searchOpt, page: 1 });
  }, [
    searchOpt.limit,
    searchOpt.orderStatus,
  ]);

  const getOrders = () => {
    setIsLoading(true);
    setOrders([]);
    let url = `/sellers/orders?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    if (searchOpt.orderStatus !== '') url += `&orderStatus=${searchOpt.orderStatus}`;
    axiosPrivate.get(url)
      .then((res) => {
        setOrders(res.data.orders);
        setTotalPage(res.data.__metadata.lastPage);
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
  };

  useEffect(() => {
    setDocumentTitle('Pesanan');
    getOrders();
  }, [
    searchOpt.page,
    searchOpt.limit,
    searchOpt.orderStatus,
  ]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Pesanan" />
        <PageBreadcrumb main="Pesanan" sub="Pesanan" />
      </div>
      <div>
        <OrderList
          orders={orders}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getOrders={getOrders}
        />
      </div>
    </div>
  );
}
