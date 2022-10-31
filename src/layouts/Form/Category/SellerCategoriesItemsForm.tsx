/* eslint-disable react/no-array-index-key */
import {
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../components/Interaction/Toast';
import sellerCategoryItems from '../../../models/sellerCategoryItems';
import { axiosPrivate } from '../../../utils/API';
import SellerCategoryItems from '../../../components/Category/SellerCategoryItems';
import SellerCategoriesAddProductModal from '../../Category/SellerCategoriesAddProductModal';
import { routeSellerCategories } from '../../../utils/RouteList';

type props = {
  mode: string,
  sellerCategoriesId?: number,
  formSellerCategoriesItems: sellerCategoryItems[],
  handleUpdateProductItems: Function,
}

const defaultProps = {
  sellerCategoriesId: 0,
};

export default function SellerCategoriesItemsForm({
  mode,
  sellerCategoriesId,
  formSellerCategoriesItems,
  handleUpdateProductItems,
}:props) {
  const navigate = useNavigate();
  console.log(formSellerCategoriesItems);
  const [tempSelectedProductIds, setTempSelectedProductIds] = useState<number[]>([]);
  const handleChangeTempSelectedProductIds = (product: any) => {
    if (tempSelectedProductIds.includes(product.id)) {
      setTempSelectedProductIds((prev) => prev.filter((item) => item !== product.id));
    } else {
      setTempSelectedProductIds([...tempSelectedProductIds, product.id]);
    }
  };
  const submitPostSellerCategoriesItems = () => {
    axiosPrivate.post(`/sellers/categories/${sellerCategoriesId}/items`, {
      items: tempSelectedProductIds,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Produk berhasil ditambahkan ke kategori',
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal menambah ke kategori',
        });
        throw new Error(err);
      });
  };

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (sellerCategoriesId) {
      axiosPrivate.get(`/sellers/categories/${sellerCategoriesId}`)
        .then((res) => {
          console.log(res);
          setProducts([...(res.data.items)]);
        })
        .catch(() => {
          navigate(routeSellerCategories);
        });
    }
  }, []);

  return (
    <div>
      <div>
        <SellerCategoriesAddProductModal
          // mode={mode}
          formSellerCategoriesItems={formSellerCategoriesItems}
          handleUpdateProductItems={mode === 'new' ? handleUpdateProductItems : handleChangeTempSelectedProductIds}
          submitPostSellerCategoriesItems={submitPostSellerCategoriesItems}
        />
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          <i className="bi bi-plus" />
          Tambah Produk
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nama Produk</th>
            <th scope="col">Gambar</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index: number) => (
            <SellerCategoryItems
              key={`seller-categories-form-item-form-${index}`}
              sellerCategoryItemsProps={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
SellerCategoriesItemsForm.defaultProps = defaultProps;
