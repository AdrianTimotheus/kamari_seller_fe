interface promoType {
  Id: number,
  Type: string,
}

interface product {
  id: number,
  name: string,
  thumbnail_url: string,
}

interface promoItem {
  id: number,
  promoType: promoType,
  discount_amount: number,
  maximum_item: number,
  stock_left: number,
  product: product,
}

interface promotionData {
  id: number,
  title: string,
  start_date: string,
  end_date: string,
  merchant_id: number,
  product_promo_items: promoItem[],
}

export default promotionData;
