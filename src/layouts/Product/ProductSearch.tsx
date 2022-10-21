import { FormEvent } from 'react';
import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

type props = {
  searchOpt: any,
  handleChange: Function,
  getProducts: Function,
  marginY?: number,
}

const defaultProps = {
  marginY: 4,
};
export default function ProductSearch({
  searchOpt,
  handleChange,
  getProducts,
  marginY,
}:props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getProducts();
  };
  return (
    <div className={`my-${marginY} d-flex flex-row flex-wrap justify-content-between align-items-center`}>
      <SearchGroup
        keyword={searchOpt.keyword}
        fieldName="keyword"
        placeholder="Cari produk"
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
ProductSearch.defaultProps = defaultProps;
