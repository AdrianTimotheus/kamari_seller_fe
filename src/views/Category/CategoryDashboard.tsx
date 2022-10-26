/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import CategoryList from '../../layouts/Category/CategoryList';
import categoryData from '../../models/categoryData';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';

export default function CategoryDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    page: 1,
    limit: '10',
    categoryStatus: '',
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
  }, [searchOpt.categoryStatus]);

  const getCategories = () => {
    setIsLoading(true);
    setCategories([]);
    let url = `/sellers/categories?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    if (searchOpt.categoryStatus !== '') url += `&categoryStatus=${searchOpt.categoryStatus}`;
    axiosPrivate.get(url)
      .then((res) => {
        setCategories(res.data.categories);
        setTotalPage(res.data.__metadata?.lastPage);
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
    setDocumentTitle('Kategori Toko');
    getCategories();
  }, [
    searchOpt.page,
    searchOpt.limit,
    searchOpt.categoryStatus,
  ]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Kategori Toko" />
        <PageBreadcrumb main="Produk" sub="Kategori Toko" />
      </div>
      <div>
        <CategoryList
          categories={categories}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getCategories={getCategories}
        />
      </div>
    </div>
  );
}
