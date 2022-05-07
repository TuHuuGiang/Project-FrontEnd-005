import banner1 from '../../../assets/img/banner/slider_1.webp';
import banner2 from '../../../assets/img/banner/slider_2.webp';
import banner3 from '../../../assets/img/banner/slider_3.webp';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { settings } from '../../slick-slider/setting-banner';

export default function Banner() {
  return (
    <>
      <div className="banner">
        <Slider {...settings}>
          <div className="banner-item">
            <img src={banner3} alt="" />
          </div>
          <div className="banner-item">
            <img src={banner1} alt="" />
          </div>
          <div className="banner-item">
            <img src={banner2} alt="" />
          </div>
        </Slider>
      </div>
    </>
  );
}
