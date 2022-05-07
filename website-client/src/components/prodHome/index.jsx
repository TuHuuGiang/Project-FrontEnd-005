import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';
import { fetchApi } from 'redux/actions/actions';

import FrameProduct from '../products/frameProd';
import ProductBanner from '../products/product-banner';

import { linksHomeTop, linksHomeBottom, linksHomeAccessory } from './linkHome';

function ProdHome(props) {
  let [prodSel, setProdSel] = useState([]);
  let [prodHoodie, setProdHoodie] = useState([]);
  let [prodPant, setProdPant] = useState([]);
  let [prodBackpack, setProdBackpack] = useState([]);

  useEffect(() => {
    getProdCate();
  }, []);

  const getProdCate = async () => {
    let products = [];
    getDocs(collection(db, 'products'))
      .then((data) => {
        data.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    let prodSelling = props.productsApi.filter((p) => p.numViews > 0 && p.isDelete === false);
    let prodH = props.productsApi.filter((p) => p.cateName === 'hoodie');
    let prodP = props.productsApi.filter((p) => p.cateName === 'pant');
    let prodB = props.productsApi.filter((p) => p.cateName === 'bag');
    setProdSel(prodSelling);
    setProdHoodie(prodH);
    setProdPant(prodP);
    setProdBackpack(prodB);
  };

  return (
    <>
      <div className="container">
        <div className="new-arrival">
          <div className="heading">
            <h2 className="heading-product">NEW ARRIVAL</h2>
          </div>
          <FrameProduct propProd={prodSel} propPath={'category/new-arrival'} />
        </div>
        <ProductBanner />
        <div className="new-arrival">
          <div className="heading">
            <h2 className="heading-product">TOP</h2>
            {linksHomeTop.map((link, index) => (
              <Link className="link" to={link.path} key={index}>
                {link.name}
              </Link>
            ))}
          </div>
          <FrameProduct propProd={prodHoodie} propPath={'category/hoodie'} />
        </div>
        <div className="new-arrival">
          <div className="heading">
            <h2 className="heading-product">BOTTOM</h2>
            {linksHomeBottom.map((link, index) => (
              <Link className="link" to={link.path} key={index}>
                {link.name}
              </Link>
            ))}
          </div>
          <FrameProduct propProd={prodPant} propPath={'category/pant'} />
        </div>
        <div className="new-arrival">
          <div className="heading">
            <h2 className="heading-product">ACCESSORY</h2>
            {linksHomeAccessory.map((link, index) => (
              <Link className="link" to={link.path} key={index}>
                {link.name}
              </Link>
            ))}
          </div>
          <FrameProduct propProd={prodBackpack} propPath={'category/backpack'} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productsApi: state.productsApi.productAPI,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: (products) => dispatch(fetchApi(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProdHome);
