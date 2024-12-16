import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
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
      </Routes>
      </Router>
    </>
  );
}

export default App;
