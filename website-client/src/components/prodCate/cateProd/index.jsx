import { useEffect, useState } from 'react';
import { db } from '../../../queries/api/firebase-connect';
import { collection, getDocs } from 'firebase/firestore';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import formatter from '../../format-currency';

import FilterProd from '../filterProd';

function CateProd(props) {
  let [prods, setProds] = useState([]);
  let { nameCate } = useParams('');
  const [loading, setLoading] = useState(false);
  let [valueSort, setValueSort] = useState('');
  let [typeSort, setTypeSort] = useState();

  useEffect(() => {
  }, [props.propProdCate]);

  const getProdCate = async () => {
    try {
      let prodCate;
      if (String(nameCate) == 'new-arrival') {
        prodCate = await props.productsApi.filter((p) => p.numViews > 0);
        setProds(prodCate);
      } else {
        prodCate = await props.productsApi.filter((p) => p.cateName == String(nameCate));
        setProds(prodCate);
      }
      setLoading(true);
    } catch {
      console.log('Error');
    }
  };

  return (
    <>
      {
        <div className="product-container">
          <div className="products">
            {props.propProdCate.map((p) => (
              <div className="product-item-cate" key={p.id}>
                <div className="product-image">
                  <Link to={`/${p.name}`}>
                    <img src={p.imgAvatar} alt="" />
                  </Link>
                </div>
                <div className="product-info">
                  <h4 className="product-name">{p.name}</h4>
                  <h4 className="product-price">{formatter.format(p.price)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productsApi: state.productsApi.productAPI,
  };
};

export default connect(mapStateToProps, null)(CateProd);
