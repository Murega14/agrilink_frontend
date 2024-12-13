import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero'
import LoginBuyer from './components/authentication/LoginBuyer';
import LoginFarmer from './components/authentication/LoginFarmer';
import BuyerSignup from './components/authentication/BuyerSignup';
import FarmerSignup from './components/authentication/FarmerSignup';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';

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
      </Routes>
      </Router>
    </>
  );
}

export default App;
