import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

type props = {
  searchOpt: any,
  handleChange: Function,
  getCategories: Function,
}

export default function CategorySearch({
  searchOpt,
  handleChange,
  getCategories,
}:props) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getCategories();
  };
  return (
    <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
      <SearchGroup
        keyword={searchOpt.keyword}
        fieldName="keyword"
        placeholder="Cari kategori toko"
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
