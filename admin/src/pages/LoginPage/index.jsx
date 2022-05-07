import './style.css';
import img from '../../assets/a1.jpg';

import { useState } from 'react';
import { login } from '../../queries/apis/firebase-connect';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../queries/apis/firebase-connect';
import { checkUserFunc } from '../../redux/actions/actions';
import { connect } from 'react-redux';

function Login(props) {
  let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [pass, setPass] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, pass);
      props.checkUserFunc(email);
      navigate('/dashboard');
    } catch {
      console.log('Error');
    }
  }

  return (
    <>
      <div className="container">
        <div className="login-container">
          <div className="login-form">
            <label htmlFor="email">
              <h2>Tên Đăng Nhập</h2>
            </label>
            <input type="text" id="email" className="email" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">
              <h2>Mật Khẩu</h2>
            </label>
            <input type="password" id="password" className="password" placeholder="Nhập mật khẩu ..."  onChange={(e) => setPass(e.target.value)} />
          </div>
          <button className="login" onClick={(e) => handleLogin(e)}>Đăng Nhập</button>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserFunc: (user) => dispatch(checkUserFunc(user))
  };
}

export default connect(null, mapDispatchToProps)(Login);