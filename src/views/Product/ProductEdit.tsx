/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function ProductEdit() {
  const params = useParams();
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

  const submitEdit = () => {
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
      seller_category_id: 3,
      category_id: parseInt(formProductInfo.productCategoryId, 10),
      subcategory_id: parseInt(formProductInfo.productSubCategoryId, 10),
      thumbnail_url: formProductInfo.productThumbnailUrl,
      product_variants: formVariants,
      ...(formProductInfo.productComplementaryCategoryId !== '' && { complementary_category_id: parseInt(formProductInfo.productComplementaryCategoryId, 10) }),
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Produk berhasil diedit',
        });
        navigate(routeProductList);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mengedit produk',
        });
        throw new Error(err);
      });
  };

  const validateFormEdit = () => {
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
      variantSubTitleValidation = validateSubVariantTitle(mainVariantTitle, subVariantTitle);
      variantMainItemsValidation = validateVariantItems(mainVariantItems);
      variantSubItemsValidation = validateVariantItems(subVariantItems);
      variantPricesValidations = variantPrices.map((item) => validateVariantPriceItems(item));
      variantStocksValidations = variantStocks.map((item) => validateVariantStockItems(item));
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
    ) return false;
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
    if (validateFormEdit()) submitEdit();
  };

  useEffect(() => {
    if (params.productId) {
      setDocumentTitle('Edit Produk');
      const fetchCategories = axiosPublic.get('/categories?page=1&limit=10000');
      const fetchSubCategories = axiosPublic.get('/sub-categories?page=1&limit=10000');
      const fetchComplementaryCategories = axiosPublic.get('/complementary-categories?page=1&limit=10000');
      const fetchProduct = axiosPublic.get(`/products/${params.productId}`);

      Promise.all([fetchCategories, fetchSubCategories, fetchComplementaryCategories, fetchProduct])
        .then(([categoiesRes, subsRes, complementariesRes, productRes]) => {
          setCategories(categoiesRes.data.categories);
          setSubCategories(subsRes.data.subcategories);
          setComplementaryCategories(complementariesRes.data.complementary_categories);

          const product = productRes.data;
          setFormProductInfo({
            ...formProductInfo,
            productName: product.title,
            productDescription: product.description,
            productCategoryId: product.category_id.toString(),
            productSubCategoryId: product.subcategory.id.toString(),
            productComplementaryCategoryId: product.complementary_category_id.toString(),
            productPrice: product.product_variants[0].main_variant === '' ? product.product_variants[0].price : '',
            productStock: product.product_variants[0].main_variant === '' ? product.product_variants[0].stock : '',
            productMinOrder: product.minimum_order.toString(),
            productMaxOrder: product.maximum_order.toString(),
            productWeight: product.weight.toString(),
            productIsHazardous: product.is_hazardous ? '1' : '0',
            productThumbnailUrl: product.thumbnail_url,
          });
          setProductSettings({
            ...productSettings,
            isMainVariant: product.product_variants[0].main_variant !== '',
            isSubVariant: product.product_variants[0].sub_variant !== '',
          });
          setMainVariantTitle(product.product_variants[0].main_variant);
          setSubVariantTitle(product.product_variants[0].sub_variant);

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

          setMainVariantItems(tempMainItems);
          setSubVariantItems(tempSubItems);
          setVariantPrices(() => product.product_variants
            .map((item:any) => item.price.toString()));
          setVariantStocks(() => product.product_variants
            .map((item:any) => item.stock.toString()));
          setVariantPhotos(tempVariantPhotos);
        })
        .catch(() => {
          navigate(routeProductList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate(routeProductList);
    }
  }, []);

  return (
    <div className="page-layout">
      <div>
        <PageTitle text="Edit Produk" />
        <PageBreadcrumb main="Produk" sub="Produk" />
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
            <SectionTitle text="Pengiriman" />
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
