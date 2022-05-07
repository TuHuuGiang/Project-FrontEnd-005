import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../queries/api/firebase-connect';
import { connect } from 'react-redux';
import { fetchApi } from 'redux/actions/actions';

import HashLoader from 'react-spinners/HashLoader';

import Header from '../components/header';
import HomePage from '../pages/homePage';
import CatePage from '../pages/prodCatePage';
import ProdDetail from '../pages/prodDetailPage';
import Cart from '../pages/cartPage';
import Checkout from '../pages/checkoutPage';
import Login from '../pages/loginPage';
import ResetPassword from '../pages/resetPassword';
import Register from '../pages/registerPage';
import ResultSearch from '../pages/resultSearchPage';
import User from '../pages/userPage';
import Orders from '../components/user/orders';
import Receive from '../components/user/orders/receive';
import Delivery from '../components/user/orders/delivery';
import CancelOrder from '../components/user/orders/cancel';
import AllOrders from '../components/user/orders/allOrders';
import Profile from '../components/user/profile';
import HomeUser from '../components/user/home';
import ErrorPage from '../pages/errorPage';
import Footer from '../components/footer';
import LoginAdmin from '../pages/adminPages/loginAdminPage';
import PrivateLogin from '../routes/PrivateLogin';
import PrivateLoginUser from '../routes/PrivateLoginUser';
import Dashboard from '../pages/adminPages/dashboardAdminPage';
import PrivateCheckout from '../routes/PrivateCheckout';
import CompletePage from '../pages/completePage';

import './style.scss';

function Layout(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let time = setTimeout(() => {
      setLoading(false);
    }, 4000);
    getProdCate();
    return () => {
      clearTimeout(time);
    }
  }, []);

  const getProdCate = () => {
    let products = [];
    getDocs(collection(db, 'products')).then((data) => {
      data.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      props.fetchApi(products);
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <HashLoader size={70} color={'#000000'} loading={loading} />
        </div>
      ) : (
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:nameCate" element={<CatePage />} />
            <Route path="/:nameProd" element={<ProdDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PrivateCheckout><Checkout /></PrivateCheckout>} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PrivateLoginUser><User /></PrivateLoginUser>}>
              <Route path="" element={<HomeUser />} />
              <Route path="orders" element={<Orders />}>
                <Route path="" element={<AllOrders />} />
                <Route path="all" element={<AllOrders />} />
                <Route path="delivering" element={<Delivery />} />
                <Route path="received" element={<Receive />} />
                <Route path="cancelled" element={<CancelOrder />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/search/:keyword" element={<ResultSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login/admin" element={<LoginAdmin />} />
            <Route path="/dashboard" element={<PrivateLogin><Dashboard /></PrivateLogin>} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: (products) => dispatch(fetchApi(products)),
  };
};

export default connect(null, mapDispatchToProps)(Layout);

