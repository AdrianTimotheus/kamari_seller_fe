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
      </Route>
    </Routes>
  );
}

export default App;
