import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import ProdCate from '../cateProd';

function FilterProd(props) {
  let [prods, setProds] = useState([]);
  let { nameCate } = useParams('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProdCate();
    let time = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => {
      clearTimeout(time);
    };
  }, [nameCate]);

  let sortByPriceAsc = () => {
    let p = prods.sort((a, b) => a.price - b.price);
    setProds([...p]);
    console.log(prods);
  };

  let sortByPriceDesc = () => {
    let p = prods.sort((a, b) => b.price - a.price);
    setProds([...p]);
  };

  let sortByNameAsc = () => {
    let p = prods.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
    });
    setProds([...p]);
  };

  let sortByNameDesc = () => {
    let p = prods.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
    });
    setProds([...p]);
  };

  const getProdCate = async () => {
    try {
      let prodCate;
      if (String(nameCate) == 'new-arrival') {
        prodCate = await props.productsApi.filter((p) => p.numViews > 0);
        setProds(prodCate);
      } else {
        prodCate = await props.productsApi.filter((p) => p.cateName == String(nameCate));
        let sortByName = prodCate.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
        });
        setProds(sortByName);
      }
      setLoading(true);
    } catch {
      console.log('Error');
    }
  };

  return (
    <>
      <div className="search-advance">
        <span>
          <b>Xếp theo:</b>
        </span>
        <span>
          <input
            type="radio"
            id="a-z"
            name="search-advan"
            value="a-z"
            onChange={sortByNameAsc}
            defaultChecked
          />{' '}
          Tên A-Z
        </span>
        <span>
          <input
            type="radio"
            id="z-a"
            name="search-advan"
            value="z-a"
            onChange={sortByNameDesc}
          />{' '}
          Tên Z-A
        </span>
        <span>
          <input
            type="radio"
            id="pricelth"
            name="search-advan"
            value="low-to-high"
            onChange={sortByPriceAsc}
          />{' '}
          Giá thấp đến cao
        </span>
        <span>
          <input
            type="radio"
            id="pricehtl"
            name="search-advan"
            value="high to low"
            onChange={sortByPriceDesc}
          />{' '}
          Giá cao xuống thấp
        </span>
      </div>
      {loading ? (
        <div className="loading-cate">
          <HashLoader size={50} color={'#000000'} loading={loading} />
        </div>
      ) : (
        <ProdCate propProdCate={prods} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productsApi: state.productsApi.productAPI,
  };
};

export default connect(mapStateToProps, null)(FilterProd);
