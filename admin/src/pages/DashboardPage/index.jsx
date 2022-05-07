import SideBar from '../../components/SideBar';
import { connect } from 'react-redux';
import { fetchProductsApi, fetchUsersApi, fetchOrdersApi } from '../../redux/actions/actions';

import './style.css';

function Dashboard(props) {
  // let [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getProdCate();
  //   let time = setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, []);

  // const getProdCate = () => {
  //   let products = [];
  //   let users = [];
  //   let orders = [];
  //   getDocs(collection(db, 'products')).then((data) => {
  //     data.docs.forEach((doc) => {
  //       products.push({ ...doc.data(), id: doc.id });
  //     });
  //     // console.log(products);
  //     props.fetchProductsApi(products);
  //   });

  //   getDocs(collection(db, 'users')).then((data) => {
  //     data.docs.forEach((doc) => {
  //       users.push({ ...doc.data(), id: doc.id });
  //     });
  //     props.fetchUsersApi(users);
  //   });

  //   getDocs(collection(db, 'orders')).then((data) => {
  //     data.docs.forEach((doc) => {
  //       orders.push({ ...doc.data(), id: doc.id });
  //     });
  //     props.fetchOrdersApi(orders);
  //   });
  // };

  return (
    <>
        <div className="wrapper">
          <SideBar />
          <div className="content">
            <h1>Dashboard Page</h1>
          </div>
        </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsApi: (data) => dispatch(fetchProductsApi(data)),
    fetchUsersApi: (user) => dispatch(fetchUsersApi(user)),
    fetchOrdersApi: (order) => dispatch(fetchOrdersApi(order))
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
