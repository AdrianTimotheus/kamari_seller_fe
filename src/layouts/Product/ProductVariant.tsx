/* eslint-disable */
import { Dispatch, FormEvent, SetStateAction, Fragment } from 'react';
import TextInputWithCounter from '../../components/Form/Custom/TextInputWithCounter';
import productVariantData from '../../models/productVariantData';

type props = {
  level: string,
  handleClose: Function,
  variantTitle: string,
  setVariantTitle: Dispatch<SetStateAction<string>>,
  variantItems: any,
  setVariantItems: Dispatch<SetStateAction<any>>,
}
export default function ProductVariant({
  level,
  handleClose,
  variantTitle,
  variantItems,
  setVariantTitle,
  setVariantItems,
}:props) {
  const handleAddVariantItem = () => {
    setVariantItems([...variantItems, '']);
  };
  const handleDeleteVariantItem = (variantItem: string) => {
    // setVariantItems((prev) => prev.filter((item) => item !== variantItem));
  };
  const handleChangeTitle = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.currentTarget;
    setVariantTitle(value);
  };
  const handleChangeItem = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setVariantItems({...variantItems, 1: "test"})
  };
  return (
    <div className="product-variant">

      {level === 'sub' && (
        <div className="control">
          <button
            type="button"
            className="icon-button"
            onClick={() => handleClose(false)}
          >
            <i className="bi bi-x" />
          </button>
        </div>
      )}

      <div className="content">

        <div className="row">
          <div className="col-12 col-lg-2">
            Nama
          </div>
          <div className="row col-12 col-lg-10">
            <div className="col-11">
              <TextInputWithCounter
                placeholder="Nama variasi"
                fieldName="mainVariantTitle"
                value={variantTitle}
                maxLength={20}
                handleChange={handleChangeTitle}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-2">
            Pilihan
          </div>
          <div className="row col-12 col-lg-10">
          {variantItems.map((item: any, index: number) => (
            <Fragment key={`variant-${variantTitle}-${index + 1}`}>
              <div className="col-11 d-flex flex-column gap-2">
                <TextInputWithCounter
                  placeholder="Pilihan variasi"
                  fieldName={`${level}_variant_${index + 1}`}
                  value={item}
                  maxLength={20}
                  handleChange={handleChangeItem}
                  validationMsg="heh"
                />
                {(index === variantItems.length - 1 && variantItems.length < 3) && (
                  <button
                    type="button"
                    className="btn-dashed"
                    onClick={() => handleAddVariantItem()}
                  >
                    Tambah Pilihan
                  </button>
                )}
              </div>
              <div className="col-1">
                {index !== 0 && (
                  <button
                    type="button"
                    className="mini-icon-button mt-2"
                    onClick={() => handleDeleteVariantItem(item)}
                  >
                    <i className="bi bi-trash" />
                  </button>
                )}
              </div>
            </Fragment>
          ))}
          </div>
        </div>

      </div>

    </div>
  );
}
