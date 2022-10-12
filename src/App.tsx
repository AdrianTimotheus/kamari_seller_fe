import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SellerAdminLayout from './views/SellerAdminLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SellerAdminLayout />}>
        <Route index element={(<Home />)} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/myproduct/all" element={<Home />} />
        <Route path="/myproduct/new" element={<Home />} />
        <Route path="/myvoucher/all" element={<Home />} />
        <Route path="/myvoucher/new" element={<Home />} />
        <Route path="/mypromotion/all" element={<Home />} />
        <Route path="/mypromotion/new" element={<Home />} />
        <Route path="/shipment" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
