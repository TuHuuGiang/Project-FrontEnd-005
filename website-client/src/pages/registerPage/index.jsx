import { register, logout } from '../../queries/api/firebase-connect';
import { connect } from 'react-redux';
import { getInfoUserFuc } from '../../redux/actions/actions';
import { getAuth } from 'firebase/auth';
// import firebase from 'firebase/app';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../queries/api/firebase-connect';

function Register(props) {
  let [nameRe, setNameRe] = useState('');
  let [phoneRe, setPhoneRe] = useState('');
  let [addressRe, setAddressRe] = useState('');
  let [emailRe, setEmailRe] = useState('');
  let [passRe, setPassRe] = useState('');
  let [rePassRe, setRePassRe] = useState('');
  let navigate = useNavigate();
  let md5 = require('md5');
  // let currentUser = useAuth();

  const currentUser = getAuth();
  const user = currentUser.currentUser;

  // useEffect(() => {}, [user]);

  async function handleRegister() {
    try {
      if (passRe !== rePassRe) {
        toast.error('Mật khẩu không trùng khớp');
      } else {
        await register(emailRe, passRe)
        .then(async (data) => {
          console.log('id', data.user.uid);
          const useRef = await doc(db, 'users', data.user.uid);
          console.log('useRef', useRef);
          await setDoc(useRef, {
            userID: data.user.uid,
            userName: nameRe,
            email: emailRe,
            fullName: nameRe,
            telephone: phoneRe,
            address: addressRe,
            avatar: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
            isActive: true,
          });
        });
        toast.success('Thành công. Mời đăng nhập !');
        navigate('/login');
      }
    } catch {
      alert('Email đã được đăng ký');
    }
  }

  return (
    <>
      <div className="register-container">
        <h2 className="heading">ĐĂNG KÝ TÀI KHOẢN</h2>
        <form action="" className="register-form">
          <p>HỌ VÀ TÊN</p>
          <input
            type="text"
            onChange={(e) => setNameRe(e.target.value)}
            className="register-surname"
            placeholder="Nhập họ và tên ..."
          />
          <p>SỐ ĐIỆN THOẠI</p>
          <input
            type="text"
            onChange={(e) => setPhoneRe(e.target.value)}
            className="register-phone"
            placeholder="Nhập số điện thoại ..."
          />
          <p>ĐỊA CHỈ</p>
          <input
            type="text"
            onChange={(e) => setAddressRe(e.target.value)}
            className="register-phone"
            placeholder="Nhập địa chỉ liên hệ ..."
          />
          <p>EMAIL</p>
          <input
            type="text"
            onChange={(e) => setEmailRe(e.target.value)}
            className="register-email"
            placeholder="Nhập địa chỉ email"
          />
          <p>MẬT KHẨU</p>
          <input
            type="password"
            onChange={(e) => setPassRe(e.target.value)}
            className="register-pass"
            placeholder="Nhập mật khẩu"
          />
          <p>NHẬP LẠI MẬT KHẨU</p>
          <input
            type="password"
            onChange={(e) => setRePassRe(e.target.value)}
            className="register-re-pass"
            placeholder="Nhập lại mật khẩu"
          />
        </form>
        {/* <Link to="#" className="button btn-register button-c-black" onClick={handleRegister}>
            ĐĂNG KÝ
          </Link> */}
        <button className="button btn-register button-c-black" onClick={handleRegister}>
          ĐĂNG KÝ
        </button>
        <Link to="/login" className="back-login">
          ĐĂNG NHẬP
        </Link>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoUserFuc: (info) => dispatch(getInfoUserFuc(info)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
