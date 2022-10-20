/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import TextArea from '../../../components/Form/Basic/TextArea';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';

type props = {
  validationMsg: any,
  formProductInfo: any,
  setFormProductInfo: Dispatch<SetStateAction<any>>,
  handleChangeFormProductInfo: Function,
  categories: any[],
  subCategories: any[],
  complementaryCategories: any[],
  filteredSubs: any[],
  filteredComplementaries: any[],
  setFilteredSubs: Dispatch<SetStateAction<any[]>>,
  setFilteredComplementaries: Dispatch<SetStateAction<any[]>>,
}
export default function ProductInfoForm({
  validationMsg,
  formProductInfo,
  setFormProductInfo,
  handleChangeFormProductInfo,
  categories,
  subCategories,
  complementaryCategories,
  filteredSubs,
  filteredComplementaries,
  setFilteredSubs,
  setFilteredComplementaries,
}:props) {
  useEffect(() => {
    setFormProductInfo({
      ...formProductInfo,
      productSubCategoryId: '',
      productComplementaryCategoryId: '',
    });
    setFilteredSubs([]);
    setFilteredSubs(subCategories.filter((item:any) => item.category_id
      === parseInt(formProductInfo.productCategoryId, 10)));
  }, [formProductInfo.productCategoryId]);

  useEffect(() => {
    setFormProductInfo({
      ...formProductInfo,
      productComplementaryCategoryId: '',
    });
    setFilteredComplementaries([]);
    setFilteredComplementaries(complementaryCategories.filter((item:any) => item.subcategory_id
      === parseInt(formProductInfo.productSubCategoryId, 10)));
  }, [formProductInfo.productSubCategoryId]);

  return (
    <div className="d-flex flex-column gap-3">

      <div className="row">
        <div className="col-12 col-lg-2">
          Nama Produk
        </div>
        <div className="col-12 col-lg-10">
          <TextInputWithCounter
            placeholder="Nama Produk"
            fieldName="productName"
            value={formProductInfo.productName}
            handleChange={handleChangeFormProductInfo}
            maxLength={255}
            validationMsg={validationMsg.productName}
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Deskripsi Produk
        </div>
        <div className="col-12 col-lg-10">
          <TextArea
            placeholder="Deskripsi Produk"
            fieldName="productDescription"
            value={formProductInfo.productDescription}
            handleChange={handleChangeFormProductInfo}
            rows={4}
            validationMsg={validationMsg.productDescription}
            isRequired
          />
        </div>
      </div>

      {categories.length !== 0 && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Kategori
          </div>
          <div className={`col-12 col-lg-10 d-flex flex-column gap-2 ${validationMsg.productCategoryId !== '' ? 'border border-danger' : ''}`}>
            <div>
              <select
                className="form-select"
                name="productCategoryId"
                value={formProductInfo.productCategoryId}
                onChange={(e) => handleChangeFormProductInfo(e)}
                required
              >
                <option value="">Kategori</option>
                {categories.map((item: any) => (
                  <option
                    key={`category-${item.id}`}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-danger">{validationMsg.productCategoryId}</span>
            </div>
          </div>
        </div>
      )}

      {filteredSubs.length !== 0 && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Sub Kategori
          </div>
          <div className={`col-12 col-lg-10 d-flex flex-column gap-2 ${validationMsg.productSubCategoryId !== '' ? 'border border-danger' : ''}`}>
            <div>
              <select
                className="form-select"
                name="productSubCategoryId"
                value={formProductInfo.productSubCategoryId}
                onChange={(e) => handleChangeFormProductInfo(e)}
                required
              >
                <option value="">Sub Kategori</option>
                {filteredSubs.map((item: any) => (
                  <option
                    key={`category-${item.id}`}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-danger">{validationMsg.productSubCategoryId}</span>
            </div>
          </div>
        </div>
      )}

      {filteredComplementaries.length !== 0 && (
        <div className="row">
          <div className="col-12 col-lg-2">
            Sub Kategori Pelengkap
          </div>
          <div className={`col-12 col-lg-10 d-flex flex-column gap-2 ${validationMsg.productComplementaryCategoryId !== '' ? 'border border-danger' : ''}`}>
            <div>
              <select
                className="form-select"
                name="productComplementaryCategoryId"
                value={formProductInfo.productComplementaryCategoryId}
                onChange={(e) => handleChangeFormProductInfo(e)}
                required
              >
                <option value="">Sub Kategori Pelengkap</option>
                {filteredComplementaries.map((item: any) => (
                  <option
                    key={`category-${item.id}`}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-danger">{validationMsg.productComplementaryCategoryId}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
