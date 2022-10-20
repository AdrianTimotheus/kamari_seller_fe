/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';
import productVariantData from '../../../models/productVariantData';

type props = {
  validationMsg: any,
  formProductInfo: any,
  handleChangeFormProductInfo: Function,
  productSettings: any,
  mainVariantTitle: string,
  subVariantTitle: string,
  mainVariantItems: string[],
  subVariantItems: string[],
  formProductVariants: productVariantData[]
  setFormProductVariants: Dispatch<SetStateAction<productVariantData[]>>,
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
  formProductVariants,
  setFormProductVariants,
}:props) {
  // fungsi untuk mengisi state formProductVariants dari mainVariantItems (max 3 data)
  const initVariantsWithMainItems = () => {
    setFormProductVariants(() => mainVariantItems.map((item) => ({
      mainVariant: mainVariantTitle,
      mainVariantItem: item,
      subVariant: subVariantTitle,
      subVariantItem: '',
      price: '',
      stock: '',
      picUrl: '',
    })));
  };

  useEffect(() => {
    // apabila perubahan data di mainVariantItems terjadi saat subVariantItems belum diisi
    if (formProductVariants.length <= mainVariantItems.length) {
      initVariantsWithMainItems();
    } else { // apabila merubah mainVariantItems saat subVariantItems sudah diisi
      setFormProductVariants((prev) => {
        const temp = prev.map((item, prevIndex) => {
          if (item.mainVariantItem
            !== mainVariantItems[Math.floor(prevIndex / subVariantItems.length)]) {
            return {
              mainVariant: item.mainVariant,
              mainVariantItem: mainVariantItems[Math.floor(prevIndex / subVariantItems.length)],
              subVariant: item.subVariant,
              subVariantItem: item.subVariantItem,
              price: item.price,
              stock: item.stock,
              picUrl: item.picUrl,
            };
          }
          return item;
        });
        return temp;
      });
    }
  }, [mainVariantItems]);

  useEffect(() => {
    setFormProductVariants(() => {
      const temp:productVariantData[] = [];
      mainVariantItems.forEach((main) => {
        subVariantItems.forEach((sub) => {
          temp.push({
            mainVariant: mainVariantTitle,
            mainVariantItem: main,
            subVariant: subVariantTitle,
            subVariantItem: sub,
            price: '',
            stock: '',
            picUrl: '',
          });
        });
      });
      return temp;
    });
  }, [subVariantItems]);

  // apabila user ubah state isSubVariant dari true menjadi false
  useEffect(() => {
    if (!productSettings.isSubVariant) initVariantsWithMainItems();
  }, [productSettings.isSubVariant]);

  // mutate title semua variantdata
  useEffect(() => {
    setFormProductVariants((prev) => prev.map((item) => ({
      mainVariant: mainVariantTitle,
      mainVariantItem: item.mainVariant,
      subVariant: subVariantTitle,
      subVariantItem: item.subVariantItem,
      price: item.price,
      stock: item.stock,
      picUrl: item.picUrl,
    })));
  }, [mainVariantTitle, subVariantTitle]);

  const handleChangeVariantPrice = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    const inputIndex = parseInt(name.split('_')[2], 10);
    setFormProductVariants((prev) => {
      const temp = prev.map((item, prevIndex) => {
        if (inputIndex === prevIndex) {
          return {
            ...item,
            price: value,
          };
        }
        return item;
      });
      return temp;
    });
  };
  const handleChangeVariantStock = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    const inputIndex = parseInt(name.split('_')[2], 10);
    setFormProductVariants((prev) => {
      const temp = prev.map((item, prevIndex) => {
        if (inputIndex === prevIndex) {
          return {
            ...item,
            stock: value,
          };
        }
        return item;
      });
      return temp;
    });
  };

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
                max={1000000}
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
                max={1000000}
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
            {formProductVariants.map((item, index) => (
              <tr>
                <td>
                  {item.mainVariantItem}
                </td>
                {productSettings.isSubVariant && (
                  <td>
                    {item.subVariantItem}
                  </td>
                )}
                <td>
                  <PriceInput
                    value={item.price}
                    placeholder="Harga"
                    fieldName={`variant_price_${index}`}
                    handleChange={handleChangeVariantPrice}
                    min={1000}
                    max={1000000}
                    validationMsg={validationMsg.variantItemsPrice}
                    isRequired
                  />
                </td>
                <td>
                  <NumberInput
                    value={item.stock}
                    placeholder="Stok"
                    fieldName={`variant_stock_${index}`}
                    handleChange={handleChangeVariantStock}
                    min={0}
                    max={1000000}
                    validationMsg={validationMsg.variantItemsStock}
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
