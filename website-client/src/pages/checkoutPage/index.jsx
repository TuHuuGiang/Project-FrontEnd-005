import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import formatter from '../../components/format-currency';
import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';
import { deleteCartFunc, buyProduct } from '../../redux/actions/actions';
import { toast } from 'react-toastify';
import CompletePage from '../completePage';

function Checkout(props) {
  let navigate = useNavigate();
  let [total, setTotal] = useState();
  let [name, setName] = useState(props.info.fullName);
  let [tel, setTel] = useState(props.info.telephone);
  let [address, setAddress] = useState(props.info.address);

  useEffect(() => {
    totalFunc();
  }, []);

  let totalFunc = () => {
    let resultTotal = 0;
    for (let i = 0; i < props.saveQuantity.length; i++) {
      resultTotal =
        resultTotal + props.saveQuantity[i].price * props.saveQuantity[i].quantityDetail;
    }
    setTotal(resultTotal);
  };

  let addOrder = async () => {
    if (name === '' || tel === '' || address === '') {
      toast.warning('Cần phải nhập đầy đủ thông tin');
    } else {
      let docRef = addDoc(collection(db, 'orders'), {
        userID: props.info.userID,
        shippingReceiverName: name || props.info.fullName,
        shippingReceiverTel: tel || props.info.telephone,
        shippingReceiverAddress: address || props.info.address,
        orderStatus: 'Chờ xác nhận',
        date: serverTimestamp(),
      });
      docRef.then((data) => {
        props.saveQuantity.map((p) => {
          addDoc(collection(db, `orders/${data.id}/products`), {
            imageProduct: p.imgAvatar,
            nameProduct: p.name,
            price: p.price,
            quantity: p.quantityDetail,
            total: p.price * p.quantityDetail,
          });
        });
      });
      props.deleteCartFunc({});
      await localStorage.removeItem('cartRedux');
      navigate('/complete');
    }
  };

  return (
    <>
      <div className="wrap-checkout">
        <div className="checkout-container">
          <div className="logo">
            <img src="./assets/img/logo/logo.webp" alt="" />
          </div>
          <div className="info-container">
            <div className="info-account">
              <span className="info-heading">Thông tin nhận hàng</span>
              <form className="info">
                <input
                  type="text"
                  defaultValue={props.info.email}
                  className="info-email"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  defaultValue={props.info.fullName}
                  className="info-name"
                  placeholder="Họ và tên"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  defaultValue={Number(props.info.telephone)}
                  className="info-phone"
                  placeholder="Số điện thoại"
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
                <input
                  type="text"
                  defaultValue={props.info.address}
                  className="info-address"
                  placeholder="Địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {/* <input type="text" defaultValue={props.info.email} className="info-province" placeholder="Tỉnh thành" />
                <input type="text" defaultValue={props.info.email} className="info-district" placeholder="Quận huyện" />
                <input type="text" defaultValue={props.info.email} className="info-ward" placeholder="Phường xã" /> */}
                <textarea
                  name="info-note"
                  id="info-note"
                  className="info-note"
                  cols="40"
                  rows="4"x
                  placeholder="Ghi chú (nếu có)"
                ></textarea>
              </form>
            </div>
            <div className="info-transport">
              <span className="info-heading">Vận chuyển</span>
              <p>Vui lòng nhập thông tin giao hàng</p>
            </div>
          </div>
        </div>
        <div className="info-cart-container">
          <h3 className="info-cart-heading">Đơn hàng</h3>
          {props.cart.map((product) => (
            <div className="info-prod" key={product.id}>
              <img src={product.imgAvatar} className="image" alt={product.name} />
              <h5 className="name">{product.name}t</h5>
              <h5 className="quantity">{product.quantityDetail}</h5>
              <h5 className="price">{formatter.format(product.price * product.quantityDetail)}</h5>
            </div>
          ))}
          <div className="promotion">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button>Áp dụng</button>
          </div>
          <div className="total-container">
            <span className="price-text">Tạm tính:</span>
            <span className="provi-price-number">
              <b>{formatter.format(total)}</b>
            </span>
          </div>
          <div className="total-container">
            <span className="price-text">Phí vận chuyển:</span>
            <span className="provi-price-number">
              <b>{formatter.format(30000)}</b>
            </span>
          </div>
          <div className="total-container">
            <span className="price-text">
              <b>Freeship đơn hàng từ 700k</b>
            </span>
          </div>
          <div className="border"></div>
          <div className="total">
            <span className="price-text">Tổng cộng: </span>
            <span className="total-price">
              <b>{formatter.format(total + 30000)}</b>
            </span>
          </div>
          <div className="total">
            <Link to="/cart" className="back">
              <i className="fa-solid fa-angle-left"></i>
              Quay về giỏ hàng
            </Link>
            <button className="order" onClick={addOrder}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    info: state.info.infoUser,
    saveQuantity: state.saveQuantity.quantityCart,
    cart: state.cart.cartArr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartFunc: (arr) => dispatch(deleteCartFunc(arr)),
    buyProduct: (product_current, quantity) => dispatch(buyProduct(product_current, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
