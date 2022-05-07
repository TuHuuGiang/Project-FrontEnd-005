import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { delUserFunc, fetchOrderUserFunc, getInfoUserFuc } from '../../redux/actions/actions';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';
import { HashLoader } from 'react-spinners';

import SideBarUser from '../../components/user/sidebar';

function User(props) {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let time = setTimeout(() => {
      setLoading(false);
    }, 4000);

    getOrders();

    return () => {
      clearTimeout(time);
    };
  }, []);

  const getOrders = async () => {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    let ordersArr = [];
    let infoUser = [];
    await getDocs(collection(db, 'orders')).then((data) => {
      data.docs.forEach((doc) => {
        ordersArr.push({ ...doc.data(), id: doc.id });
      });
    });
    let findOrder = ordersArr.filter((o) => o.userID == userLocal.id);
    console.log('21', findOrder);
    props.fetchOrderUserFunc(findOrder);

    await getDocs(collection(db, 'users')).then((data) => {
      data.docs.forEach((doc) => {
        infoUser.push({ ...doc.data(), id: doc.id });
      });
    });
    let findUser = infoUser.filter((user) => user.email == userLocal.name);
    console.log(findUser);
    props.getInfoUserFuc(...findUser);
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        <div className="loading-cate">
          <HashLoader size={50} color={'#000000'} loading={loading} />
        </div>
      ) : (
        <div className="user-container">
          <SideBarUser />
          <Outlet />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    info: state.info.infoUser,
    infoOrders: state.infoOrders.ordersUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delUserFunc: () => dispatch(delUserFunc()),
    fetchOrderUserFunc: (order) => dispatch(fetchOrderUserFunc(order)),
    getInfoUserFuc: (info) => dispatch(getInfoUserFuc(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
