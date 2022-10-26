/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
} from 'react';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import ProductVariant from './ProductVariant';

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
  variantPrices: string[],
  setVariantPrices: Dispatch<SetStateAction<string[]>>,
  variantStocks: string[],
  setVariantStocks: Dispatch<SetStateAction<string[]>>,
  variantPhotos: string[],
  setVariantPhotos: Dispatch<SetStateAction<string[]>>,
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
  variantPrices,
  setVariantPrices,
  variantStocks,
  setVariantStocks,
  variantPhotos,
  setVariantPhotos,
}:props) {
  const handleAddMainItem = () => {
    setMainVariantItems([...mainVariantItems, '']);
    setVariantPhotos([...variantPhotos, '']);
    if (!productSettings.isSubVariant) {
      setVariantPrices([...variantPrices, '']);
      setVariantStocks([...variantStocks, '']);
    } else {
      const temp:string[] = [];
      for (let i = 0; i < subVariantItems.length; i += 1) {
        temp.push('');
      }
      setVariantPrices([...variantPrices, ...temp]);
      setVariantStocks([...variantStocks, ...temp]);
    }
  };
  const handleAddSubItem = () => {
    setSubVariantItems([...subVariantItems, '']);
    const insertIndexes:number[] = [];
    for (let i = subVariantItems.length - 1;
      i < variantPrices.length;
      i += subVariantItems.length) {
      insertIndexes.push(i);
    }
    const staticLength = variantPrices.length;
    const tempPrices:string[] = [];
    for (let i = 0; i < staticLength; i += 1) {
      tempPrices.push(variantPrices[i]);
      if (insertIndexes.includes(i)) tempPrices.push('');
    }
    const tempStocks:string[] = [];
    for (let i = 0; i < staticLength; i += 1) {
      tempStocks.push(variantStocks[i]);
      if (insertIndexes.includes(i)) tempStocks.push('');
    }
    setVariantPrices(() => tempPrices);
    setVariantStocks(() => tempStocks);
  };
  const handleDeleteMainItem = (inputIndex: number) => {
    setMainVariantItems((prev) => prev.filter((item, index) => index !== inputIndex));
    setVariantPhotos((prev) => prev.filter((item, prevIndex) => prevIndex !== inputIndex));
    if (!productSettings.isSubVariant) {
      setVariantPrices((prev) => prev.filter((item, prevIndex) => prevIndex !== inputIndex));
      setVariantStocks((prev) => prev.filter((item, prevIndex) => prevIndex !== inputIndex));
    } else {
      const deleteIndexes:number[] = [inputIndex * subVariantItems.length];
      for (let i = 1; i < subVariantItems.length; i += 1) {
        deleteIndexes.push(deleteIndexes[deleteIndexes.length - 1] + 1);
      }
      setVariantPrices((prev) => prev
        .filter((item, prevIndex) => !deleteIndexes.includes(prevIndex)));
      setVariantStocks((prev) => prev
        .filter((item, prevIndex) => !deleteIndexes.includes(prevIndex)));
    }
  };
  const handleDeleteSubItem = (inputIndex: number) => {
    setSubVariantItems((prev) => prev.filter((item, index) => index !== inputIndex));
    const deleteIndexes:number[] = [];
    for (let i = inputIndex; i < variantPrices.length; i += subVariantItems.length) {
      deleteIndexes.push(i);
    }
    setVariantPrices((prev) => prev
      .filter((item, prevIndex) => !deleteIndexes.includes(prevIndex)));
    setVariantStocks((prev) => prev
      .filter((item, prevIndex) => !deleteIndexes.includes(prevIndex)));
  };

  const changeIsMainVariant = (b: boolean) => {
    if (b) {
      setProductSettings({ ...productSettings, isMainVariant: true });
      if (mainVariantItems.length === 0) handleAddMainItem();
    } else {
      setProductSettings({ ...productSettings, isMainVariant: false });
    }
  };
  const changeIsSubVariant = (b: boolean) => {
    if (b) {
      setProductSettings({ ...productSettings, isSubVariant: true });
      if (subVariantItems.length === 0) setSubVariantItems([...subVariantItems, '']);
    } else {
      setProductSettings({ ...productSettings, isSubVariant: false });
    }
  };
  const handleEnableMainVariantChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    changeIsMainVariant(value === '1');
  };
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
              handleAddItem={handleAddMainItem}
              handleDeleteItem={handleDeleteMainItem}
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
              handleAddItem={handleAddSubItem}
              handleDeleteItem={handleDeleteSubItem}
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
