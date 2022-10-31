/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import sellerCategoryData from '../../models/sellerCategoriesData';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';
import SellerCategoriesList from '../../layouts/Category/SellerCategoriesList';

export default function SellerCategoryDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sellerCategories, setSellerCategories] = useState<sellerCategoryData[]>([]);
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

  const getSellerCategories = () => {
    setIsLoading(true);
    setSellerCategories([]);
    let url = `/sellers/categories?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;

    axiosPrivate.get(url)
      .then((res) => {
        setSellerCategories(res.data.seller_categories);
        setTotalPage(res.data.total_page);
        console.log(res.data.total_page);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'There was a problem fetching data',
        });
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setDocumentTitle('Kategori Toko');
    getSellerCategories();
  }, [
    searchOpt.page,
  ]);

  useEffect(() => {
    setDocumentTitle('Kategori Toko');
    changePage(1);
    getSellerCategories();
  }, [
    searchOpt.keyword,
    searchOpt.limit,
  ]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Kategori Toko" />
        <PageBreadcrumb main="Produk" sub="Kategori Toko" />
      </div>
      <div>
        <SellerCategoriesList
          sellerCategories={sellerCategories}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getSellerCategories={getSellerCategories}
        />
      </div>
    </div>
  );
}
