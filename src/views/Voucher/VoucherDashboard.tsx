/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import VoucherList from '../../layouts/Voucher/VoucherList';
import voucherData from '../../models/voucherData';
import { axiosPrivate } from '../../utils/API';
import { setDocumentTitle } from '../../utils/Utils';

export default function VoucherDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vouchers, setVouchers] = useState<voucherData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchOpt, setSearchOpt] = useState({
    keyword: '',
    page: 1,
    limit: '10',
    voucherStatus: '',
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
  }, [searchOpt.voucherStatus]);

  const getVouchers = () => {
    setIsLoading(true);
    setVouchers([]);
    let url = `/sellers/vouchers?page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    if (searchOpt.voucherStatus !== '') url += `&voucherStatus=${searchOpt.voucherStatus}`;
    axiosPrivate.get(url)
      .then((res) => {
        setVouchers(res.data.vouchers);
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
    setDocumentTitle('Voucher Toko');
    getVouchers();
  }, [
    searchOpt.page,
    searchOpt.limit,
    searchOpt.voucherStatus,
  ]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Voucher Toko" />
        <PageBreadcrumb main="Voucher dan Promosi" sub="Voucher Toko" />
      </div>
      <div>
        <VoucherList
          vouchers={vouchers}
          searchOpt={searchOpt}
          handleChange={handleChange}
          changePage={changePage}
          totalPage={totalPage}
          isLoading={isLoading}
          getVouchers={getVouchers}
        />
      </div>
    </div>
  );
}
