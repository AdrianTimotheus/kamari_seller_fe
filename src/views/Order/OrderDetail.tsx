/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toast from '../../components/Interaction/Toast';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import OrderDetailInfo from '../../layouts/Order/OrderDetailInfo';
import OrderDetailItemList from '../../layouts/Order/OrderDetailItemList';
import OrderDetailSales from '../../layouts/Order/OrderDetailSales';
import OrderShipmentLabel from '../../layouts/Order/OrderShipmentLabel';
import { axiosPrivate } from '../../utils/API';
import { routeOrder } from '../../utils/RouteList';
import { setDocumentTitle } from '../../utils/Utils';
import { orderStatuses } from '../../utils/Values';
import '../../assets/style/order.css';

export default function OrderDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [merchant, setMerchant] = useState<any>({});
  const [order, setOrder] = useState<any>({});

  const updateOrder = () => {
    setIsLoading(true);
    setOrder({});
    axiosPrivate.get(`/sellers/orders/${params.orderId}`)
      .then((res) => {
        setOrder(res.data.order);
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
  const handlePrintLabel = () => {
    window.print();
  };
  const handleProceedOrder = () => {
    Swal.fire({
      text: 'Pastikan produk yang dikemas sudah tepat, ya...',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#4AB7B6',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Lanjut proses',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axiosPrivate.put(`/sellers/orders/${order.id}`)
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Pesanan diproses',
            });
            updateOrder();
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: 'Gagal memproses pesanan',
            });
            throw new Error(err);
          });
      }
    });
  };
  const handleDeliverOrder = () => {
    Swal.fire({
      text: 'Pastikan alamat dan jasa kirim sudah tepat, ya...',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#4AB7B6',
      cancelButtonColor: '#cecece',
      confirmButtonText: 'Lanjut kirim',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.put(`/sellers/orders/${order.id}`)
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Pesanan dikirim',
            });
            updateOrder();
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: 'Gagal mengirim pesanan',
            });
            throw new Error(err);
          });
      }
    });
  };
  useEffect(() => {
    if (params.orderId) {
      const fetchMerchant = axiosPrivate.get('/merchants');
      const fetchOrder = axiosPrivate.get(`/sellers/orders/${params.orderId}`);
      Promise.all([fetchMerchant, fetchOrder])
        .then(([merchantRes, orderRes]) => {
          setMerchant(merchantRes.data);
          setOrder(orderRes.data.order);
          setDocumentTitle(`Detail pesanan ${orderRes.data.order.invoice}`);
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: 'Terdapat masalah koneksi',
          });
          navigate(routeOrder);
          throw new Error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate(routeOrder);
    }
  }, [params.productId]);
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Detail Pesanan" />
        <PageBreadcrumb main="Pesanan" sub="Pesanan" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Informasi Pesanan" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <OrderDetailInfo
              order={order}
            />
          )}
        </div>
        <div className="page-content">
          <SectionTitle text="Produk Pesanan" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <>
              <OrderDetailItemList
                order={order}
              />
              <OrderDetailSales
                order={order}
              />
            </>
          )}
        </div>
        {(!isLoading && [orderStatuses[1].name, orderStatuses[2].name]
          .includes(order.order_status)) && (
          <div className="page-content d-flex flex-row justify-content-between">
            <OrderShipmentLabel
              merchant={merchant}
              order={order}
            />
            <button
              type="button"
              className="btn btn-outline-primary d-flex flex-row gap-1"
              onClick={() => handlePrintLabel()}
            >
              <i className="bi bi-printer" />
              <span>Print Label</span>
            </button>
            {order.order_status === orderStatuses[1].name && (
              <button
                type="button"
                className="btn btn-secondary d-flex flex-row gap-1"
                onClick={() => handleProceedOrder()}
              >
                <i className="bi bi-box-seam" />
                <span>Proses Pesanan</span>
              </button>
            )}
            {order.order_status === orderStatuses[2].name && (
              <button
                type="button"
                className="btn btn-secondary d-flex flex-row gap-1"
                onClick={() => handleDeliverOrder()}
              >
                <i className="bi bi-truck" />
                <span>Kirim Pesanan</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
