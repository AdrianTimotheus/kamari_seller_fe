interface buyerData {
  name: string,
  pic_url: string,
}
interface courierData {
  name: string,
}
interface itemData {
  name: string,
  thumbnail_url: string,
  quantity: number,
  total_price: number,
  courier: courierData,
  address: string,
}
interface orderData {
  id: number,
  order_number: string,
  status: string,
  buyer: buyerData,
  items: itemData[],
}

export default orderData;
