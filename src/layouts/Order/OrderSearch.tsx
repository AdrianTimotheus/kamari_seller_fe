import RadioButtonTab from '../../components/Form/Basic/RadioButtonTab';
import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';
import { orderStatuses } from '../../utils/Values';

type props = {
  searchOpt: any,
  handleChange: Function,
  getOrders: Function,
}

export default function OrderSearch({
  searchOpt,
  handleChange,
  getOrders,
}:props) {
  const handleSubmit = () => {
    getOrders();
  };
  return (
    <>
      <div className="d-flex flex-row flex-wrap border-bottom">
        {orderStatuses.map((item, index) => (
          <RadioButtonTab
            key={`${item.id}-${item.name}-${item.text}`}
            fieldId={index}
            fieldName="orderStatus"
            content={item.text}
            value={item.name}
            handleChange={handleChange}
            currentValue={searchOpt.orderStatus}
          />
        ))}
      </div>
      <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
        <SearchGroup
          keyword={searchOpt.keyword}
          fieldName="keyword"
          placeholder="Cari nomor pesanan"
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
