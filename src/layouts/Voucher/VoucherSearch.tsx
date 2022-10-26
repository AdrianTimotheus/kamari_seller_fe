import RadioButtonTab from '../../components/Form/Basic/RadioButtonTab';
import LimitSelect from '../../components/Form/Custom/LimitSelect';
import SearchGroup from '../../components/Form/Custom/SearchGroup';

type props = {
  searchOpt: any,
  handleChange: Function,
  getVouchers: Function,
}

export default function VoucherSearch({
  searchOpt,
  handleChange,
  getVouchers,
}:props) {
  const handleSubmit = () => {
    getVouchers();
  };
  return (
    <>
      <div className="d-flex flex-row flex-wrap border-bottom">
        <RadioButtonTab
          fieldId={0}
          fieldName="voucherStatus"
          content="Semua"
          value=""
          handleChange={handleChange}
          currentValue={searchOpt.voucherStatus}
        />
        <RadioButtonTab
          fieldId={1}
          fieldName="voucherStatus"
          content="Sedang Berjalan"
          value="ongoing"
          handleChange={handleChange}
          currentValue={searchOpt.voucherStatus}
        />
        <RadioButtonTab
          fieldId={2}
          fieldName="voucherStatus"
          content="Akan Datang"
          value="willCome"
          handleChange={handleChange}
          currentValue={searchOpt.voucherStatus}
        />
        <RadioButtonTab
          fieldId={3}
          fieldName="voucherStatus"
          content="Telah Berakhir"
          value="hasEnded"
          handleChange={handleChange}
          currentValue={searchOpt.voucherStatus}
        />
      </div>
      <div className="my-4 d-flex flex-row flex-wrap justify-content-between align-items-center">
        <SearchGroup
          keyword={searchOpt.keyword}
          fieldName="keyword"
          placeholder="Cari nama / kode voucher"
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
