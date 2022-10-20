import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Form/Basic/SubmitButton';
import Toast from '../../components/Interaction/Toast';
import FormSkeleton from '../../components/Loading/FormSkeleton';
import PageBreadcrumb from '../../components/Text/PageBreadcrumb';
import PageTitle from '../../components/Text/PageTitle';
import SectionTitle from '../../components/Text/SectionTitle';
import ProductInfoForm from '../../layouts/Form/Product/ProductInfoForm';
import ProductOtherForm from '../../layouts/Form/Product/ProductOtherForm';
import ProductPhotoForm from '../../layouts/Form/Product/ProductPhotoForm';
import ProductSellingForm from '../../layouts/Form/Product/ProductSellingForm';
import ProductVariantForm from '../../layouts/Form/Product/ProductVariantForm';
import productVariantData from '../../models/productVariantData';
import { axiosPrivate, axiosPublic } from '../../utils/API';
import { routeProductList } from '../../utils/RouteList';
import {
  validateCategory,
  validateComplementarytegory,
  validateIsHazardous,
  validateMainVariantTitle,
  validateMaxOrder,
  validateMinOrder,
  validatePhoto,
  validatePrice,
  validateProductDesc,
  validateProductName,
  validateStock,
  validateSubCategory,
  validateSubVariantTitle,
  validateVariantItems,
  validateVariantPriceItems,
  validateVariantStockItems,
  validateWeight,
} from '../../utils/FormValidations';

export default function ProductNew() {
  const navigate = useNavigate();
  const [formProductInfo, setFormProductInfo] = useState({
    productName: '',
    productDescription: '',
    productCategoryId: '',
    productSubCategoryId: '',
    productComplementaryCategoryId: '',
    productPrice: '',
    productStock: '',
    productMinOrder: '',
    productMaxOrder: '',
    productWeight: '',
    productIsHazardous: '',
    productThumbnailUrl: '',
  });
  // const [formProductPhotos, setFormProductPhotos] = useState<string[]>([
  //   'https://i.ibb.co/MBpGNGp/ab67616d00001e028d7d3584e5220d0cd406eea4.jpg',
  //   'https://awsimages.detik.net.id/community/media/visual/2021/12/21/raisa_43.png?w=700&q=90',
  //   'https://www.scienceabc.com/wp-content/uploads/2016/07/Computer-mouse.jpg',
  // ]);
  const [formProductPhotos, setFormProductPhotos] = useState<string[]>([]);
  const [formProductVariants, setFormProductVariants] = useState<productVariantData[]>([]);
  const [productSettings, setProductSettings] = useState({
    isMainVariant: false,
    isSubVariant: false,
  });
  const [mainVariantTitle, setMainVariantTitle] = useState<string>('');
  const [subVariantTitle, setSubVariantTitle] = useState<string>('');
  const [mainVariantItems, setMainVariantItems] = useState<string[]>(['']);
  const [subVariantItems, setSubVariantItems] = useState<string[]>(['']);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [complementaryCategories, setComplementaryCategories] = useState<any[]>([]);
  const [filteredSubs, setFilteredSubs] = useState<any[]>([]);
  const [filteredComplementaries, setFilteredComplementaries] = useState<any[]>([]);

  const [validationMsg, setValidationMsg] = useState({
    productName: '',
    productDescription: '',
    productCategoryId: '',
    productSubCategoryId: '',
    productComplementaryCategoryId: '',
    productPrice: '',
    productStock: '',
    productMinOrder: '',
    productMaxOrder: '',
    productWeight: '',
    productIsHazardous: '',
    productThumbnailUrl: '',
    variantMainTitle: '',
    variantSubTitle: '',
    variantMainItems: '',
    variantSubItems: '',
    variantItemsPrice: '',
    variantItemsStock: '',
  });

  useEffect(() => {
    const fetchCategories = axiosPublic.get('/categories');
    const fetchSubCategories = axiosPublic.get('/subcategories');
    const fetchComplementaryCategories = axiosPublic.get('/complementary');
    Promise.all([fetchCategories, fetchSubCategories, fetchComplementaryCategories])
      .then(([categoiesRes, subsRes, complementariesRes]) => {
        setCategories(categoiesRes.data.categories);
        setSubCategories(subsRes.data);
        setComplementaryCategories(complementariesRes.data);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChangeFormProductInfo = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setFormProductInfo({ ...formProductInfo, [name]: value });
  };

  const submitNew = () => {
    const formVariants = productSettings.isMainVariant ? formProductVariants.map((item) => ({
      main_variant: item.mainVariant,
      main_variant_item: item.mainVariantItem,
      sub_variant: item.subVariant,
      sub_variant_item: item.subVariantItem,
      stock: parseInt(item.stock, 10),
      price: parseInt(item.price, 10),
      pic_url: item.picUrl,
    })) : [{
      main_variant: '',
      main_variant_item: '',
      sub_variant: '',
      sub_variant_item: '',
      stock: parseInt(formProductInfo.productStock, 10),
      price: parseInt(formProductInfo.productPrice, 10),
      pic_url: '',
    }];

    axiosPrivate.post('/products', {
      name: formProductInfo.productName,
      description: formProductInfo.productDescription,
      minimum_order: parseInt(formProductInfo.productMinOrder, 10),
      maximum_order: parseInt(formProductInfo.productMaxOrder, 10),
      is_hazardous: formProductInfo.productIsHazardous !== '0',
      weight: parseInt(formProductInfo.productWeight, 10),
      seller_category_id: 3,
      category_id: parseInt(formProductInfo.productCategoryId, 10),
      subcategory_id: parseInt(formProductInfo.productSubCategoryId, 10),
      complementary_category_id: parseInt(formProductInfo.productComplementaryCategoryId, 10),
      thumbnail_url: formProductInfo.productThumbnailUrl,
      product_variants: formVariants,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Produk berhasil dibuat',
        });
        navigate(routeProductList);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.message,
        });
      });
  };

  const validateFormNew = () => {
    const nameValidation = validateProductName(formProductInfo.productName);
    const descValidation = validateProductDesc(formProductInfo.productDescription);
    const categoryValidation = validateCategory(formProductInfo.productCategoryId, categories);
    const subCategoryValidation = validateSubCategory(
      formProductInfo.productSubCategoryId,
      filteredSubs,
    );
    const minOrderValidation = validateMinOrder(formProductInfo.productMinOrder);
    const maxOrderValidation = validateMaxOrder(
      formProductInfo.productMinOrder,
      formProductInfo.productMaxOrder,
    );
    const weightValidation = validateWeight(formProductInfo.productWeight);
    const isHazardousValidation = validateIsHazardous(formProductInfo.productIsHazardous);
    const thumbnailValidation = validatePhoto(formProductInfo.productThumbnailUrl);

    // conditional 1: when no complementary category in system
    const complementaryCategoryValidation = filteredComplementaries.length !== 0
      ? validateComplementarytegory(formProductInfo.productComplementaryCategoryId, filteredComplementaries) : '';

    // conditional 2: when product has no variation
    const productPriceValidation = !productSettings.isMainVariant ? validatePrice(formProductInfo.productPrice, 10) : '';
    const productStockValidation = !productSettings.isMainVariant ? validateStock(formProductInfo.productStock, 0) : '';

    // conditional 3: when product has variation
    let variantMainTitleValidation = '';
    let variantSubTitleValidation = '';
    let variantMainItemsValidation = '';
    let variantSubItemsValidation = '';
    let variantItemsPriceValidation = '';
    let variantItemsStockValidation = '';
    if (productSettings.isMainVariant) {
      variantMainTitleValidation = validateMainVariantTitle(mainVariantTitle);
      variantSubTitleValidation = validateSubVariantTitle(mainVariantTitle, subVariantTitle);
      variantMainItemsValidation = validateVariantItems(mainVariantItems);
      variantSubItemsValidation = validateVariantItems(subVariantItems);
      variantItemsPriceValidation = validateVariantPriceItems(
        formProductVariants.map((item) => item.price),
      );
      variantItemsStockValidation = validateVariantStockItems(
        formProductVariants.map((item) => item.stock),
      );
    }

    setValidationMsg({
      ...validationMsg,
      productName: nameValidation,
      productDescription: descValidation,
      productCategoryId: categoryValidation,
      productSubCategoryId: subCategoryValidation,
      productComplementaryCategoryId: complementaryCategoryValidation,
      productPrice: productPriceValidation,
      productStock: productStockValidation,
      productMinOrder: minOrderValidation,
      productMaxOrder: maxOrderValidation,
      productWeight: weightValidation,
      productIsHazardous: isHazardousValidation,
      productThumbnailUrl: thumbnailValidation,
      variantMainTitle: variantMainTitleValidation,
      variantSubTitle: variantSubTitleValidation,
      variantMainItems: variantMainItemsValidation,
      variantSubItems: variantSubItemsValidation,
      variantItemsPrice: variantItemsPriceValidation,
      variantItemsStock: variantItemsStockValidation,
    });

    if (nameValidation !== ''
    || descValidation !== ''
    || categoryValidation !== ''
    || subCategoryValidation !== ''
    || complementaryCategoryValidation !== ''
    || productPriceValidation !== ''
    || productStockValidation !== ''
    || minOrderValidation !== ''
    || maxOrderValidation !== ''
    || weightValidation !== ''
    || isHazardousValidation !== ''
    || thumbnailValidation !== ''
    || variantMainTitleValidation !== ''
    || variantSubTitleValidation !== ''
    || variantMainItemsValidation !== ''
    || variantSubItemsValidation !== ''
    || variantItemsPriceValidation !== ''
    || variantItemsStockValidation !== ''
    ) return false;

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormNew()) submitNew();
  };

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Buat Produk" />
        <PageBreadcrumb main="Produk" sub="Buat Produk" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="page-content">
            <SectionTitle text="Informasi Produk" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <ProductInfoForm
                validationMsg={validationMsg}
                formProductInfo={formProductInfo}
                setFormProductInfo={setFormProductInfo}
                handleChangeFormProductInfo={handleChangeFormProductInfo}
                categories={categories}
                subCategories={subCategories}
                complementaryCategories={complementaryCategories}
                filteredSubs={filteredSubs}
                filteredComplementaries={filteredComplementaries}
                setFilteredSubs={setFilteredSubs}
                setFilteredComplementaries={setFilteredComplementaries}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Variasi Produk" />
            <ProductVariantForm
              validationMsg={validationMsg}
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
              validationMsg={validationMsg}
              formProductInfo={formProductInfo}
              handleChangeFormProductInfo={handleChangeFormProductInfo}
              productSettings={productSettings}
              mainVariantTitle={mainVariantTitle}
              subVariantTitle={subVariantTitle}
              mainVariantItems={mainVariantItems}
              subVariantItems={subVariantItems}
              formProductVariants={formProductVariants}
              setFormProductVariants={setFormProductVariants}
            />
          </div>
          <div className="page-content">
            <SectionTitle text="Foto Produk" />
            <ProductPhotoForm
              validationMsg={validationMsg}
              formProductInfo={formProductInfo}
              setFormProductInfo={setFormProductInfo}
              formProductPhotos={formProductPhotos}
              setFormProductPhotos={setFormProductPhotos}
              mainVariantItems={mainVariantItems}
              subVariantItems={subVariantItems}
              formProductVariants={formProductVariants}
              setFormProductVariants={setFormProductVariants}
              productSettings={productSettings}
            />
          </div>
          <div className="page-content">
            <SectionTitle text="Pengiriman" />
          </div>
          <div className="page-content">
            <SectionTitle text="Lainnya" />
            <ProductOtherForm
              validationMsg={validationMsg}
              formProductInfo={formProductInfo}
              handleChangeFormProductInfo={handleChangeFormProductInfo}
            />
          </div>
          <div className="page-content d-flex justify-content-end">
            <SubmitButton text="Simpan Produk" />
          </div>
        </form>
      </div>
    </div>
  );
}
