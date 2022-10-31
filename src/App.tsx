import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import ProfileDashboard from './views/Profile/ProfileDashboard';
import ProductDashboard from './views/Product/ProductDashboard';
import ProductNew from './views/Product/ProductNew';
import SellerAdminLayout from './views/SellerAdminLayout';
import VoucherDashboard from './views/Voucher/VoucherDashboard';
import VoucherDetail from './views/Voucher/VoucherDetail';
import VoucherEdit from './views/Voucher/VoucherEdit';
import VoucherNew from './views/Voucher/VoucherNew';
import {
  routeDashboard,
  routeOrder,
  routeProductList,
  routeProductNew,
  routeProfile,
  routePromotionList,
  routePromotionNew,
  routeVoucherList,
  routeVoucherNew,
  routeWithdraw,
  routeSellerCategories,
  routeSellerCategoriesNew,
} from './utils/RouteList';
import WithdrawDashboard from './views/Finance/WithdrawDashboard';
import PromotionDashboard from './views/Promotion/PromotionDashboard';
import PromotionNew from './views/Promotion/PromotionNew';
import PromotionDetail from './views/Promotion/PromotionDetail';
import SellerCategories from './views/Category/SellerCategoryDashboard';
import ProductEdit from './views/Product/ProductEdit';
import ProductDetail from './views/Product/ProductDetail';
import OrderDashboard from './views/Order/OrderDashboard';
import PromotionEdit from './views/Promotion/PromotionEdit';
import OrderDetail from './views/Order/OrderDetail';
import NotFound from './views/NotFound';
import Login from './views/Account/Login';
import Logout from './views/Account/Logout';
import SellerCategoryEdit from './views/Category/SellerCategoryEdit';
import SellerCategoryNew from './views/Category/SellerCategoryNew';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<SellerAdminLayout />}>

        {/* dashboard */}
        <Route index element={(<Navigate to={routeDashboard} />)} />
        <Route path={routeDashboard} element={(<Dashboard />)} />
        <Route path={routeProfile} element={(<ProfileDashboard />)} />

        {/* order */}
        <Route path={routeOrder} element={<OrderDashboard />} />
        <Route path="order/:orderId" element={<OrderDetail />} />

        {/* product */}
        <Route path={routeProductList} element={<ProductDashboard />} />
        <Route path={routeProductNew} element={<ProductNew />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/product/:productId/edit" element={<ProductEdit />} />

        {/* voucher and promotion */}
        <Route path={routeVoucherList} element={<VoucherDashboard />} />
        <Route path={routeVoucherNew} element={<VoucherNew />} />
        <Route path="/voucher/:voucherId" element={<VoucherDetail />} />
        <Route path="/voucher/:voucherId/edit" element={<VoucherEdit />} />
        <Route path={routePromotionList} element={<PromotionDashboard />} />
        <Route path={routePromotionNew} element={<PromotionNew />} />
        <Route path="/promotion/:promotionId" element={<PromotionDetail />} />
        <Route path="/promotion/:promotionId/edit" element={<PromotionEdit />} />

        {/* finance */}
        <Route path={routeWithdraw} element={<WithdrawDashboard />} />

        {/* seller categories */}
        <Route path={routeSellerCategories} element={<SellerCategories />} />
        <Route path={routeSellerCategoriesNew} element={<SellerCategoryNew />} />
        <Route path="categories/:sellerCategoriesId/edit" element={<SellerCategoryEdit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
