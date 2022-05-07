import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FrameProduct from '../products/frameProd';
import ImageProdDetail from './imageProd';
import InformationProdDetail from './informationProd';
import DescriptionProdDetail from './descriptionProd';

function ProdDetail(props) {
  let [prod, setProd] = useState('');
  let [prodSel, setProdSel] = useState([]);
  let [img, setImg] = useState('');
  let [imgArr, setImgArr] = useState([]);
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  let { nameProd } = useParams('');

  useEffect(() => {
    getProdCate();
  }, [nameProd]);

  const getProdCate = () => {
    props.productsApi.map((p) => {
      if (p.name === nameProd) {
        setProd(p);
        setImg(p.imgAvatar);
        setImgArr(p.imgArr);
        setColors(p.colors);
        setSizes(p.sizes);
      }
    });
    let prodSelling = props.productsApi.filter(p => p.numViews > 0 && p.isDelete === false);
    setProdSel(prodSelling);
  };

  return (
    <>
      <div className="container">
        <div className="prod-detail-container">
          <ImageProdDetail propImage={img} propImageArr={imgArr} />
          <InformationProdDetail
            propName={prod.name}
            propPrice={prod.price}
            propColors={colors}
            propSizes={sizes}
            propProd={prod}
            propParams={prod.cateName}
          />
        </div>
        <DescriptionProdDetail />
        <FrameProduct propProd={prodSel} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartArr,
    productsApi: state.productsApi.productAPI,
  };
};

export default connect(mapStateToProps, null)(ProdDetail);
