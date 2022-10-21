import { Fragment } from 'react';
import Checkbox from '../../../components/Form/Basic/Checkbox';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import PercentInput from '../../../components/Form/Custom/PercentInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';
import promoItemData from '../../../models/promoItemData';
import { formatPrice } from '../../../utils/Utils';
import AddProductModal from '../../Promotion/AddProductModal';

type props = {
  formPromotionItems: promoItemData[],
  handleChangeFormPromotionItems: Function,
  handleUpdateProductItems: Function,
  itemsValidationMsg: {
    promoType: string[],
    discount: string[],
    stock: string[],
    maxItem: string[],
  },
}

export default function PromotionItemsForm({
  formPromotionItems,
  handleChangeFormPromotionItems,
  handleUpdateProductItems,
  itemsValidationMsg,
}:props) {
  return (
    <div>
      <div>
        <AddProductModal
          formPromotionItems={formPromotionItems}
          handleUpdateProductItems={handleUpdateProductItems}
        />
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          <i className="bi bi-plus" />
          Tambah Produk
        </button>
      </div>
      {formPromotionItems.length !== 0 && (
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <Checkbox
                    value=""
                    handleChange={console.log}
                    content={undefined}
                    hideLabel
                  />
                </th>
                <th scope="col" style={{ width: 1 }}>Produk</th>
                <th scope="col">Harga</th>
                <th scope="col">Tipe Promo</th>
                <th scope="col">Diskon</th>
                <th scope="col">Stok Promosi</th>
                <th scope="col">Batas Pembelian</th>
                <th scope="col" style={{ width: 1 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {formPromotionItems.map((item, index: number) => (
                <Fragment key={`promo-items-${item.product_id}`}>
                  <tr className="promo-items__product-info">
                    <td>
                      <Checkbox
                        value=""
                        handleChange={console.log}
                        content=""
                        hideLabel
                      />
                    </td>
                    <td colSpan={6}>
                      <div>
                        <img src={item.product.thumbnail_url} alt={item.product.title} />
                        <span>{item.product.title}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        title="Hapus"
                        className="icon-mini icon-mini-red"
                        onClick={() => handleUpdateProductItems(item.product)}
                      >
                        <i className="bi bi-trash2" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td>
                      {formatPrice(item.product.price)}
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <RadioButtonNormal
                          fieldId={0}
                          fieldName={`promo_type_id#${item.product_id}`}
                          value="1"
                          content="Nominal"
                          handleChange={handleChangeFormPromotionItems}
                          currentValue={item.promo_type_id}
                        />
                        <RadioButtonNormal
                          fieldId={1}
                          fieldName={`promo_type_id#${item.product_id}`}
                          value="2"
                          content="Persentase"
                          handleChange={handleChangeFormPromotionItems}
                          currentValue={item.promo_type_id}
                        />
                      </div>
                      <span className="text-danger">{itemsValidationMsg.promoType[index]}</span>
                    </td>
                    <td>
                      <div>
                        {item.promo_type_id === '1' ? (
                          <PriceInput
                            value={item.discount_amount}
                            placeholder="Diskon"
                            fieldName={`discount_amount#${item.product_id}`}
                            handleChange={handleChangeFormPromotionItems}
                            min={1000}
                            max={1000000}
                            validationMsg={itemsValidationMsg.discount[index]}
                            isRequired
                          />
                        ) : (
                          <PercentInput
                            value={item.discount_amount}
                            placeholder="Diskon"
                            fieldName={`discount_amount#${item.product_id}`}
                            handleChange={handleChangeFormPromotionItems}
                            validationMsg={itemsValidationMsg.discount[index]}
                            isRequired
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <NumberInput
                        value={item.stock_left}
                        placeholder="Stok Promosi"
                        fieldName={`stock_left#${item.product_id}`}
                        handleChange={handleChangeFormPromotionItems}
                        min={1}
                        max={1000000}
                        validationMsg={itemsValidationMsg.stock[index]}
                        isRequired
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={item.maximum_item}
                        placeholder="Batas Pembelian"
                        fieldName={`maximum_item#${item.product_id}`}
                        handleChange={handleChangeFormPromotionItems}
                        min={1}
                        max={1000000}
                        validationMsg={itemsValidationMsg.maxItem[index]}
                        isRequired
                      />
                    </td>
                    <td />
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
