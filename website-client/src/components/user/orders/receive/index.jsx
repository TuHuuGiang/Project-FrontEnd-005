import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import TableShow from '../tableShow';

function Receive(props) {
  let [oStatus, setOStatus] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOrderStatus();
  }, []);

  let checkOrderStatus = async () => {
    let orders = props.infoOrders.filter((o) => o.orderStatus == 'Đã nhận hàng');
    await setOStatus(orders);
    setLoading(false);
    console.log('21', orders);
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

export default connect(mapStateToProps, null)(Receive);
