import { useEffect, useState } from 'react';

export default function ImageProdDetail(props) {
  let [img, setImg] = useState('');

  let getUrlImg = (url) => {
    setImg(url);
  };

  return (
    <>
      <div className="prod-image-container">
        <div className="prod-image">
          <img src={img || props.propImage} alt="" />
        </div>
        <div className="prod-subimage-container">
          {props.propImageArr.map((url, index) => (
            <div className="sub-image" key={index}>
              <img src={url} alt="" onClick={() => getUrlImg(url)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
