import FormSkeleton from '../../components/Loading/FormSkeleton';
import PromotionDetailItem from '../../components/Promotion/PromotionDetailItem';
import SectionTitle from '../../components/Text/SectionTitle';

type props = {
  isLoading: boolean,
  promoItems: any[],
}

export default function PromotionDetailList({
  isLoading,
  promoItems,
}:props) {
  return (
    <div className="page-content">
      <SectionTitle text="Produk Yang Dipromosikan" />
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <div className="d-flex flex-column gap-3">
          {promoItems.map((item) => (
            <PromotionDetailItem promoItem={item} />
          ))}
          {promoItems.length === 0 && (
            <span className="text-grey2">Tidak ada data</span>
          )}
        </div>
      )}
    </div>
  );
}
