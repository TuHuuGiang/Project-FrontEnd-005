import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import TableShow from '../tableShow';

function Delivery(props) {
  let [oStatus, setOStatus] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOrderStatus();
  }, []);

  let checkOrderStatus = () => {
    let orders = props.infoOrders.filter(
      (o) => o.orderStatus == "Đang giao"
    );
    setOStatus(orders);
    setLoading(false);
    console.log('24', orders);
  };

  return (
    <>
      {loading ? (
        'loading'
      ) : oStatus.length <= 0 ? (
        <div className="content">
          <h1>Không có đơn hàng nào</h1>
        </div>
      ) : (
        <TableShow propOrders={oStatus} />
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

export default connect(mapStateToProps, null)(Delivery);
