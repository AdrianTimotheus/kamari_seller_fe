import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import ProfileDashboard from './views/Dashboard/ProfileDashboard';
import ProductDashboard from './views/Product/ProductDashboard';
import ProductNew from './views/Product/ProductNew';
import SellerAdminLayout from './views/SellerAdminLayout';
import VoucherDashboard from './views/Voucher/VoucherDashboard';
import VoucherDetail from './views/Voucher/VoucherDetail';
import VoucherEdit from './views/Voucher/VoucherEdit';
import VoucherNew from './views/Voucher/VoucherNew';
import {
  routeDashboard,
  routeProductList,
  routeProductNew,
  routeProfile,
  routeVoucherList,
  routeVoucherNew,
  routeWithdraw,
} from './utils/RouteList';
import WithdrawDashboard from './views/Finance/WithdrawDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SellerAdminLayout />}>

        {/* dashboard */}
        <Route index element={(<Dashboard />)} />
        <Route path={routeDashboard} element={(<Dashboard />)} />
        <Route path={routeProfile} element={(<ProfileDashboard />)} />

        {/* shipment */}

        {/* product */}
        <Route path={routeProductList} element={<ProductDashboard />} />
        <Route path={routeProductNew} element={<ProductNew />} />

        {/* voucher and promotion */}
        <Route path={routeVoucherList} element={<VoucherDashboard />} />
        <Route path={routeVoucherNew} element={<VoucherNew />} />
        <Route path="/voucher/:voucherId" element={<VoucherDetail />} />
        <Route path="/voucher/:voucherId/edit" element={<VoucherEdit />} />

        {/* finance */}
        <Route path={routeWithdraw} element={<WithdrawDashboard />} />

      </Route>
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
  );
}

export default App;
