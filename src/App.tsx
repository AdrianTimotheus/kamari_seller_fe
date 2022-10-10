import { Routes, Route } from 'react-router-dom';
import './App.css';
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
