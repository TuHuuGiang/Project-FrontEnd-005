import { db } from '../../../../queries/api/firebase-connect';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrderUserFunc } from '../../../../redux/actions/actions';
import { toast } from 'react-toastify';
import formatter from '../../../format-currency';

import CheckStatus from './checkStatus';

function TableShow(props) {
  let [flag, setFlag] = useState(false);
  let [orderArr, setOrderArr] = useState([]);
  let [oDetail, setODetail] = useState([]);
  let [status, setStatus] = useState('');
  let [totalOrders, setTotalOrders] = useState();
  let [show, setShow] = useState(false);

  useEffect(() => {}, [status]);

  const getOrders = async () => {
    let ordersArr = [];
    let userLocal = JSON.parse(localStorage.getItem('user'));
    await getDocs(collection(db, 'orders')).then((data) => {
      data.docs.forEach((doc) => {
        ordersArr.push({ ...doc.data(), id: doc.id });
      });
    });
    console.log(ordersArr);
    let findOrder = ordersArr.filter((o) => o.userID == userLocal.id);
    setOrderArr(findOrder);
    props.fetchOrderUserFunc(findOrder);
  };

  let showOrderDetail = async (id) => {
    let prodArr = [];
    await getDocs(collection(db, `orders/${id}/products`)).then((data) => {
      data.docs.forEach((doc) => {
        prodArr.push({ ...doc.data(), id: doc.id });
      });
      let total = 0;
      for (let i = 0; i < prodArr.length; i++) {
        total += prodArr[i].total;
      }
      setTotalOrders(total);
      setODetail(prodArr);
      setShow(!show);
      console.log('11', prodArr);
    });
  };

  async function cancelOrder(id) {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      orderStatus: 'Đã hủy',
    });
    // setStatus('Đã hủy');
    await getOrders();
    setFlag(true);
    toast.success('Đã hủy đơn hàng');
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ĐƠN HÀNG</th>
            <th>TRẠNG THÁI</th>
            <th>CHI TIẾT</th>
            <th>XÁC NHẬN</th>
            <th>HỦY ĐƠN HÀNG</th>
          </tr>
        </thead>

        <tbody>
          {flag === false
            ? props.propOrders.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.id}</td>
                  <td>
                    <CheckStatus propStatus={p.orderStatus} />
                  </td>
                  <td>
                    <button onClick={() => showOrderDetail(p.id)}>Xem chi tiết</button>
                  </td>
                  <td>
                    <button onClick={() => cancelOrder(p.id)} disabled={p.orderStatus.toLowerCase().trim() !== 'chờ xác nhận'}>Hủy đơn</button>
                  </td>
                  <td>
                    <button className="confirm" disabled={p.orderStatus !== 'Đã nhận hàng'}>
                      Đã nhận hàng
                    </button>
                  </td>
                </tr>
              ))
            : orderArr.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.id}</td>
                  <td>
                    <CheckStatus propStatus={p.orderStatus} />
                  </td>
                  <td>
                    <button onClick={() => showOrderDetail(p.id)}>Xem chi tiết</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => cancelOrder(p.id)} disabled={p.orderStatus.toLowerCase().trim() !== 'chờ xác nhận'}>Hủy đơn</button>
                  </td>
                  <td>
                    <button className="confirm" disabled={p.orderStatus !== 'Đã nhận hàng'}>
                      Đã nhận hàng
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className={show ? 'order-modal-container activeShow' : 'order-modal-container'}>
        <div className="order-modal">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {oDetail.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={p.imageProduct} alt="" />
                  </td>
                  <td>
                    <h5>{p.nameProduct}</h5>
                  </td>
                  <td>
                    <h5>{p.quantity}</h5>
                  </td>
                  <td>
                    <h5>{formatter.format(p.price)}</h5>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="price" colSpan="5">
                  Tổng tiền:
                  <span>{formatter.format(totalOrders)}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="order-button">
            <button className="cancel" onClick={() => setShow(!show)}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderUserFunc: (order) => dispatch(fetchOrderUserFunc(order)),
  };
};

export default connect(null, mapDispatchToProps)(TableShow);
