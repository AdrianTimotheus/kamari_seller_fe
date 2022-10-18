import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import ProductItem from '../../components/Product/ProductItem';
import SectionTitle from '../../components/Text/SectionTitle';
import productData from '../../models/productData';
import ProductSearch from './ProductSearch';

type props = {
  products: productData[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getProducts: Function,
}

export default function ProductList({
  products,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getProducts,
}:props) {
  return (
    <div className="page-content">
      <SectionTitle text="Daftar Produk" />
      <ProductSearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getProducts={getProducts}
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
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nama Produk</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Stok / Penjualan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <ProductItem key={`product-item-${product.id}`} product={product} />
                ))}
              </tbody>
            </table>
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
  );
}
