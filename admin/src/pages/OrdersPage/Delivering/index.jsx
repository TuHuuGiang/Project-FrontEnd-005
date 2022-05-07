import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableRender from '../TableRender';

function Delivering(props) {
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrder();
  }, [props.ordersApi]);

  let setOrder = () => {
    let orders = props.ordersApi.filter(o => o.orderStatus === 'Đang giao');
    console.log(orders);
    setOrders(orders);
  }
  return (
    <>
      <table className="table-admin">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Chi tiêt</th>
            <th>#</th>
          </tr>
        </thead>
        {orders.map((p, index) => (
          <TableRender key={index} propIndex={index} propData={p} />
        ))}
      </table>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ordersApi: state.ordersApi.ordersAPI,
  };
};

export default connect(mapStateToProps, null)(Delivering);
