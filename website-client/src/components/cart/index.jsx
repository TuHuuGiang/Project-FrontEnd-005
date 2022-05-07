import { deleteProduct } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import imgTest from '../../assets/img/products/4.webp';
import formatter from '../../components/format-currency';

import InformationProdCart from './informationProdCart';

function Cart(props) {
  // let [quantity, setQuantity] = useState(1);
  // let [total, setTotal] = useState('');
  // let [t, setT] = useState([]);
  // let [arrProd, setArrProd] = useState([]);
  let [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    getCartLocalStorage();
  }, []);

  let getCartLocalStorage = () => {
    let dataCart = JSON.parse(localStorage.getItem("cartRedux"));
    setDataCart(dataCart);
    console.log(dataCart);
  }

  // useEffect(() => {
  //   setArr();
  //   totalPrice();
  // }, []);

  // let setArr = () => {
  //   setArrProd(props.cart);
  // };

  // let totalPrice = () => {
  //   let resultTotal = 0;
  //   for (let i = 0; i < props.cart.length; i++) {
  //     resultTotal = resultTotal + props.cart[i].price * props.cart[i].quantityDetail;
  //   }
  //   setTotal(resultTotal);
  // };

  return (
    <>
      <div className="container">
        <div className="cart-container">
          <h2>GIỎ HÀNG</h2>
          {props.cart <= 0 ? (
            <h1>Giỏ hàng trống ...</h1>
          ) : (
            <div className="cart-content">
              <InformationProdCart propProdArr={props.cart} />
              {/* <InformationProdCart /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product_current) => dispatch(deleteProduct(product_current)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
