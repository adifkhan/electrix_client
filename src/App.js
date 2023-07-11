import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Header from './Shared/Header/Header';
import Login from './Pages/LogIn/Login';
import Footer from './Shared/Footer/Footer';
import SignUp from './Pages/LogIn/SignUp';
import Products from './Pages/Products/Products';
import CheckOut from './Pages/CheckOut/CheckOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './Pages/Products/AddProduct/AddProduct';
import UserProfile from './Pages/UserProfile/UserProfile';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProducts from './Pages/Dashboard/MyProducts/MyProducts';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import ResetPass from './Pages/LogIn/ResetPass';
import Payment from './Pages/Payment/Payment';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';

function App() {
  return (
    <div className='mx-auto max-w-[1535px]'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='checkout' element={<CheckOut />} />
        <Route path='payment' element={<Payment />} />
        <Route path='addproduct' element={<AddProduct />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<MyProducts />}></Route>
          <Route path='allusers' element={<AllUsers />}></Route>
          <Route path='myorders' element={<MyOrders />}></Route>
        </Route>
        <Route path='profile' element={<UserProfile />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='resetpassword' element={<ResetPass />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
