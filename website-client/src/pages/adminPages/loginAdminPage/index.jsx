import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUserFunc } from 'redux/actions/actions';

function LoginAdmin(props) {
  const emailRef = useRef();
  const passRef = useRef();

  const setUserRedux = (email) => {
    props.checkUserFunc(email);
  };

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
          <input type="text" ref={passRef} className="login-pass" placeholder="Nhập mật khẩu" />
        </form>
        <Link to="/dashboard"
          className="button btn-login button-c-black"
          onClick={() => setUserRedux(emailRef.current.value)}
        >
          ĐĂNG NHẬP
        </Link>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    checkUserFunc: (user) => dispatch(checkUserFunc(user)),
  };
};

export default connect(null, mapDispatchToProps)(LoginAdmin);
