import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/context/Cart';

import Hero from './components/Hero'
import LoginBuyer from './components/authentication/LoginBuyer';
import LoginFarmer from './components/authentication/LoginFarmer';
import BuyerSignup from './components/authentication/BuyerSignup';
import FarmerSignup from './components/authentication/FarmerSignup';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';
import Dashboard from './components/FarmerUI/Dashboard'
import Marketplace from './components/BuyerUI/Marketplace';
import AddProduct from './components/FarmerUI/AddProduct';
import Cart from './components/BuyerUI/Cart';
import UserProfile from './components/BuyerUI/UserProfile';
import Products from './components/FarmerUI/Products';
import Payments from './components/FarmerUI/Payments';
import Orders from './components/FarmerUI/Orders';
import Newsletter from './components/FarmerUI/Newsletter';
import Analytics from './components/FarmerUI/Analytics';
import ComingSoon from './components/context/ComingSoon';
import Checkout from './components/BuyerUI/Checkout';
import SuccessPage from './components/BuyerUI/SuccessPage';
import UserOrders from './components/BuyerUI/UserOrders';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={< Hero/>} />
          <Route path='/login/buyer' element={<LoginBuyer />} />
          <Route path='/login/farmer' element={<LoginFarmer />} />
          <Route path='/signup/buyer' element={<BuyerSignup />} />
          <Route path='/signup/farmer' element={<FarmerSignup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} /> 
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/marketplace' element={<Marketplace />} />
          <Route path='/products/add' element={<AddProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/products' element={<Products />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/newsletter' element={<Newsletter />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/comingsoon' element={<ComingSoon />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/user_orders' element={<UserOrders />} />
        </Routes>
        <ToastContainer />
      </Router>
    </CartProvider>
  );
}

export default App;