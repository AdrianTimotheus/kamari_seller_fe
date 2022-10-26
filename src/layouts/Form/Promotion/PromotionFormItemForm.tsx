import Checkbox from '../../../components/Form/Basic/Checkbox';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import PercentInput from '../../../components/Form/Custom/PercentInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';
import { formatPrice } from '../../../utils/Utils';

type props = {
  index: number,
  item: any,
  handleUpdateProductItems: Function,
  handleChangeFormPromotionItems: Function,
  itemsValidationMsg: {
    promoType: string[],
    discount: string[],
    stock: string[],
    maxItem: string[],
  },
  checkedProductIds: number[],
  handleChangeCheckedProductId: Function,
}

export default function PromotionFormItemForm({
  index,
  item,
  handleUpdateProductItems,
  handleChangeFormPromotionItems,
  itemsValidationMsg,
  checkedProductIds,
  handleChangeCheckedProductId,
}:props) {
  let price = 0;
  if (item.price) price = item.price;
  if (item.product) {
    if (item.product.price) {
      price = item.product.price;
    } else if (item.product.ProductVariants) {
      const priceRange = item.product.ProductVariants
        .map((mapItem:any) => mapItem.price)
        .sort((a: number, b: number) => a - b);
      [price] = priceRange;
    }
  }
  return (
    <div className="promo-form-item">
      <div>
        <div>
          <div>
            <Checkbox
              value={item.product_id}
              handleChange={handleChangeCheckedProductId}
              content=""
              currentState={checkedProductIds.includes(item.product_id)}
              hideLabel
            />
            <img src={item.product.thumbnail_url} alt={item.product.title} />
          </div>
          <span>{item.product.title || item.product.name}</span>
        </div>
        <button
          type="button"
          title="Hapus"
          className="icon-mini icon-mini-red"
          onClick={() => handleUpdateProductItems(item.product)}
        >
          <i className="bi bi-trash2" />
        </button>
      </div>
      <div>

        <table className="table table-borderless m-0 w-100">
          <tbody>
            <tr>
              <td>
                <span className="text-grey2">Harga Produk</span>
              </td>
              <td>
                {formatPrice(price)}
              </td>
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Tipe Promo</span>
              </td>
              <td>
                <div className="d-flex flex-row gap-3">
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
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Diskon</span>
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
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Stok Promosi</span>
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
            </tr>
            <tr>
              <td>
                <span className="text-grey2">Batas Pembelian</span>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
