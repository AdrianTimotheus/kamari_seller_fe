import { Link } from 'react-router-dom';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import SectionTitle from '../../components/Text/SectionTitle';
import SellerCategoriesSearch from './SellerCategoriesSearch';
import sellerCategoriesData from '../../models/sellerCategoriesData';
import SellerCategoriesItem from '../../components/Category/SellerCategoriesItem';
import { routeSellerCategoriesNew } from '../../utils/RouteList';

type props = {
  sellerCategories: sellerCategoriesData[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getSellerCategories: Function,
}

export default function SellerCategoriesList({
  sellerCategories,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getSellerCategories,
}:props) {
  return (
    <div className="page-content">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <SectionTitle text="Daftar Kategori" />
        </div>
        <Link
          to={routeSellerCategoriesNew}
          className="btn btn-secondary"
        >
          <i className="bi bi-plus" />
          Buat
        </Link>
      </div>
      <SellerCategoriesSearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getSellerCategories={getSellerCategories}
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
                  <th scope="col">Id</th>
                  <th scope="col">Nama Kategori</th>
                  <th scope="col">Jumlah produk</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sellerCategories.map((sellerCategory) => (
                  <SellerCategoriesItem key={`sellerCategories-item-${sellerCategory.id}`} sellerCategories={sellerCategory} />
                ))}
              </tbody>
            </table>
            {sellerCategories.length === 0 && 'Tidak ada data'}
          </div>
          {sellerCategories.length !== 0 && (
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
