import RadioButtonTab from '../../components/Form/Basic/RadioButtonTab';
import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getOrders();
  };
  const statuses = [
    {
      content: 'Semua',
      value: '',
    },
    {
      content: 'Belum Bayar',
      value: '',
    },
    {
      content: 'Perlu Dikirim',
      value: '',
    },
    {
      content: 'Dikirim',
      value: '',
    },
    {
      content: 'Selesai',
      value: '',
    },
    {
      content: 'Pembatalan',
      value: '',
    },
    {
      content: 'Pengembalian',
      value: '',
    },
  ];
  return (
    <>
      <div className="d-flex flex-row flex-wrap border-bottom">
        {statuses.map((item, index) => (
          <RadioButtonTab
            key={item.content}
            fieldId={index}
            fieldName="orderStatus"
            content={item.content}
            value={item.value}
            handleChange={handleChange}
            currentValue={searchOpt.orderStatus}
          />
        ))}
      </div>
      <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
        <SearchGroup
          keyword={searchOpt.keyword}
          fieldName="keyword"
          placeholder="Cari nama / kode order"
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
