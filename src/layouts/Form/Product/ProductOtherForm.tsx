import NumberInput from '../../../components/Form/Basic/NumberInput';

/* eslint-disable */
type props = {
  mode: string,
  formProductInfo: any,
  handleChangeFormProductInfo: Function,
}
export default function ProductOtherForm({
  mode,
  formProductInfo,
  handleChangeFormProductInfo,
}:props) {
  return (
    <div className="d-flex flex-column gap-3">

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
            min={1000}
            max={1000000}
            validationMsg=""
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Produk Berbahaya
        </div>
        <div className="col-12 col-lg-10 d-flex flex-row flex-wrap gap-2">
          <div className="form-check">
            <input
              id="productIsHazardous0"
              className="form-check-input radio-normal"
              type="radio"
              name="productIsHazardous"
              value="0"
              required
            />
            <label className="form-check-label" htmlFor="productIsHazardous0">
              Tidak
            </label>
          </div>
          <div className="form-check">
            <input
              id="productIsHazardous1"
              className="form-check-input radio-normal"
              type="radio"
              name="productIsHazardous"
              value="1"
              required
            />
            <label className="form-check-label" htmlFor="productIsHazardous0">         
              Mengandung baterai/magnet/cairan/bahan mudah terbakar
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}
