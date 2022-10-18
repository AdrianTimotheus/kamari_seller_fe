/* eslint-disable no-underscore-dangle */
import { useState, FormEvent, useEffect } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import useAppSelector from '../../hooks/useAppSelector';
import ProductList from '../../layouts/Product/ProductList';
import productData from '../../models/productData';
import { selectUser } from '../../store/userSlice';
import { axiosPublic } from '../../utils/API';

export default function ProductDashboard() {
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<productData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    page: 1,
    limit: '10',
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

  // useEffect(() => {
  //   setSearchOpt({ ...searchOpt, page: 1 });
  // }, [searchOpt.voucherStatus]);

  const getProducts = () => {
    if (user.username) {
      setIsLoading(true);
      setProducts([]);
      // let url = `/sellers/${user.username}/
      // products?sort=latest&page=${searchOpt.page}&limit=${searchOpt.limit}`;
      let url = `/sellers/seller/products?sort=latest&page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
      if (searchOpt.keyword !== '') url += `&search=${searchOpt.keyword}`;
      axiosPublic.get(url)
        .then((res) => {
          if (res.data.products) setProducts(res.data.products);
          setTotalPage(res.data.total_page);
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getProducts();
  }, [
    searchOpt.page,
    searchOpt.limit,
    user.username,
  ]);
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Produk Saya" />
        <PageBreadcrumb main="Produk" sub="Produk Saya" />
      </div>
      <div>
        <ProductList
          products={products}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getProducts={getProducts}
        />
      </div>
    </div>
  );
}
