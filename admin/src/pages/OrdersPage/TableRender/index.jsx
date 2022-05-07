import { db } from '../../../queries/apis/firebase-connect';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersApi } from '../../../redux/actions/actions';
import './style.scss';

function TableRender(props) {
  let [toggle, setToggle] = useState(false);
  let [idOrder, setIdOrder] = useState();
  let [status, setStatus] = useState('');
  let [statusO, setStatusO] = useState('');
  let [show, setShow] = useState(false);
  let [oDetail, setODetail] = useState([]);
  let [total, setTotal] = useState();

  useEffect(() => {
    checkStatusFunc();
  }, [props.propData.orderStatus])

  const getData = () => {
    let orders = [];
    getDocs(collection(db, 'orders')).then((data) => {
      data.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      props.fetchOrdersApi(orders);
    });
  };

  let handleModalEdit = (order) => {
    setIdOrder(order.id);
    setToggle(!toggle);
  };

  let cancelOrder = (id) => {
    const docRef = doc(db, 'orders', id);
    updateDoc(docRef, {
      orderStatus: 'Đã hủy',
    });
    getData();
  };

  let updateStatus = () => {
    const docRef = doc(db, 'orders', idOrder);
    updateDoc(docRef, {
      orderStatus: status,
    });
    getData();
    setToggle(false);
  };

  let showOrder = (id) => {
    let orderDetail = [];
    getDocs(collection(db, `orders/${id}/products`)).then((data) => {
      data.docs.forEach((doc) => {
        orderDetail.push({ ...doc.data(), id: doc.id });
      });
      setODetail(orderDetail);
      let total = 0;
      for (let i = 0; i < orderDetail.length; i++) {
        total += orderDetail[i].total;
      }
      setTotal(total);
    });
    setShow(!show);
  };

  let checkStatusFunc = () => {
    if (props.propData.orderStatus.toLowerCase().trim() == 'đã hủy') {
      setStatusO('status cash');
    } else if (props.propData.orderStatus.toLowerCase().trim() == 'chờ xác nhận') {
      setStatusO('status order');
    } else if (props.propData.orderStatus.toLowerCase().trim() == 'đang xử lý') {
      setStatusO('status in-progressing');
    } else if (props.propData.orderStatus.toLowerCase().trim() == 'đang giao') {
      setStatusO('status shipping');
    } else if (props.propData.orderStatus.toLowerCase().trim() == 'đã nhận hàng') {
      setStatusO('status complete');
    } else {
      setStatusO('status cancel');
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td>{props.propData.id}</td>
          <td>{props.propData.shippingReceiverName}</td>
          <td>{props.propData.shippingReceiverTel}</td>
          <td>{props.propData.shippingReceiverAddress}</td>
          <td>
            <span className={statusO}>{props.propData.orderStatus}</span>
          </td>
          <td>
            <button className="show-detail" onClick={() => showOrder(props.propData.id)}>
              Chi tiết
            </button>
          </td>
          <td>
            <i
              className="icon icon-edit fa-solid fa-pen-to-square"
              onClick={() => handleModalEdit(props.propData)}
            ></i>
            <i
              className="icon icon-del fa-solid fa-trash"
              onClick={() => cancelOrder(props.propData.id)}
            ></i>
          </td>
        </tr>
      </tbody>
      <div className={toggle ? 'modal-container active-modal' : 'modal-container'}>
        <div className="modal">
          <div className="modal-content">
            <select className="category" onChange={(e) => setStatus(e.target.value)}>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
            </select>
          </div>
          <div className="modal-button">
            <button className="edit" onClick={updateStatus}>
              Cập nhập
            </button>
            <button className="cancel" onClick={() => setToggle(false)}>
              Hủy
            </button>
          </div>
        </div>
      </div>

      {/* Show orders */}
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
              {oDetail.map((o, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={o.imageProduct} alt="" />
                  </td>
                  <td>
                    <h5>{o.nameProduct}</h5>
                  </td>
                  <td>
                    <h5>{o.quantity}</h5>
                  </td>
                  <td>
                    <h5>{o.price * o.quantity}</h5>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="price" colSpan="5">
                  Tổng tiền:
                  <span>{total}</span>
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
    fetchOrdersApi: (order) => dispatch(fetchOrdersApi(order)),
  };
};

export default connect(null, mapDispatchToProps)(TableRender);
