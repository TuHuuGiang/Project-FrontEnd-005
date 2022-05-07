import { db, reAuth, useAuth } from '../../../queries/api/firebase-connect';
import { changePassword } from '../../../queries/api/firebase-connect';
import { doc, updateDoc } from 'firebase/firestore';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { EmailAuthProvider } from 'firebase/auth';

import { storage } from '../../../queries/api/firebase-connect';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function Profile(props) {
  let [toggle, setToggle] = useState(false);
  let [toggleC, setToggleC] = useState(false);
  let [name, setName] = useState('');
  let [userName, setUserName] = useState('');
  let [phone, setPhone] = useState();
  let [address, setAddress] = useState('');
  let [image, setImage] = useState(null);
  let [url, setUrl] = useState('');
  let [newPass, setNewPass] = useState('');
  let newPassRef = useRef();
  let rePass = useRef();

  let user = useAuth();

  let updateProfile = () => {
    if (image === null) {
      const docRef = doc(db, 'users', props.info.userID);
      updateDoc(docRef, {
        fullName: name || props.info.fullName,
        userName: userName || props.info.userName,
        telephone: Number(phone),
        address: address,
      });
      toast.success('Thay đổi thành công !!!');
    } else {
      updateAvatar();
      const docRef = doc(db, 'users', props.info.userID);
      updateDoc(docRef, {
        fullName: name || props.info.fullName,
        userName: userName || props.info.userName,
        telephone: Number(phone),
        address: address,
      });
      toast.success('Thay đổi thành công 2 !!!');
    }
  };

  let updateAvatar = async () => {
    let idLocal = JSON.parse(localStorage.getItem('user'));
    const imageRef = await ref(storage, `avatars/${image.name}`);
    console.log('imageRef', imageRef);
    await uploadBytes(imageRef, image)
      .then(async () => {
        await getDownloadURL(imageRef)
          .then(async (url) => {
            const docRef = doc(db, 'users', idLocal.id);
            await updateDoc(docRef, {
              avatar: url,
            });
            setUrl(url);
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  async function reAuthFunc(e) {
    e.preventDefault();
    let credential = EmailAuthProvider.credential(user.email, rePass.current.value);
    try {
      await reAuth(credential);
      console.log('test', rePass.current.value);
      setToggle(false);
      rePass.current.value = '';
      setToggleC(true);
    } catch {
      toast.error('Mật khẩu sai');
    }
  }

  async function updatePasswordFunc(e) {
    e.preventDefault();
    try {
      await changePassword(newPassRef.current.value);
      toast.success('Thành công');
      newPassRef.current.value = '';
      setToggleC(false);
    } catch {
      toast.error('Không thành công');
    }
  }

  let handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="content">
        <div className="profile">
          <div className="profile-left">
            <h4 className="heading">Thông tin cá nhân</h4>
            <div className="info-container">
              <div className="avatar-container">
                <div className="avatar-view">
                  <img src={url == '' ? props.info.avatar : url} alt="" />
                </div>
                <div className="edit">
                  <label htmlFor="upload">
                    <i className="fa-solid fa-pen"></i>
                  </label>
                  <input type="file" id="upload" onChange={(e) => handleChangeImage(e)} />
                </div>
              </div>
              <div className="info">
                <div className="info-name">
                  <span>Họ & Tên</span>
                  <input
                    type="text"
                    defaultValue={props.info.fullName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="info-username">
                  <span>Username</span>
                  <input
                    type="text"
                    defaultValue={props.info.userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="info-phone">
              <span>Số điện thoại</span>
              <input
                type="text"
                defaultValue={String(props.info.telephone)}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="info-address">
              <span>Địa chỉ</span>
              <input
                type="text"
                defaultValue={props.info.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="save-profile">
              <button className="button button-c-black" onClick={updateProfile}>
                Lưu thay đổi
              </button>
            </div>
          </div>
          <div className="profile-right">
            <h4 className="heading">Bảo mật</h4>
            <div className="user">
              <div className="user-content">
                <i className="icon fa-solid fa-lock"></i>
                Thiết lập mật khẩu
              </div>
              <button onClick={() => setToggle(true)} className="update">
                Cập nhập
              </button>
            </div>
            <h4 className="heading">Liên kết mạng xã hội</h4>
            <div className="user">
              <div className="user-content">
                <i className="icon fa-brands fa-facebook"></i>
                Facebook
              </div>
              <a href="#" className="update">
                Liên kết
              </a>
            </div>
            <div className="user">
              <div className="user-content">
                <i className="icon fa-brands fa-google"></i>
                Google
              </div>
              <a href="#" className="update">
                Liên kết
              </a>
            </div>
          </div>
        </div>
        {/* Re Auth */}
        <div className={toggle ? 'modal-container active-modal' : 'modal-container'}>
          <div className="modal">
            <div className="modal-content">
              <h4>Nhập mật khẩu</h4>
              <input
                type="text"
                className="url-product"
                ref={rePass}
                placeholder="Nhập mật khẩu ..."
                // onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className="modal-button">
              <button className="edit" onClick={(e) => reAuthFunc(e)}>
                Tiếp tục
              </button>
              <button className="cancel" onClick={() => setToggle(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
        {/* Re Auth */}
        <div className={toggleC ? 'modal-container active-modal' : 'modal-container'}>
          <div className="modal">
            <div className="modal-content">
              <h4>Thay đổi mật khẩu</h4>
              <input
                type="text"
                ref={newPassRef}
                className="url-product"
                placeholder="Nhập mật khẩu cần đổi ..."
                // onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className="modal-button">
              <button className="edit" onClick={(e) => updatePasswordFunc(e)}>
                Cập nhập
              </button>
              <button className="cancel" onClick={() => setToggleC(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    info: state.info.infoUser,
  };
};

export default connect(mapStateToProps, null)(Profile);
