import banner1 from '../../../assets/img/banner/1.webp';
import banner2 from '../../../assets/img/banner/2.webp';
import banner3 from '../../../assets/img/banner/3.webp';

import { Link } from 'react-router-dom';

export default function ProductBanner() {
  return (
    <>
      <div className="product-banner-container">
        <div className="product-banner-item">
          <img src={banner1} alt="" className="product-item-image" />
          <div className="product-banner-content">
            <h3>HOODIES</h3>
            <Link to="#" className="button button-c-white">
              XEM THÊM
            </Link>
          </div>
        </div>
        <div className="product-banner-item">
          <img src={banner2} alt="" className="product-item-image" />
          <div className="product-banner-content">
            <h3>SHIRT</h3>
            <Link to="#" className="button button-c-white">
              XEM THÊM
            </Link>
          </div>
        </div>
        <div className="product-banner-item">
          <img src={banner3} alt="" className="product-item-image" />
          <div className="product-banner-content">
            <h3>T-SHIRT</h3>
            <Link to="#" className="button button-c-white">
              XEM THÊM
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
