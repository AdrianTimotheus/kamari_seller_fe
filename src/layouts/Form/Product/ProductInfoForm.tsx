import { useEffect, useState } from 'react';
import TextArea from '../../../components/Form/Basic/TextArea';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';
import Toast from '../../../components/Interaction/Toast';
import { axiosPublic } from '../../../utils/API';

/* eslint-disable */
type props = {
  mode: string,
  formProductInfo: any,
  handleChangeFormProductInfo: Function,
}
export default function ProductInfoForm({
  mode,
  formProductInfo,
  handleChangeFormProductInfo,
}:props) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axiosPublic.get('/categories')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.message,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
            isRequired
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-2">
          Kategori
        </div>
        <div className="col-12 col-lg-10 d-flex flex-row gap-2 align-items-center">

          {categories.length !== 0 && (
            <div>
              <select
                className="form-select"
                name="productCategoryId"
                value={formProductInfo.productCategoryId}
                onChange={(e) => handleChangeFormProductInfo(e)}
              >
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
          )}
          

          <div>
            <span>&#62;</span>
          </div>
          <div>
            <select
              className="form-select"
              name="productSubCategoryId"
              value={formProductInfo.productSubCategoryId}
              onChange={(e) => handleChangeFormProductInfo(e)}
            >
              <option>Sub Kategori 1</option>
              <option>Sub Kategori 2</option>
              <option>Sub Kategori 3</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}
