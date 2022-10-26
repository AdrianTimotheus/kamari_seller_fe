import { FormEvent, useState } from 'react';
import Checkbox from '../../../components/Form/Basic/Checkbox';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import PercentInput from '../../../components/Form/Custom/PercentInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';

type props = {
  isAllSelected: boolean,
  handleSelectAll: Function,
  handleUpdateAll: Function,
}

export default function PromotionItemsController({
  isAllSelected,
  handleSelectAll,
  handleUpdateAll,
}:props) {
  const [formItemsController, setFormItemsController] = useState({
    promoType: '1',
    discount: '',
    stock: '',
    maxItem: '',
  });
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setFormItemsController({ ...formItemsController, [name]: value });
  };
  return (
    <div className="promotion-items-controller">
      <div className="row align-items-center">
        <div className="col-12 col-md-2">
          <Checkbox
            value="checkAll"
            handleChange={handleSelectAll}
            content="Pilih semua"
            currentState={isAllSelected}
          />
        </div>
        <div className="col-12 col-md-2 d-flex flex-column">
          <RadioButtonNormal
            fieldId={0}
            fieldName="promoType"
            value="1"
            content="Nominal"
            handleChange={handleChange}
            currentValue={formItemsController.promoType}
          />
          <RadioButtonNormal
            fieldId={1}
            fieldName="promoType"
            value="2"
            content="Persentase"
            handleChange={handleChange}
            currentValue={formItemsController.promoType}
          />
        </div>
        <div className="col-12 col-md-2">
          {formItemsController.promoType === '1' ? (
            <PriceInput
              value={formItemsController.discount}
              placeholder="Diskon"
              fieldName="discount"
              handleChange={handleChange}
              min={1000}
              max={1000000}
            />
          ) : (
            <PercentInput
              value={formItemsController.discount}
              placeholder="Diskon"
              fieldName="discount"
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="col-12 col-md-2">
          <NumberInput
            value={formItemsController.stock}
            placeholder="Stok Promosi"
            fieldName="stock"
            handleChange={handleChange}
            min={1}
            max={1000000}
          />
        </div>
        <div className="col-12 col-md-2">
          <NumberInput
            value={formItemsController.maxItem}
            placeholder="Batas Pembelian"
            fieldName="maxItem"
            handleChange={handleChange}
            min={1}
            max={1000000}
          />
        </div>
        <div className="col-12 col-md-2 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleUpdateAll(
              formItemsController.promoType,
              formItemsController.discount,
              formItemsController.stock,
              formItemsController.maxItem,
            )}
          >
            Ubah semua
          </button>
        </div>
      </div>
    </div>
  );
}
