/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import ProductVariant from '../../Product/ProductVariant';

type props = {
  validationMsg: any,
  productSettings: any,
  setProductSettings: Dispatch<SetStateAction<any>>,
  mainVariantTitle: string,
  setMainVariantTitle: Dispatch<SetStateAction<string>>,
  subVariantTitle: string,
  setSubVariantTitle: Dispatch<SetStateAction<string>>,
  mainVariantItems: string[],
  setMainVariantItems: Dispatch<SetStateAction<string[]>>,
  subVariantItems: string[],
  setSubVariantItems: Dispatch<SetStateAction<string[]>>,
}
export default function ProductVariantForm({
  validationMsg,
  productSettings,
  setProductSettings,
  mainVariantTitle,
  setMainVariantTitle,
  subVariantTitle,
  setSubVariantTitle,
  mainVariantItems,
  setMainVariantItems,
  subVariantItems,
  setSubVariantItems,
}:props) {
  const changeIsMainVariant = (b: boolean) => {
    setProductSettings({ ...productSettings, isMainVariant: b });
  };
  const changeIsSubVariant = (b: boolean) => {
    setProductSettings({ ...productSettings, isSubVariant: b });
  };
  const handleEnableMainVariantChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setProductSettings({ ...productSettings, isMainVariant: value !== '0' });
  };
  useEffect(() => {
    if (!productSettings.isSubVariant) {
      setSubVariantTitle('');
      setSubVariantItems(['']);
    }
  }, [productSettings.isSubVariant]);
  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-2">
          Apakah produk memiliki variasi?
        </div>
        <div className="col-12 col-lg-10 d-flex flex-row gap-3">
          <RadioButtonNormal
            fieldId={0}
            fieldName="isMainVariant"
            content="Tidak"
            value="0"
            currentValue={productSettings.isMainVariant ? '1' : '0'}
            handleChange={handleEnableMainVariantChange}
          />
          <RadioButtonNormal
            fieldId={1}
            fieldName="isMainVariant"
            content="Ya"
            value="1"
            currentValue={productSettings.isMainVariant ? '1' : '0'}
            handleChange={handleEnableMainVariantChange}
          />
        </div>
      </div>

      {productSettings.isMainVariant && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Variasi 1
          </div>
          <div className="col-12 col-lg-10">
            <ProductVariant
              titleValidationMsg={validationMsg.variantMainTitle}
              itemsValidationMsg={validationMsg.variantMainItems}
              level="main"
              handleClose={changeIsMainVariant}
              variantTitle={mainVariantTitle}
              setVariantTitle={setMainVariantTitle}
              variantItems={mainVariantItems}
              setVariantItems={setMainVariantItems}
            />
          </div>
        </div>
      )}

      {(productSettings.isMainVariant && productSettings.isSubVariant) && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Variasi 2
          </div>
          <div className="col-12 col-lg-10">
            <ProductVariant
              titleValidationMsg={validationMsg.variantSubTitle}
              itemsValidationMsg={validationMsg.variantSubItems}
              level="sub"
              handleClose={changeIsSubVariant}
              variantTitle={subVariantTitle}
              setVariantTitle={setSubVariantTitle}
              variantItems={subVariantItems}
              setVariantItems={setSubVariantItems}
            />
          </div>
        </div>
      )}

      {(productSettings.isMainVariant && !productSettings.isSubVariant) && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Varian 2
          </div>
          <div className="col-12 col-lg-10">
            <button
              type="button"
              className="btn-dashed"
              onClick={() => changeIsSubVariant(true)}
            >
              Tambah
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
