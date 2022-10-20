/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ImageUploader from '../../../components/Form/Custom/ImageUploader';
import ImageUploaderSkeleton from '../../../components/Loading/ImageUploaderSkeleton';
import productVariantData from '../../../models/productVariantData';
import { maxProductPhotos } from '../../../utils/Values';

type props = {
  validationMsg: any,
  formProductInfo: any,
  setFormProductInfo: Dispatch<SetStateAction<any>>,
  formProductPhotos: string[],
  setFormProductPhotos: Dispatch<SetStateAction<string[]>>,
  mainVariantItems: string[],
  subVariantItems: string[],
  formProductVariants: productVariantData[]
  setFormProductVariants: Dispatch<SetStateAction<productVariantData[]>>,
  productSettings: any,
}

export default function ProductPhotoForm({
  validationMsg,
  formProductInfo,
  setFormProductInfo,
  formProductPhotos,
  setFormProductPhotos,
  mainVariantItems,
  subVariantItems,
  formProductVariants,
  setFormProductVariants,
  productSettings,
}:props) {
  const [isProcessing, setIsProcessing] = useState<string>('');

  const handleChangeThumbnailPhoto = (fieldId: string, imgUrl: string) => {
    setIsProcessing('thumbnail-photo');
    setFormProductInfo({ ...formProductInfo, productThumbnailUrl: imgUrl });
  };
  const handleDeleteThumbnailPhoto = (fieldId: string) => {
    setIsProcessing('thumbnail-photo');
    setFormProductInfo({ ...formProductInfo, productThumbnailUrl: '' });
  };
  const handleChangeProductPhotos = (fieldId: string, imgUrl: string) => {
    setIsProcessing('product-photos');
    setFormProductPhotos([...formProductPhotos, imgUrl]);
  };
  const handleDeleteProductPhotos = (fieldId: string) => {
    setIsProcessing('product-photos');
    const inputIndex = parseInt(fieldId.split('_')[2], 10);
    setFormProductPhotos((prev) => prev.filter((item, prevIndex) => prevIndex !== inputIndex));
  };
  const handleChangeVariantPhoto = (fieldId: string, imgUrl: string) => {
    setIsProcessing('variant-photo');
    const inputIndex = parseInt(fieldId.split('_')[2], 10);
    if (productSettings.isSubVariant) {
      setFormProductVariants((prev) => {
        const temp = prev.map((item, prevIndex) => {
          if (inputIndex === Math.floor(prevIndex / subVariantItems.length)) {
            return {
              mainVariant: item.mainVariant,
              mainVariantItem: item.mainVariantItem,
              subVariant: item.subVariant,
              subVariantItem: item.subVariantItem,
              price: item.price,
              stock: item.stock,
              picUrl: imgUrl,
            };
          }
          return item;
        });
        return temp;
      });
    } else {
      setFormProductVariants((prev) => {
        const temp = prev.map((item, prevIndex) => {
          if (inputIndex === prevIndex) {
            return {
              mainVariant: item.mainVariant,
              mainVariantItem: item.mainVariantItem,
              subVariant: item.subVariant,
              subVariantItem: item.subVariantItem,
              price: item.price,
              stock: item.stock,
              picUrl: imgUrl,
            };
          }
          return item;
        });
        return temp;
      });
    }
  };
  const handleDeleteVariantPhoto = (fieldId: string) => {
    setIsProcessing('variant-photo');
    const inputIndex = parseInt(fieldId.split('_')[2], 10);
    if (productSettings.isSubVariant) {
      setFormProductVariants((prev) => {
        const temp = prev.map((item, prevIndex) => {
          if (inputIndex === Math.floor(prevIndex / subVariantItems.length)) {
            return {
              mainVariant: item.mainVariant,
              mainVariantItem: item.mainVariantItem,
              subVariant: item.subVariant,
              subVariantItem: item.subVariantItem,
              price: item.price,
              stock: item.stock,
              picUrl: '',
            };
          }
          return item;
        });
        return temp;
      });
    } else {
      setFormProductVariants((prev) => {
        const temp = prev.map((item, prevIndex) => {
          if (prevIndex === inputIndex) {
            return {
              mainVariant: item.mainVariant,
              mainVariantItem: item.mainVariantItem,
              subVariant: item.subVariant,
              subVariantItem: item.subVariantItem,
              price: item.price,
              stock: item.stock,
              picUrl: '',
            };
          }
          return item;
        });
        return temp;
      });
    }
  };

  useEffect(() => {
    setIsProcessing('');
  }, [formProductInfo.productThumbnailUrl, formProductPhotos, formProductVariants]);

  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-2">
          Foto Utama
        </div>
        <div className="col-12 col-lg-10 row gap-2">
          {isProcessing === 'thumbnail-photo' ? (
            <div><ImageUploaderSkeleton /></div>
          ) : (
            <div>
              <ImageUploader
                fieldId="thumbnail_photo_0"
                value={formProductInfo.productThumbnailUrl}
                handleChange={handleChangeThumbnailPhoto}
                handleDelete={handleDeleteThumbnailPhoto}
                validationMsg={validationMsg.productThumbnailUrl}
                isRequired
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Foto Tambahan
        </div>
        <div className="col-12 col-lg-10 gap-2 d-flex flex-row flex-wrap">
          {isProcessing === 'product-photos' ? (
            <>
              <div><ImageUploaderSkeleton /></div>
              <div><ImageUploaderSkeleton /></div>
              <div><ImageUploaderSkeleton /></div>
            </>
          ) : (
            <>
              {formProductPhotos.map((item, index) => (
                <div key={`product-photos-wrap-${index}`}>
                  <ImageUploader
                    key={`product_photos_${index}`}
                    fieldId={`product_photos_${index}`}
                    value={item}
                    handleChange={handleChangeProductPhotos}
                    handleDelete={handleDeleteProductPhotos}
                  />
                </div>
              ))}
              {formProductPhotos.length < maxProductPhotos && (
              <div>
                <ImageUploader
                  key={`product_photos_${formProductPhotos.length}`}
                  fieldId={`product_photos_${formProductPhotos.length}`}
                  value=""
                  handleChange={handleChangeProductPhotos}
                  handleDelete={handleDeleteProductPhotos}
                />
              </div>
              )}
            </>
          )}
        </div>
      </div>

      {productSettings.isMainVariant && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Foto Variasi Produk
          </div>
          <div className="col-12 col-lg-10 gap-2 d-flex flex-row flex-wrap">
            {isProcessing === 'variant-photo' ? (
              <>
                <div><ImageUploaderSkeleton /></div>
                <div><ImageUploaderSkeleton /></div>
                <div><ImageUploaderSkeleton /></div>
              </>
            ) : (
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    {mainVariantItems.map((item, index) => (
                      <td key={`variant-photo-title-${index}`}>
                        {item}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {mainVariantItems.map((item, index) => {
                      let val = '';
                      if (productSettings.isSubVariant) {
                        if (formProductVariants[subVariantItems.length * index]) {
                          val = formProductVariants[subVariantItems.length * index].picUrl;
                        }
                      } else if (formProductVariants[index]) {
                        val = formProductVariants[index].picUrl;
                      }
                      return (
                        <td key={`variant-photo-img-${index}`}>
                          <ImageUploader
                            key={`variant_photo_${index}`}
                            fieldId={`variant_photo_${index}`}
                            value={val}
                            handleChange={handleChangeVariantPhoto}
                            handleDelete={handleDeleteVariantPhoto}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
