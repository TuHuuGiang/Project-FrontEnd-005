import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Outlet } from 'react-router-dom';

import NavOrder from './navOrder';

function Orders(props) {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let time = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-cate">
          <PulseLoader size={15} color={'#000000'} loading={loading} />
        </div>
      ) : props.infoOrders.length <= 0 ? (
        <div className="content">
          <h1>Đơn hàng rỗng</h1>
        </div>
      ) : (
        <div className="content">
          <NavOrder />
          <Outlet />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    infoOrders: state.infoOrders.ordersUser,
  };
};

export default connect(mapStateToProps, null)(Orders);
