interface promoType {
  Id: number,
  Type: string,
}

interface voucherData {
  id: number,
  title: string,
  code: string,
  discount_amount: number,
  start_date: string,
  end_date: string,
  stock_left: number,
  merchant_id: number,
  promo_type_id: number,
  promo_type: promoType,
}

export default voucherData;
