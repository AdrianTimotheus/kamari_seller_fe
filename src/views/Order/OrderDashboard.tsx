/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import { useState, FormEvent, useEffect } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import OrderList from '../../layouts/Order/OrderList';
import orderData from '../../models/orderData';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';

export default function OrderDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<orderData[]>([]);
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
  }, [searchOpt.orderStatus]);

  const getOrders = () => {
    // setIsLoading(true);
    // setOrders([]);
    // let url = `/sellers/orders?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    // if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    // if (searchOpt.orderStatus !== '') url += `&orderStatus=${searchOpt.orderStatus}`;
    // axiosPrivate.get(url)
    //   .then((res) => {
    //     setOrders(res.data.orders);
    //     setTotalPage(res.data.__metadata?.lastPage);
    //   })
    //   .catch((err) => {
    //     Toast.fire({
    //       icon: 'error',
    //       title: 'Terdapat masalah koneksi',
    //     });
    //     throw new Error(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    setOrders([
      {
        id: 1,
        order_number: 'ABC12345',
        status: 'Waiting for confirmation',
        buyer: {
          name: 'Adrian',
          pic_url: 'https://cf.shopee.co.id/file/9150d52b6b24256366c9a90d62330fd8',
        },
        items: [
          {
            name: 'Cornetto',
            thumbnail_url: 'https://cf.shopee.co.id/file/sg-11134201-22100-sqh89ik8thivb4',
            quantity: 1,
            total_price: 1000,
            courier: {
              name: 'Balikin aja',
            },
            address: 'Jakarta selatan',
          },
          {
            name: 'Case lucu',
            thumbnail_url: 'https://cf.shopee.co.id/file/sg-11134201-22100-lgo83jctftiv4d',
            quantity: 3,
            total_price: 8500,
            courier: {
              name: 'Si gak terlalu cepat',
            },
            address: 'Jakarta selatan',
          }
        ]
      },
      {
        id: 2,
        order_number: 'DEF12345',
        status: 'In delivery',
        buyer: {
          name: 'Fadhil',
          pic_url: 'https://cf.shopee.co.id/file/9150d52b6b24256366c9a90d62330fd8',
        },
        items: [
          {
            name: 'hp',
            thumbnail_url: 'https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/06/01/4202314682.jpg',
            quantity: 1,
            total_price: 1255000,
            courier: {
              name: 'JNE',
            },
            address: 'Depok',
          },
        ]
      }
    ]);
    setIsLoading(false);
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
