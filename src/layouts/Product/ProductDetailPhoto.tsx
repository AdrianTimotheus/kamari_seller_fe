/* eslint-disable react/no-array-index-key */
type props = {
  product: any,
}
export default function ProductDetailPhoto({
  product,
}:props) {
  const tempMainItems:string[] = [];
  product.product_variants.forEach((item:any) => {
    if (item.main_variant_item !== '') {
      if (!tempMainItems
        .includes(item.main_variant_item)) tempMainItems.push(item.main_variant_item);
    }
  });
  const tempSubItems:string[] = [];
  product.product_variants.forEach((item:any) => {
    if (item.sub_variant_item !== '') {
      if (!tempSubItems
        .includes(item.sub_variant_item)) tempSubItems.push(item.sub_variant_item);
    }
  });
  const tempVariantPhotos:string[] = [];
  for (let i = 0; i < tempMainItems.length; i += 1) {
    tempVariantPhotos.push(product.product_variants[i * tempSubItems.length].pic_url);
  }
  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-3 text-grey2">
          Foto Utama
        </div>
        <div className="col-12 col-lg-9 row gap-2">
          <div>
            <img src={product.thumbnail_url} alt="" className="img-product" />
          </div>
        </div>
      </div>

      {product.product_photos.length !== 0 && (
        <div className="row">
          <div className="col-12 col-lg-3 text-grey2">
            Foto Tambahan
          </div>
          <div className="col-12 col-lg-9 gap-2 d-flex flex-row flex-wrap">
            {product.product_photos.map((item:string) => {
              if (item !== '') {
                return (
                  <div>
                    <img src={item} alt="" className="img-product" />
                  </div>
                );
              }
              return '';
            })}
          </div>
        </div>
      )}

      {product.product_variants[0].main_variant !== '' && (
        <div className="row">
          <div className="col-12 col-lg-3 text-grey2">
            Foto Variasi Produk
          </div>
          <div className="col-12 col-lg-9 gap-2 d-flex flex-row flex-wrap">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  {tempMainItems.map((item, index) => (
                    <td key={`variant-photo-title-${index}`}>
                      {item}
                    </td>
                  ))}
                </tr>
                <tr>
                  {tempMainItems.map((item, index) => (
                    <td key={`variant-photo-img-${index}`}>
                      <div>
                        <img src={tempVariantPhotos[index]} alt="" className="img-product" />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
