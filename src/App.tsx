import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route } from 'react-router-dom';
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
  routeCategoryList,
  routeCategoryNew,
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
} from './utils/RouteList';
import WithdrawDashboard from './views/Finance/WithdrawDashboard';
import PromotionDashboard from './views/Promotion/PromotionDashboard';
import PromotionNew from './views/Promotion/PromotionNew';
import PromotionDetail from './views/Promotion/PromotionDetail';
import CategoryDashboard from './views/Category/CategoryDashboard';
import CategoryNew from './views/Category/CategoryNew';
import ProductEdit from './views/Product/ProductEdit';
import ProductDetail from './views/Product/ProductDetail';
import OrderDashboard from './views/Order/OrderDashboard';
import PromotionEdit from './views/Promotion/PromotionEdit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SellerAdminLayout />}>

        {/* dashboard */}
        <Route index element={(<Dashboard />)} />
        <Route path={routeDashboard} element={(<Dashboard />)} />
        <Route path={routeProfile} element={(<ProfileDashboard />)} />

        {/* order */}
        <Route path={routeOrder} element={<OrderDashboard />} />

        {/* product */}
        <Route path={routeProductList} element={<ProductDashboard />} />
        <Route path={routeProductNew} element={<ProductNew />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/product/:productId/edit" element={<ProductEdit />} />
        <Route path={routeCategoryList} element={<CategoryDashboard />} />
        <Route path={routeCategoryNew} element={<CategoryNew />} />

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

      </Route>
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
  );
}

export default App;
