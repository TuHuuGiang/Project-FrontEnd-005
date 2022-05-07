import Login from '../pages/LoginPage';
import Dashboard from '../pages/DashboardPage';
import Products from '../pages/ProductsPage';
import PrivateLogin from '../routes/PrivateLogin';
import Users from '../pages/CustomersPage';
import Orders from '../pages/OrdersPage';
import AllOrders from '../pages/OrdersPage/AllOrders';
import Handling from '../pages/OrdersPage/Handling';
import Delivering from '../pages/OrdersPage/Delivering';
import OrderCancel from '../pages/OrdersPage/OrderCancel';
import AllProducts from '../pages/ProductsPage/AllProducts';
import OutStockSoon from '../pages/ProductsPage/OutStockSoon';
import OutStock from '../pages/ProductsPage/OutStock';
import ProductDelete from '../pages/ProductsPage/Delete';
import AllUser from '../pages/CustomersPage/AllUser';
import UserDelete from '../pages/CustomersPage/UserDelete';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HashLoader from 'react-spinners/HashLoader';

import { connect } from 'react-redux';
import { fetchProductsApi, fetchUsersApi, fetchOrdersApi } from '../redux/actions/actions';

import './style.scss';

import { db } from '../queries/apis/firebase-connect';
import { collection, getDocs } from 'firebase/firestore';

function Layout(props) {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProdCate();
    let time = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  const getProdCate = () => {
    let products = [];
    let users = [];
    let orders = [];
    getDocs(collection(db, 'products')).then((data) => {
      data.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      console.log(products);
      props.fetchProductsApi(products);
    });

    getDocs(collection(db, 'users')).then((data) => {
      data.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      props.fetchUsersApi(users);
    });

    getDocs(collection(db, 'orders')).then((data) => {
      data.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      props.fetchOrdersApi(orders);
    });
  };
  return (
    <>
      {loading ? (
        <div className="loading">
          <HashLoader size={70} color={'#000000'} loading={loading} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateLogin>
                <Dashboard />
              </PrivateLogin>
            }
          />
          <Route path="/products" element={<Products />}>
            <Route path="" element={<AllProducts />} />
            <Route path="all" element={<AllProducts />} />
            <Route path="out-of-stock-soon" element={<OutStockSoon />} />
            <Route path="out-of-stock" element={<OutStock />} />
            <Route path="product-delete" element={<ProductDelete />} />
          </Route>
          <Route path="/users" element={<Users />}>
            <Route path="" element={<AllUser />} />
            <Route path="all" element={<AllUser />} />
            <Route path="user-delete" element={<UserDelete />} />
          </Route>
          <Route path="/orders" element={<Orders />}>
            <Route path="" element={<AllOrders />} />
            <Route path="all" element={<AllOrders />} />
            <Route path="handling" element={<Handling />} />
            <Route path="delivering" element={<Delivering />} />
            <Route path="order-cancel" element={<OrderCancel />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsApi: (data) => dispatch(fetchProductsApi(data)),
    fetchUsersApi: (user) => dispatch(fetchUsersApi(user)),
    fetchOrdersApi: (order) => dispatch(fetchOrdersApi(order)),
  };
};

export default connect(null, mapDispatchToProps)(Layout);
