type props = {
  product: any,
}
export default function ProductDetailOther({
  product,
}:props) {
  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Minimum Pemesanan
        </div>
        <div className="col-12 col-lg-9">
          {product.minimum_order}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Maksimum Pemesanan
        </div>
        <div className="col-12 col-lg-9">
          {product.maximum_order}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Berat (gr)
        </div>
        <div className="col-12 col-lg-9">
          {product.weight}
          {' '}
          gr
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Produk Berbahaya
        </div>
        <div className="col-12 col-lg-9">
          {!product.is_harzardous ? 'Tidak'
            : 'Mengandung baterai/magnet/cairan/bahan mudah terbakar'}
        </div>
      </div>

    </div>
  );
}
