import { Link } from 'react-router-dom';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import SectionTitle from '../../components/Text/SectionTitle';
import CategoryItem from '../../components/Category/CategoryItem';
import categoryData from '../../models/categoryData';
import { routeCategoryNew } from '../../utils/RouteList';
import CategorySearch from './CategorySearch';

type props = {
  categories: categoryData[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getCategories: Function,
}

export default function CategoryList({
  categories,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getCategories,
}:props) {
  return (
    <div className="page-content">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <SectionTitle text="Daftar Kategori Toko" />
        </div>
        <Link
          to={routeCategoryNew}
          className="btn btn-secondary"
        >
          <i className="bi bi-plus" />
          Buat
        </Link>
      </div>
      <CategorySearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getCategories={getCategories}
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
                  <th scope="col">Nama</th>
                  <th scope="col">Produk</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <CategoryItem key={`category-item-${category.id}`} category={category} />
                ))}
              </tbody>
            </table>
            {categories.length === 0 && 'Tidak ada data'}
          </div>
          {categories.length !== 0 && (
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
