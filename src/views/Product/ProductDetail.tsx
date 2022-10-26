/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../../components/Interaction/Toast';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import ProductDetailInfo from '../../layouts/Product/ProductDetailInfo';
import ProductDetailOther from '../../layouts/Product/ProductDetailOther';
import ProductDetailPhoto from '../../layouts/Product/ProductDetailPhoto';
import ProductDetailSelling from '../../layouts/Product/ProductDetailSelling';
import { axiosPublic } from '../../utils/API';
import { routeProductList } from '../../utils/RouteList';
import { setDocumentTitle } from '../../utils/Utils';

export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [complementaryCategories, setComplementaryCategories] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    if (params.productId) {
      setDocumentTitle('Detail Produk');
      const fetchComplementaryCategories = axiosPublic.get('/complementary-categories?page=1&limit=10000');
      const fetchProduct = axiosPublic.get(`/products/${params.productId}`);

      Promise.all([fetchComplementaryCategories, fetchProduct])
        .then(([complementariesRes, productRes]) => {
          setComplementaryCategories(complementariesRes.data.complementary_categories);
          setProduct(productRes.data);
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Terdapat masalah koneksi',
          });
          navigate(routeProductList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate(routeProductList);
    }
  }, [params.productId]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Detail Produk" />
        <PageBreadcrumb main="Produk" sub="Produk" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Informasi Produk" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <ProductDetailInfo
              product={product}
              complementaryCategories={complementaryCategories}
            />
          )}
        </div>
        <div className="page-content">
          <SectionTitle text="Informasi Penjualan" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <ProductDetailSelling
              product={product}
            />
          )}
        </div>
        <div className="page-content">
          <SectionTitle text="Foto Produk" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <ProductDetailPhoto
              product={product}
            />
          )}
        </div>
        <div className="page-content">
          <SectionTitle text="Lainnya" />
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <ProductDetailOther
              product={product}
            />
          )}
        </div>
      </div>
    </div>
  );
}
