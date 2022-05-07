import formatter from '../../format-currency';
import { useEffect, useState } from 'react';
import { saveQuantityFunc, deleteProduct } from '../../../redux/actions/actions';
import { connect } from 'react-redux';

import PriceCart from '../priceCart';
import { Link } from 'react-router-dom';

function InformationProdCart(props) {
  let [total, setTotal] = useState('');
  let [cartArr, setCartArr] = useState();
  let [dataCart, setDataCart] = useState();

  useEffect(() => {
    // getCartLocalStorage();
    totalPrice();
  }, []);

  // let getCartLocalStorage = () => {
  //   let dataCart = JSON.parse(localStorage.getItem("cartRedux"));
  //   setDataCart(dataCart);
  //   console.log(dataCart);
  // }

  let btnIncreasing = (i) => {
    let newArr = props.propProdArr;
    if (newArr[i].quantityDetail >= 5) {
      newArr[i].quantityDetail = 5;
      setCartArr(newArr);
      // props.saveQuantity(newArr);
    } else {
      newArr[i].quantityDetail = newArr[i].quantityDetail + 1;
      setCartArr(newArr);
      // props.saveQuantity(newArr);
    }
    totalPrice();
  };

  let btnDecrease = (i) => {
    let newArr = props.propProdArr;
    if (newArr[i].quantityDetail <= 1) {
      newArr[i].quantityDetail = 1;
      setCartArr(newArr);
      // props.saveQuantity(newArr);
    } else {
      newArr[i].quantityDetail = newArr[i].quantityDetail - 1;
      setCartArr(newArr);
      // props.saveQuantity(newArr);
    }
    totalPrice();
  };

  let totalPrice = () => {
    let resultTotal = 0;
    for (let i = 0; i < props.propProdArr.length; i++) {
      resultTotal = resultTotal + props.propProdArr[i].price * props.propProdArr[i].quantityDetail;
    }
    setTotal(resultTotal);
    console.log(total);
  };
  return (
    <>
      <div className="cart-info-containers">
        {props.propProdArr.map((product, index) => (
          <div className="cart-info" key={product.id}>
            <div className="cart-info-image">
              <img src={product.imgAvatar} alt="" />
            </div>
            <div className="cart-info-container">
              <h4 className="cart-info-name">{product.name}</h4>
              <button
                className="del-prod"
                onClick={() => {
                  props.deleteProduct(product);
                  totalPrice();
                }}
              >
                Xóa
              </button>
            </div>
            <h3 className="cart-info-price">{formatter.format(product.price)}</h3>
            <div className="quantity-input">
              <button onClick={() => btnDecrease(index)}>-</button>
              <input type="text" min="1" max="5" value={product.quantityDetail} readOnly />
              <button onClick={() => btnIncreasing(index)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <PriceCart propTotal={total} propCartArr={cartArr} />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product_current) => dispatch(deleteProduct(product_current)),
    saveQuantityFunc: (quantity) => dispatch(saveQuantityFunc(quantity)),
  };
};

export default connect(null, mapDispatchToProps)(InformationProdCart);
