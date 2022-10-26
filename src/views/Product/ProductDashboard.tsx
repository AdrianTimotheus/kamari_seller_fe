/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useState, FormEvent, useEffect } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import ProductList from '../../layouts/Product/ProductList';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';

export default function ProductDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
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

  const getProducts = () => {
    setIsLoading(true);
    setProducts([]);
    let url = `/sellers/products?sort=latest&page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&search=${searchOpt.keyword}`;
    axiosPrivate.get(url)
      .then((res) => {
        if (res.data.products) setProducts(res.data.products);
        setTotalPage(res.data.total_page);
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
    setDocumentTitle('Produk');
    getProducts();
  }, [
    searchOpt.page,
    searchOpt.limit,
  ]);
  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Produk" />
        <PageBreadcrumb main="Produk" sub="Produk" />
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
