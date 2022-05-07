import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../pages/loginPage';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';
import { logout } from '../../queries/api/firebase-connect';

function PrivateLoginUser(props) {
  const currentUser = getAuth();
  const user = currentUser.currentUser;
    let md5 = require("md5");

  // useEffect(() => {
  //   saveUser();
  // }, []);

  // let saveUser = async () => {
  //   const useRef = await doc(db, 'users', user.uid);
  //   await setDoc(useRef, {
  //     userID: user.uid,
  //     userName: props.info.nameRe,
  //     email: user.email,
  //     password: await md5(props.info.passRe),
  //     fullName: props.info.nameRe,
  //     telephone: props.info.phoneRe,
  //     address: props.info.addressRe,
  //     isActive: true,
  //   });
  //   logout();
  // };
  
  return <>{props.checkUser.name !== '' ? props.children : <Navigate to="/login" />}</>;
}

const mapStateToProps = (state) => {
  return {
    checkUser: state.checkUser.user,
    info: state.info.infoUser,
  };
};

export default connect(mapStateToProps, null)(PrivateLoginUser);
