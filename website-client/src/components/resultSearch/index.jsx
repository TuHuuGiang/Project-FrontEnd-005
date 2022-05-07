import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

function ResultSearch(props) {
  let [prod, setProd] = useState([]);
  let { keyword } = useParams('');

  useEffect(() => {
    getProd();
  }, [keyword]);

  const getProd = () => {
    let result = props.productsApi.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setProd(result);
  };

  return (
    <>
      <div className="container">
        <div className="product-container">
          <div className="result-search">
            <div className="result-search-heading">
              {prod.length > 0 ? (
                <div className="result-search-content">
                  <div className="products">
                    {prod.length < 0
                      ? ''
                      : prod.map((p) => (
                          <div className="product-item-cate" key={p.id}>
                            <div className="product-image">
                              <Link to={`/${p.name}`}>
                                <img src={p.imgAvatar} alt="" />
                              </Link>
                            </div>
                            <div className="product-info">
                              <h4 className="product-name">{p.name}</h4>
                              <h4 className="product-price">
                                {p.price} <sup>đ</sup>
                              </h4>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              ) : (
                <h1>Không có kết quả tìm kiếm phù hợp</h1>
              )}
            </div>
          </div>
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

export default connect(mapStateToProps, null)(ResultSearch);