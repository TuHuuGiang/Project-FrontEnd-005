import { db } from '../../../queries/apis/firebase-connect';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersApi } from '../../../redux/actions/actions';
import TableRender from '../TableRender';

function Handling(props) {
  let [data, setData] = useState([]);
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrder();
  }, [props.ordersApi]);

  let setOrder = () => {
    let orders = props.ordersApi.filter(o => o.orderStatus === 'Đang xử lý');
    console.log(orders);
    setOrders(orders);
  }

  const getData = () => {
    let orders = [];
    getDocs(collection(db, 'orders')).then((data) => {
      data.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      let orderHandling = orders.filter(p => p.orderStatus === 'Đang xử lý');
      setData(orderHandling);
      props.fetchOrdersApi(orderHandling);
    });
  };
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
        {data == ''
            ? orders.map((p, index) => <TableRender key={index} propIndex={index} propData={p} />)
            : data.map((p, index) => <TableRender key={index} propIndex={index} propData={p} />)}
      </table>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ordersApi: state.ordersApi.ordersAPI,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersApi: (order) => dispatch(fetchOrdersApi(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handling);
