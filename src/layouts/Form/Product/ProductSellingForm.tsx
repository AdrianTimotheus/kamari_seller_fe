import NumberInput from '../../../components/Form/Basic/NumberInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';

/* eslint-disable */
type props = {
  mode: string,
  productSettings: any,
}
export default function ProductSellingForm({
  mode,
  productSettings,
}:props) {
  return (
    <div className="d-flex flex-column gap-3">

      {!productSettings.isMainVariant && (
        <>
          <div className="row">
            <div className="col-12 col-lg-2">
              Harga
            </div>
            <div className="col-12 col-lg-10">
              <PriceInput
                value=""
                placeholder="Harga"
                fieldName="price"
                handleChange={console.log}
                min={1000}
                max={1000000}
                validationMsg=""
                isRequired
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-2">
              Stok
            </div>
            <div className="col-12 col-lg-10">
              <NumberInput
                value=""
                placeholder="Stok"
                fieldName="stock"
                handleChange={console.log}
                min={1}
                max={1000000}
                validationMsg=""
                isRequired
              />
            </div>
          </div>
        </>
      )}

    </div>
  );
}
