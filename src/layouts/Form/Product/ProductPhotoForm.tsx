import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ImageUploader from '../../../components/Form/Custom/ImageUploader';
import ImageUploaderSkeleton from '../../../components/Loading/ImageUploaderSkeleton';
import { maxProductPhotos } from '../../../utils/Values';

/* eslint-disable */
type props = {
  mode: string,
  formProductInfo: any,
  setFormProductInfo: Dispatch<SetStateAction<any>>,
  formProductPhotos: string[],
  setFormProductPhotos: Dispatch<SetStateAction<string[]>>,
}

export default function ProductPhotoForm({
  mode,
  formProductInfo,
  setFormProductInfo,
  formProductPhotos,
  setFormProductPhotos,
}:props) {
  const [isProcessing, setIsProcessing] = useState<string>('');

  const handleChangeThumbnailPhoto = (imgUrl: string) => {
    setFormProductInfo({ ...formProductInfo, productThumbnailUrl: imgUrl });
  };
  const handleDeleteThumbnailPhoto = (imgUrl: string) => {
    setIsProcessing('thumbnail-photo');
    setFormProductInfo({ ...formProductInfo, productThumbnailUrl: '' });
  };
  const handleChangeProductPhotos = (imgUrl: string) => {
    setFormProductPhotos([...formProductPhotos, imgUrl])
  };
  const handleDeleteProductPhotos = (imgUrl: string) => {
    setIsProcessing('product-photos');
    setFormProductPhotos((prev) => prev.filter((item) => item !== imgUrl));
  };

  useEffect(() => {
    setIsProcessing('');
  }, [formProductInfo.productThumbnailUrl, formProductPhotos]);
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
                id="thumbnail_photo"
                value={formProductInfo.productThumbnailUrl}
                handleChange={handleChangeThumbnailPhoto}
                handleDelete={handleDeleteThumbnailPhoto}
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
                  id={`product_photos_${index}`}
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
                  id={`product_photos_${formProductPhotos.length}`}
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

    </div>
  )
}
