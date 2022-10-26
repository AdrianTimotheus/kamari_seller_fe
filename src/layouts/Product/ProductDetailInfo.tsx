type props = {
  product: any,
  complementaryCategories: any[],
}
export default function ProductDetailInfo({
  product,
  complementaryCategories,
}:props) {
  const valComplementaryCategory:any = complementaryCategories
    .filter((item) => item.id === product.complementary_category_id);
  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Nama Produk
        </div>
        <div className="col-12 col-lg-9">
          {product.title}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Deskripsi Produk
        </div>
        <div className="col-12 col-lg-9">
          {product.description}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Kategori
        </div>
        <div className="col-12 col-lg-9 d-flex flex-row flex-wrap gap-2">
          <span>{product.category.name}</span>
          <span className="text-grey2">&#62;</span>
          <span>{product.subcategory.name}</span>
          {valComplementaryCategory.length !== 0 && (
            <>
              <span className="text-grey2">&#62;</span>
              <span>{valComplementaryCategory[0].name}</span>
            </>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Variasi Produk
        </div>
        <div className="col-12 col-lg-9">
          {product.product_variants[0].main_variant === '' ? (
            <span>Produk tidak memiliki variasi</span>
          ) : (
            <div>
              <span className="badge-blue">
                {product.product_variants.length}
                {' '}
                variasi
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
