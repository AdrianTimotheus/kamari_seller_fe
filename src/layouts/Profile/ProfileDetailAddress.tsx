import SectionTitle from '../../components/Text/SectionTitle';

type props = {
  merchant: any,
}
export default function ProfileDetailAddress({ merchant }:props) {
  return (
    <div className="page-content">
      <SectionTitle text="Alamat Toko" />
      <div className="d-flex flex-column gap-3">

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Detail Alamat
          </div>
          <div className="col-12 col-sm-9">
            {merchant.address.detail_address}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Kota
          </div>
          <div className="col-12 col-sm-9">
            {merchant.address.city.name}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Provinsi
          </div>
          <div className="col-12 col-sm-9">
            {merchant.address.city.province.name}
          </div>
        </div>

      </div>
    </div>
  );
}
