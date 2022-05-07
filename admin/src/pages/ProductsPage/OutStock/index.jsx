import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function OutStock(props) {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let getData = () => {
    let data = props.productsApi.filter((prod) => prod.quantity == 0);
    setProducts(data);
  };

  return (
    <>
      {products == '' ? (
        <h1>Không có sản phẩm nào</h1>
      ) : (
        <table className="table-admin">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={p.imgAvatar} alt="" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.cateName}</td>
                  <td>
                    <h3 className="price">{p.price}</h3>
                  </td>
                  <td>
                    <h3 className="price">{p.quantity}</h3>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productsApi: state.productsApi.productAPI,
  };
};

export default connect(mapStateToProps, null)(OutStock);
