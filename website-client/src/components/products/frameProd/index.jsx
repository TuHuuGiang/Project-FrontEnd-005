import Slider from 'react-slick';
import { settings } from '../../slick-slider/setting';
import formatter from '../../format-currency';
import { Link } from 'react-router-dom';

import { db } from '../../../queries/api/firebase-connect';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { connect } from 'react-redux';
import { fetchApi } from '../../../redux/actions/actions';
import { useEffect } from 'react';

function FrameProduct(props) {
  const getProdCate = () => {
    let products = [];
    getDocs(collection(db, 'products')).then((data) => {
      data.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      props.fetchApi(products);
    });
  };

  let updateNumView = (id, nView) => {
    const docRef = doc(db, 'products', id);
    updateDoc(docRef, {
      numViews: nView + 1,
    });
    getProdCate();
  };

  return (
    <>
      <div className="product-container">
        <Slider {...settings}>
          {props.propProd.map((p) => (
            <div className="products" key={p.id}>
              <div className="product-item">
                <div className="product-image">
                  <Link to={`/${p.name}`}>
                    <img src={p.imgAvatar} alt="" onClick={() => updateNumView(p.id, p.numViews)} />
                  </Link>
                </div>
                <div className="product-info">
                  <h4 className="product-name">
                    <Link to={`/${p.name}`}  onClick={() => updateNumView(p.id, p.numViews)}>{p.name}</Link>
                  </h4>
                  <h4 className="product-price">{formatter.format(p.price)}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <Link to={`/${props.propPath}`} className="button button-c-black">
          Xem tất cả
        </Link>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: (products) => dispatch(fetchApi(products)),
  };
};

export default connect(null, mapDispatchToProps)(FrameProduct);
