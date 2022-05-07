import { db, delUser } from '../../../queries/apis/firebase-connect';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsersApi } from '../../../redux/actions/actions';
import { getAuth, deleteUser } from 'firebase/auth';

// var admin = require("firebase-admin");

// var serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

function AllUser(props) {
  let [toggle, setToggle] = useState(false);
  let [user, setUser] = useState({});
  let [tel, setTel] = useState();
  let [address, setAddress] = useState('');

  const getData = () => {
    let orders = [];
    getDocs(collection(db, 'users')).then((data) => {
      data.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      props.fetchUsersApi(orders);
    });
  };

  let handleModal = (user) => {
    console.log(user);
    setUser(user);
    setToggle(!toggle);
  }

  let updateUser = () => {
    const docRef = doc(db, 'users', user.id);
    updateDoc(docRef, {
      telephone: Number(tel) || user.telephone,
      address: address || user.address
    });
    getData();
    setToggle(false);
  }

  async function delUserFunc (id) {
    try {
      getAuth()
      deleteUser(id);
      console.log('thành công');
    } catch {
      console.log('Error');
    }
  }

  return (
    <>
      <table className="table-admin">
        <thead>
          <tr>
            <th>STT</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>TELEPHONE</th>
            <th>ADDRESS</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {props.usersApi.map((u, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.telephone}</td>
              <td>{u.address}</td>
              <td>
                <i className="icon icon-edit fa-solid fa-pen-to-square"  onClick={() => handleModal(u)}></i>
                <i className="icon icon-del fa-solid fa-trash" onClick={() => delUserFunc(u.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={toggle ? 'modal-container active-modal' : 'modal-container'}>
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              defaultValue={user.telephone}
              className="price-product"
              placeholder="Nhập số điện thoại ..."
              onChange={(e) => setTel(e.target.value)}
            />
            <input
              type="text"
              defaultValue={user.address}
              className="quantity-product"
              placeholder="Nhập địa chỉ ..."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="modal-button">
            <button className="edit" onClick={updateUser}>
              Cập nhập
            </button>
            <button className="cancel" onClick={() => setToggle(false)}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    usersApi: state.usersApi.usersAPI,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersApi: (user) => dispatch(fetchUsersApi(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUser);
