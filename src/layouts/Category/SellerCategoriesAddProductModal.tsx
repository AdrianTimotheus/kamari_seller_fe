/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Interaction/Toast';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import sellerCategoryItems from '../../models/sellerCategoryItems';
import { axiosPrivate } from '../../utils/API';
import ProductSearch from '../Product/ProductSearch';
import SellerCategoryAddProductTable from '../Table/Category/SellerCategoryAddProductTable';

type props = {
  // mode: string,
  formSellerCategoriesItems: sellerCategoryItems[],
  handleUpdateProductItems: Function,
  submitPostSellerCategoriesItems: Function,
}

export default function SellerCategoriesAddProductModal({
  // mode,
  formSellerCategoriesItems,
  handleUpdateProductItems,
  submitPostSellerCategoriesItems,
}:props) {
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
    let url = `/sellers/categories/available-products?&page=${searchOpt.page}&limit=${parseInt(searchOpt.limit, 10)}`;
    if (searchOpt.keyword !== '') url += `&keyword=${searchOpt.keyword}`;
    axiosPrivate.get(url)
      .then((res) => {
        if (res.data.items) setProducts(res.data.items);
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
    getProducts();
  }, [
    searchOpt.page,
    searchOpt.limit,
  ]);
  return (
    <div className="modal fade" id="addProductModal" tabIndex={-1} aria-labelledby="addProductModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProductModalLabel">Pilih Produk</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <ProductSearch
              searchOpt={searchOpt}
              handleChange={handleChange}
              getProducts={getProducts}
              marginY={1}
            />
            {isLoading ? (
              <div className="d-flex flex-column gap-3">
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </div>
            ) : (
              <>
                <div>
                  <SellerCategoryAddProductTable
                    selectedProducts={formSellerCategoriesItems.map((item) => item)}
                    handleChange={handleUpdateProductItems}
                    products={products}
                  />
                  {products.length === 0 && 'Tidak ada data'}
                </div>
                {products.length !== 0 && (
                  <div className="justify-content-end d-flex">
                    <Pagination
                      currentPage={searchOpt.page}
                      totalPage={totalPage}
                      changePage={changePage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Tutup</button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => submitPostSellerCategoriesItems()}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
