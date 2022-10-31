import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

type props = {
  searchOpt: any,
  handleChange: Function,
  getSellerCategories: Function,
}

export default function SellerCategoriesSearch({
  searchOpt,
  handleChange,
  getSellerCategories,
}:props) {
  const handleSubmit = () => {
    getSellerCategories();
  };
  return (
    <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
      <SearchGroup
        keyword={searchOpt.keyword}
        fieldName="keyword"
        placeholder="Cari kategori"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <LimitSelect
        value={searchOpt.limit}
        handleChange={handleChange}
      />
    </div>
  );
}
