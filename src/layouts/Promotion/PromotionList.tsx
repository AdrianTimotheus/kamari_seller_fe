import { Link } from 'react-router-dom';
import RowSkeleton from '../../components/Loading/RowSkeleton';
import Pagination from '../../components/Pagination';
import PromotionItem from '../../components/Promotion/PromotionItem';
import SectionTitle from '../../components/Text/SectionTitle';
import promotionData from '../../models/promotionData';
import { routePromotionNew } from '../../utils/RouteList';
import PromotionSearch from './PromotionSearch';

type props = {
  promotions: promotionData[],
  searchOpt: any,
  handleChange: Function,
  changePage: Function,
  totalPage: number,
  isLoading: boolean,
  getPromotions: Function,
}

export default function PromotionList({
  promotions,
  searchOpt,
  handleChange,
  changePage,
  totalPage,
  isLoading,
  getPromotions,
}:props) {
  return (
    <div className="page-content">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <SectionTitle text="Daftar Promosi" />
        </div>
        <Link
          to={routePromotionNew}
          className="btn btn-secondary"
        >
          <i className="bi bi-plus" />
          Buat
        </Link>
      </div>
      <PromotionSearch
        searchOpt={searchOpt}
        handleChange={handleChange}
        getPromotions={getPromotions}
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
                  <th scope="col">Nama Promosi</th>
                  <th scope="col">Produk</th>
                  <th scope="col">Status / Masa Berlaku</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promotion) => (
                  <PromotionItem key={`promotion-item-${promotion.id}`} promotion={promotion} />
                ))}
              </tbody>
            </table>
            {promotions.length === 0 && 'Tidak ada data'}
          </div>
          {promotions.length !== 0 && (
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
