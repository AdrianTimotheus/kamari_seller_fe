import RadioButtonTab from '../../components/Form/Basic/RadioButtonTab';
import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

type props = {
  searchOpt: any,
  handleChange: Function,
  getPromotions: Function,
}

export default function PromotionSearch({
  searchOpt,
  handleChange,
  getPromotions,
}:props) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getPromotions();
  };
  return (
    <>
      <div className="d-flex flex-row flex-wrap border-bottom">
        <RadioButtonTab
          fieldId={0}
          fieldName="promoStatus"
          content="Semua"
          value=""
          handleChange={handleChange}
          currentValue={searchOpt.promoStatus}
        />
        <RadioButtonTab
          fieldId={1}
          fieldName="promoStatus"
          content="Sedang Berjalan"
          value="ongoing"
          handleChange={handleChange}
          currentValue={searchOpt.promoStatus}
        />
        <RadioButtonTab
          fieldId={2}
          fieldName="promoStatus"
          content="Akan Datang"
          value="willCome"
          handleChange={handleChange}
          currentValue={searchOpt.promoStatus}
        />
        <RadioButtonTab
          fieldId={3}
          fieldName="promoStatus"
          content="Telah Berakhir"
          value="hasEnded"
          handleChange={handleChange}
          currentValue={searchOpt.promoStatus}
        />
      </div>
      <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
        <SearchGroup
          keyword={searchOpt.keyword}
          fieldName="keyword"
          placeholder="Cari promosi"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <LimitSelect
          value={searchOpt.limit}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}
