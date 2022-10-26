import NumberInput from '../../../components/Form/Basic/NumberInput';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';

type props = {
  validationMsg: any,
  formProductInfo: any,
  handleChangeFormProductInfo: Function,
}
export default function ProductOtherForm({
  validationMsg,
  formProductInfo,
  handleChangeFormProductInfo,
}:props) {
  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-2">
          Minimum Pemesanan
        </div>
        <div className="col-12 col-lg-10">
          <NumberInput
            value={formProductInfo.productMinOrder}
            placeholder="Minimum Pemesanan"
            fieldName="productMinOrder"
            handleChange={handleChangeFormProductInfo}
            min={1}
            validationMsg={validationMsg.productMinOrder}
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Maksimum Pemesanan
        </div>
        <div className="col-12 col-lg-10">
          <NumberInput
            value={formProductInfo.productMaxOrder}
            placeholder="Maksimum Pemesanan"
            fieldName="productMaxOrder"
            handleChange={handleChangeFormProductInfo}
            min={1}
            validationMsg={validationMsg.productMaxOrder}
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Berat (gr)
        </div>
        <div className="col-12 col-lg-10">
          <NumberInput
            value={formProductInfo.productWeight}
            placeholder="Berat (gr)"
            fieldName="productWeight"
            handleChange={handleChangeFormProductInfo}
            min={1}
            validationMsg={validationMsg.productWeight}
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Produk Berbahaya
        </div>
        <div className={`col-12 col-lg-10 d-flex flex-column ${validationMsg.productIsHazardous !== '' ? 'border border-danger' : ''}`}>
          <div className="d-flex flex-row flex-wrap gap-2">
            <RadioButtonNormal
              fieldId={0}
              fieldName="productIsHazardous"
              content="Tidak"
              value="0"
              currentValue={formProductInfo.productIsHazardous}
              handleChange={handleChangeFormProductInfo}
            />
            <RadioButtonNormal
              fieldId={1}
              fieldName="productIsHazardous"
              content="Mengandung baterai/magnet/cairan/bahan mudah terbakar"
              value="1"
              currentValue={formProductInfo.productIsHazardous}
              handleChange={handleChangeFormProductInfo}
            />
          </div>
          <div>
            <span className="text-danger">{validationMsg.productIsHazardous}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
