/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import PromotionList from '../../layouts/Promotion/PromotionList';
import promotionData from '../../models/promotionData';
import { axiosPrivate } from '../../utils/API';
import '../../assets/style/promotion.css';
import { setDocumentTitle } from '../../utils/Utils';

export default function PromotionDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promotions, setPromotions] = useState<promotionData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    page: 1,
    limit: '10',
    promoStatus: '',
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
  }, [searchOpt.promoStatus]);

  const getPromotions = () => {
    setIsLoading(true);
    setPromotions([]);
    let url = `/sellers/promos?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    if (searchOpt.promoStatus !== '') url += `&promoStatus=${searchOpt.promoStatus}`;
    axiosPrivate.get(url)
      .then((res) => {
        setPromotions(res.data.product_promo);
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
    setDocumentTitle('Promosi');
    getPromotions();
  }, [
    searchOpt.page,
    searchOpt.limit,
    searchOpt.promoStatus,
  ]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Promosi" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Promosi" />
      </div>
      <div>
        <PromotionList
          promotions={promotions}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getPromotions={getPromotions}
        />
      </div>
    </div>
  );
}
