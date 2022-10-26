/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';

type props = {
  validationMsg: any,
  formProductInfo: any,
  handleChangeFormProductInfo: Function,
  productSettings: any,
  mainVariantTitle: string,
  subVariantTitle: string,
  mainVariantItems: string[],
  subVariantItems: string[],
  variantPrices: string[],
  setVariantPrices: Dispatch<SetStateAction<string[]>>,
  validationMsgVariantPrices: string[],
  variantStocks: string[],
  setVariantStocks: Dispatch<SetStateAction<string[]>>,
  validationMsgVariantStocks: string[],
}
export default function ProductSellingForm({
  validationMsg,
  formProductInfo,
  handleChangeFormProductInfo,
  productSettings,
  mainVariantTitle,
  subVariantTitle,
  mainVariantItems,
  subVariantItems,
  variantPrices,
  setVariantPrices,
  validationMsgVariantPrices,
  variantStocks,
  setVariantStocks,
  validationMsgVariantStocks,
}:props) {
  const [tempMainItems, setTempMainItems] = useState<string[]>([]);
  const [tempSubItems, setTempSubItems] = useState<string[]>([]);

  const handleChangeVariantPrice = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    const inputIndex = parseInt(name.split('_')[2], 10);
    setVariantPrices((prev) => prev.map((item, prevIndex) => {
      if (inputIndex === prevIndex) return value;
      return item;
    }));
  };
  const handleChangeVariantStock = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    const inputIndex = parseInt(name.split('_')[2], 10);
    setVariantStocks((prev) => prev.map((item, prevIndex) => {
      if (inputIndex === prevIndex) return value;
      return item;
    }));
  };

  useEffect(() => {
    setTempMainItems(() => {
      const temp:string[] = [];
      for (let i = 0; i < mainVariantItems.length; i += 1) {
        if (!productSettings.isSubVariant) {
          temp.push(mainVariantItems[i]);
        } else {
          for (let j = 0; j < subVariantItems.length; j += 1) {
            temp.push(mainVariantItems[i]);
          }
        }
      }
      return temp;
    });
    setTempSubItems(() => {
      const temp:string[] = [];
      for (let i = 0; i < mainVariantItems.length; i += 1) {
        for (let j = 0; j < subVariantItems.length; j += 1) {
          temp.push(subVariantItems[j]);
        }
      }
      return temp;
    });
  }, [mainVariantItems, subVariantItems]);

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
                value={formProductInfo.productPrice}
                placeholder="Harga"
                fieldName="productPrice"
                handleChange={handleChangeFormProductInfo}
                min={1000}
                validationMsg={validationMsg.productPrice}
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
                value={formProductInfo.productStock}
                placeholder="Stok"
                fieldName="productStock"
                handleChange={handleChangeFormProductInfo}
                min={1}
                validationMsg={validationMsg.productStock}
                isRequired
              />
            </div>
          </div>
        </>
      )}

      {productSettings.isMainVariant && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">{mainVariantTitle === '' ? 'Variasi 1' : mainVariantTitle}</th>
              {productSettings.isSubVariant && (
                <th scope="col">{subVariantTitle === '' ? 'Variasi 2' : subVariantTitle}</th>
              )}
              <th scope="col">Harga</th>
              <th scope="col">Stok</th>
            </tr>
          </thead>
          <tbody>
            {variantPrices.map((item, index) => (
              <tr>
                <td>
                  {tempMainItems[index]}
                </td>
                {productSettings.isSubVariant && (
                  <td>
                    {tempSubItems[index]}
                  </td>
                )}
                <td>
                  <PriceInput
                    value={variantPrices[index]}
                    placeholder="Harga"
                    fieldName={`variant_price_${index}`}
                    handleChange={handleChangeVariantPrice}
                    min={1000}
                    validationMsg={validationMsgVariantPrices[index]}
                    isRequired
                  />
                </td>
                <td>
                  <NumberInput
                    value={variantStocks[index]}
                    placeholder="Stok"
                    fieldName={`variant_stock_${index}`}
                    handleChange={handleChangeVariantStock}
                    min={0}
                    validationMsg={validationMsgVariantStocks[index]}
                    isRequired
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
