import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { buyProduct } from '../../../redux/actions/actions';
import { connect } from 'react-redux';

import formatter from '../../format-currency';

function InformationProdDetail(props) {
  let [quantity, setQuantity] = useState(1);
  let nodeSize = useRef();
  let nodeColor = useRef();

  let btnIncreasing = () => {
    if (quantity >= 5) {
      alert('Bạn được mua tối đa 5 sản phẩm');
      setQuantity(5);
    } else {
      setQuantity(quantity + 1);
      console.log(props.propParams);
    }
  };

  let btnDecrease = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  let activeSize = (index) => {
    let size = nodeSize.current.children;
    for (let i = 0; i < props.propSizes.length; i++) {
      size[i].className = size[i].className.replace(
        'circle circle-c-white activeC',
        'circle circle-c-white'
      );
    }
    size[index].className = 'circle circle-c-white activeC';
  };

  let activeColor = (index) => {
    let color = nodeColor.current.children;
    for (let i = 0; i < props.propColors.length; i++) {
      color[i].className = color[i].className.replace('circle activeC', 'circle');
    }
    color[index].className = 'circle activeC';
  };

  return (
    <>
      <div className="prod-content">
        <h1 className="prod-detail-name">{props.propName}</h1>
        <h1 className="prod-detail-price">{formatter.format(props.propPrice)}</h1>
        <div className="circles">
          <span>
            <b>Màu sắc: </b>
          </span>
          <div className="colors" ref={nodeColor}>
            {props.propColors.map((c, index) => (
              <div
                key={index}
                className="circle"
                style={{ backgroundColor: `${c}` }}
                onClick={() => activeColor(index)}
              ></div>
            ))}
          </div>
        </div>
        {props.propParams == 'bag' || props.propParams == 'backpack' ? (
          ''
        ) : (
          <div className="circles">
            <span>
              <b>Size: </b>
            </span>
            <div className="sizes" ref={nodeSize}>
              {props.propSizes.map((s, index) => (
                <div
                  className="circle circle-c-white"
                  key={index}
                  onClick={() => activeSize(index)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="quantity">
          <span>
            <b>Số lượng: </b>
          </span>
          <div className="quantity-input">
            <button onClick={btnDecrease}>-</button>
            <input type="text" min="1" max="5" value={quantity} readOnly />
            <button onClick={btnIncreasing}>+</button>
          </div>
        </div>
        <button
          className="buy"
          onClick={() =>
            props.buyProduct(props.propProd, quantity) && toast.success('Thêm sản phẩm thành công')
          }
        >
          MUA NGAY
        </button>
        <h5>
          <b>Gọi đặt mua: </b> <span>0382790428</span>
        </h5>
        <h4>
          <i className="icon fa-solid fa-check"></i>
          BẢO HÀNH DO LỖI NHÀ SẢN XUẤT
        </h4>
        <h4>
          <i className="icon fa-solid fa-truck-fast"></i>
          MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG TỪ 700.000Đ
        </h4>
        <h4>
          <i className="icon fa-solid fa-check-double"></i>
          CAM KẾT 100% CHÍNH HÃNG
        </h4>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartArr,
    productsApi: state.productsApi.productAPI,
    prodSelling: state.productsApi.prodSelling,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyProduct: (product_current, quantity) => dispatch(buyProduct(product_current, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationProdDetail);
