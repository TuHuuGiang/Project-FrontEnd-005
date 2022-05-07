import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { login, loginGoogle } from '../../queries/api/firebase-connect';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { checkUserFunc } from 'redux/actions/actions';
import { getInfoUserFuc } from '../../redux/actions/actions';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';
import { GoogleAuthProvider } from 'firebase/auth';

function Login(props) {
  const emailRef = useRef();
  const passRef = useRef();
  let navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passRef.current.value).then(async (data) => {
        const docRef = doc(db, 'users', data.user.uid);
        const getData = await getDoc(docRef);
        if (getData.exists()) {
          props.checkUserFunc(emailRef.current.value, getData.data().userID);
          toast.success('Đăng nhập thành công !');
          navigate('/user');
        } else {
          console.log('Error');
        }
      });
    } catch {
      toast.error('Đăng nhập thất bại !');
    }
  }

  async function loginGoogleFunc(e) {
    e.preventDefault();
    try {
      let provider = new GoogleAuthProvider();
      await loginGoogle(provider).then(async (data) => {
        const docRef = doc(db, 'users', data.user.uid);
        const getData = await getDoc(docRef);
        if (getData.exists()) {
          console.log(getData.data().userID);
          props.checkUserFunc(data.user.email, getData.data().userID);
        } else {
          const useRef = await doc(db, 'users', data.user.uid);
          console.log('useRef', useRef);
          await setDoc(useRef, {
            userID: data.user.uid,
            userName: data.user.displayName,
            email: data.user.email,
            fullName: data.user.displayName,
            telephone: data.user.phoneNumber,
            address: '',
            avatar: data.user.photoURL,
            isActive: true,
          });
          console.log('id', data.user.uid);
          props.checkUserFunc(data.user.email, data.user.uid);
        }
        toast.success('Đăng nhập thành công !');
        navigate('/user');
      });
    } catch {
      toast.error('Đăng nhập thất bại !');
    }
  }

  return (
    <>
      <div className="login-container">
        <h2 className="heading">ĐĂNG NHẬP TÀI KHOẢN</h2>
        <form action="" className="login-form">
          <p>EMAIL</p>
          <input
            type="text"
            ref={emailRef}
            className="login-email"
            placeholder="Nhập địa chỉ email"
          />
          <p>MẬT KHẨU</p>
          <input type="password" ref={passRef} className="login-pass" placeholder="Nhập mật khẩu" />
        </form>
        <Link
          to="/user"
          className="button btn-login button-c-black"
          onClick={(e) => handleLogin(e)}
        >
          ĐĂNG NHẬP
        </Link>
        <div className="hr"></div>
        <div>
          <button className="btn-google" onClick={(e) => loginGoogleFunc(e)}>
            <i className="fa-brands fa-google"></i>
            Đăng nhập bằng Google
          </button>
        </div>
        <p>
          <Link to="/reset-password">Quên mật khẩu</Link>
        </p>
        <p>
          BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ <Link to="/register">TẠI ĐÂY</Link>
        </p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    checkUser: state.checkUser.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserFunc: (user, id) => dispatch(checkUserFunc(user, id)),
    getInfoUserFuc: (info) => dispatch(getInfoUserFuc(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
