import { Link } from 'react-router-dom';
import formatter from '../../format-currency';
import { connect } from 'react-redux';
import { saveQuantityFunc } from '../../../redux/actions/actions';

function PriceCart(props) {
  return (
    <>
      <div className="cart-price">
        <div className="provi-price-container">
          <span className="price-text">Tạm tính:</span>
          <span className="provi-price-number">
            <b>{formatter.format(props.propTotal)}</b>
          </span>
        </div>
        <div className="total-price-container">
          <span className="price-text">Thành tiền: </span>
          <span className="total-price-number">{formatter.format(props.propTotal)}</span>
        </div>
        <Link to="/checkout" onClick={() => props.saveQuantityFunc(props.cart)} className="button button-c-black btn-payment">
          THANH TOÁN NGAY
        </Link>
        <Link to="/" className="countinue-buy">
          TIẾP TỤC MUA HÀNG
        </Link>
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
    saveQuantityFunc: (quantity) => dispatch(saveQuantityFunc(quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceCart);