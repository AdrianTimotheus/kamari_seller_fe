/* eslint-disable */
import { FormEvent, useEffect, useState } from 'react';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import ProductInfoForm from '../../layouts/Form/Product/ProductInfoForm';
import ProductOtherForm from '../../layouts/Form/Product/ProductOtherForm';
import ProductPhotoForm from '../../layouts/Form/Product/ProductPhotoForm';
import ProductSellingForm from '../../layouts/Form/Product/ProductSellingForm';
import ProductVariantForm from '../../layouts/Form/Product/ProductVariantForm';

export default function ProductNew() {
  const [formProductInfo, setFormProductInfo] = useState({
    productName: '',
    productDescription: '',
    productCategoryId: '',
    productSubCategoryId: '',
    productPrice: '',
    productStock: '',
    productWeight: '',
    productIsHazardous: '',
    productThumbnailUrl: 'https://awsimages.detik.net.id/community/media/visual/2021/12/21/raisa_43.png?w=700&q=90',
  });
  const [formProductPhotos, setFormProductPhotos] = useState<string[]>([
    'https://i.ibb.co/MBpGNGp/ab67616d00001e028d7d3584e5220d0cd406eea4.jpg',
    'https://awsimages.detik.net.id/community/media/visual/2021/12/21/raisa_43.png?w=700&q=90',
    'https://www.scienceabc.com/wp-content/uploads/2016/07/Computer-mouse.jpg',
  ]);
  const [formProductVariants, setFormProductVariants] = useState([{
    mainVariant: '',
    mainVariantItem: '',
    subVariant: '',
    subVariantItem: '',
    stock: '',
    picUrl: '',
  }]);
  const [productSettings, setProductSettings] = useState({
    isMainVariant: false,
    isSubVariant: false,
  });
  const [mainVariantTitle, setMainVariantTitle] = useState<string>('');
  const [subVariantTitle, setSubVariantTitle] = useState<string>('');
  const [mainVariantItems, setMainVariantItems] = useState<any>();
  const [subVariantItems, setSubVariantItems] = useState<any>();

  const handleChangeFormProductInfo = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setFormProductInfo({ ...formProductInfo, [name]: value });
  };
  
  useEffect(() => {
    console.log(formProductInfo);
  }, [formProductInfo]);
  useEffect(() => {
    console.log(formProductPhotos);
  }, [formProductPhotos]);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Produk" />
        <PageBreadcrumb main="Produk" sub="Buat Produk" />
      </div>
      <div>
        <div className="page-content">
          <SectionTitle text="Informasi Produk" />
          <ProductInfoForm
            mode="new"
            formProductInfo={formProductInfo}
            handleChangeFormProductInfo={handleChangeFormProductInfo}
          />
        </div>
        <div className="page-content">
          <SectionTitle text="Variasi Produk" />
          <ProductVariantForm
            mode="new"
            productSettings={productSettings}
            setProductSettings={setProductSettings}
            mainVariantTitle={mainVariantTitle}
            setMainVariantTitle={setMainVariantTitle}
            subVariantTitle={subVariantTitle}
            setSubVariantTitle={setSubVariantTitle}
            mainVariantItems={mainVariantItems}
            setMainVariantItems={setMainVariantItems}
            subVariantItems={subVariantItems}
            setSubVariantItems={setSubVariantItems}
          />
        </div>
        <div className="page-content">
          <SectionTitle text="Informasi Penjualan" />
          <ProductSellingForm
            mode="new"
            productSettings={productSettings}
          />
        </div>
        <div className="page-content">
          <SectionTitle text="Foto Produk" />
          <ProductPhotoForm
            mode="new"
            formProductInfo={formProductInfo}
            setFormProductInfo={setFormProductInfo}
            formProductPhotos={formProductPhotos}
            setFormProductPhotos={setFormProductPhotos}
          />
        </div>
        <div className="page-content">
          <SectionTitle text="Pengiriman" />
        </div>
        <div className="page-content">
          <SectionTitle text="Lainnya" />
          <ProductOtherForm
            mode="new"
            formProductInfo={formProductInfo}
            handleChangeFormProductInfo={handleChangeFormProductInfo}
          />
        </div>
        <div className="page-content d-flex justify-content-end">
          <SubmitButton text="Simpan Produk" />
        </div>
      </div>
    </div>
  );
}
