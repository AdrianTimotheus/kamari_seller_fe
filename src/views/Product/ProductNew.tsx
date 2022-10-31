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
import { setDocumentTitle } from '../../utils/Utils';

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
  const [formProductPhotos, setFormProductPhotos] = useState<string[]>([]);
  const [productSettings, setProductSettings] = useState({
    isMainVariant: false,
    isSubVariant: false,
  });
  const [mainVariantTitle, setMainVariantTitle] = useState<string>('');
  const [subVariantTitle, setSubVariantTitle] = useState<string>('');
  const [mainVariantItems, setMainVariantItems] = useState<string[]>([]);
  const [subVariantItems, setSubVariantItems] = useState<string[]>([]);
  const [variantPrices, setVariantPrices] = useState<string[]>([]);
  const [variantStocks, setVariantStocks] = useState<string[]>([]);
  const [variantPhotos, setVariantPhotos] = useState<string[]>([]);

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
  });
  const [validationMsgVariantPrices, setValidationMsgVariantPrices] = useState<string[]>([]);
  const [validationMsgVariantStocks, setValidationMsgVariantStocks] = useState<string[]>([]);

  const handleChangeFormProductInfo = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setFormProductInfo({ ...formProductInfo, [name]: value });
  };

  const submitNew = () => {
    const tempMainItems:string[] = [];
    for (let i = 0; i < mainVariantItems.length; i += 1) {
      if (!productSettings.isSubVariant) {
        tempMainItems.push(mainVariantItems[i]);
      } else {
        for (let j = 0; j < subVariantItems.length; j += 1) {
          tempMainItems.push(mainVariantItems[i]);
        }
      }
    }
    const tempSubItems:string[] = [];
    for (let i = 0; i < mainVariantItems.length; i += 1) {
      for (let j = 0; j < subVariantItems.length; j += 1) {
        tempSubItems.push(subVariantItems[j]);
      }
    }
    const tempVariantPhotos:string[] = [];
    for (let i = 0; i < variantPhotos.length; i += 1) {
      if (!productSettings.isSubVariant) {
        tempVariantPhotos.push(variantPhotos[i]);
      } else {
        for (let j = 0; j < subVariantItems.length; j += 1) {
          tempVariantPhotos.push(variantPhotos[i]);
        }
      }
    }
    const tempVariants:any[] = variantPrices
      .map((mapItem, index) => ({
        main_variant: mainVariantTitle,
        main_variant_item: tempMainItems[index] || '',
        sub_variant: subVariantTitle,
        sub_variant_item: tempSubItems[index] || '',
        price: parseInt(variantPrices[index], 10),
        stock: parseInt(variantStocks[index], 10),
        pic_url: tempVariantPhotos[index] || '',
      }));
    const formVariants = productSettings.isMainVariant ? tempVariants : [{
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
      category_id: parseInt(formProductInfo.productCategoryId, 10),
      subcategory_id: parseInt(formProductInfo.productSubCategoryId, 10),
      thumbnail_url: formProductInfo.productThumbnailUrl,
      product_variants: formVariants,
      ...(formProductPhotos.length !== 0 && { product_photos: formProductPhotos }),
      ...(formProductInfo.productComplementaryCategoryId !== '' && { complementary_category_id: parseInt(formProductInfo.productComplementaryCategoryId, 10) }),
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
          title: 'Gagal membuat produk',
        });
        throw new Error(err);
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
    let variantPricesValidations:string[] = [];
    let variantStocksValidations:string[] = [];
    if (productSettings.isMainVariant) {
      variantMainTitleValidation = validateMainVariantTitle(mainVariantTitle);
      variantMainItemsValidation = validateVariantItems(mainVariantItems);
      variantPricesValidations = variantPrices.map((item) => validateVariantPriceItems(item));
      variantStocksValidations = variantStocks.map((item) => validateVariantStockItems(item));
    }
    if (productSettings.isSubVariant) {
      variantSubTitleValidation = validateSubVariantTitle(mainVariantTitle, subVariantTitle);
      variantSubItemsValidation = validateVariantItems(subVariantItems);
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
    });
    setValidationMsgVariantPrices(variantPricesValidations);
    setValidationMsgVariantStocks(variantStocksValidations);

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
    ) {
      return false;
    }
    for (let i = 0; i < variantPricesValidations.length; i += 1) {
      if (variantPricesValidations[i] !== '') return false;
    }
    for (let i = 0; i < variantStocksValidations.length; i += 1) {
      if (variantStocksValidations[i] !== '') return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFormNew()) {
      submitNew();
    } else {
      console.log('Gagal di validasi');
    }
  };

  useEffect(() => {
    setDocumentTitle('Buat Produk');
    const fetchCategories = axiosPublic.get('/categories?page=1&limit=10000');
    const fetchSubCategories = axiosPublic.get('/sub-categories?page=1&limit=10000');
    const fetchComplementaryCategories = axiosPublic.get('/complementary-categories?page=1&limit=10000');
    Promise.all([fetchCategories, fetchSubCategories, fetchComplementaryCategories])
      .then(([categoiesRes, subsRes, complementariesRes]) => {
        setCategories(categoiesRes.data.categories);
        setSubCategories(subsRes.data.subcategories);
        setComplementaryCategories(complementariesRes.data.complementary_categories);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Terdapat masalah koneksi',
        });
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            {isLoading ? (
              <FormSkeleton />
            ) : (
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
                variantPrices={variantPrices}
                setVariantPrices={setVariantPrices}
                variantStocks={variantStocks}
                setVariantStocks={setVariantStocks}
                variantPhotos={variantPhotos}
                setVariantPhotos={setVariantPhotos}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Informasi Penjualan" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <ProductSellingForm
                validationMsg={validationMsg}
                formProductInfo={formProductInfo}
                handleChangeFormProductInfo={handleChangeFormProductInfo}
                productSettings={productSettings}
                mainVariantTitle={mainVariantTitle}
                subVariantTitle={subVariantTitle}
                mainVariantItems={mainVariantItems}
                subVariantItems={subVariantItems}
                variantPrices={variantPrices}
                setVariantPrices={setVariantPrices}
                validationMsgVariantPrices={validationMsgVariantPrices}
                variantStocks={variantStocks}
                setVariantStocks={setVariantStocks}
                validationMsgVariantStocks={validationMsgVariantStocks}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Foto Produk" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <ProductPhotoForm
                productSettings={productSettings}
                validationMsg={validationMsg}
                formProductInfo={formProductInfo}
                setFormProductInfo={setFormProductInfo}
                formProductPhotos={formProductPhotos}
                setFormProductPhotos={setFormProductPhotos}
                mainVariantItems={mainVariantItems}
                variantPhotos={variantPhotos}
                setVariantPhotos={setVariantPhotos}
              />
            )}
          </div>
          <div className="page-content">
            <SectionTitle text="Lainnya" />
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <ProductOtherForm
                validationMsg={validationMsg}
                formProductInfo={formProductInfo}
                handleChangeFormProductInfo={handleChangeFormProductInfo}
              />
            )}
          </div>
          <div className="page-content d-flex justify-content-end">
            <SubmitButton text="Simpan Produk" />
          </div>
        </form>
      </div>
    </div>
  );
}
