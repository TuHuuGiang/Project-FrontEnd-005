import logo from '../../assets/img/logo/logo.webp';
import Nav from './nav';
import NavMobile from './nav-mobile';
import Search from './search';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../queries/api/firebase-connect';
import { delUserFunc } from '../../redux/actions/actions';

function Header(props) {
  let [active, setActive] = useState(false);
  let navigate = useNavigate();

  let isToggle = () => {
    setActive(!active);
  };

  async function handleLogOut() {
    try {
      await logout();
      localStorage.clear('user');
      props.delUserFunc();
    } catch {
      alert('Error');
    }
  }

  return (
    <>
      <header className="header-container">
        <div className="container">
          {/* Search */}
          <Search propsActive={active} />
          {/* End Search */}
          <div className="header">
            <div className="header-top">
              <div className="header-hotline">
                <span className="hotline-text">HOTLINE: </span>
                <span className="hotline-number">0392790428</span>
              </div>
              {/* Nav Mobile */}
              <NavMobile />
              {/* End Nav Mobile */}
              <div className="header-logo">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="header-icon">
                <Link className="link-cart" to="/cart">
                  <i className="icon fa-solid fa-cart-shopping"></i>
                </Link>
                <i className="icon fa-solid fa-magnifying-glass" onClick={isToggle}></i>
                <div className={props.checkUser.name !== '' ? 'user' : ''}>
                  <Link
                    className={props.checkUser.name !== '' ? 'link-user' : ''}
                    to={props.checkUser.name !== '' ? '/user' : '/login'}
                  >
                    <i className="icon icon-user fa-solid fa-user"></i>
                    <div className="avatar-user">
                      <img src={props.info.avatar} alt="" />
                    </div>
                  </Link>
                  <ul className="user-nav">
                    <li>
                      <Link to="/user/profile">Thông tin</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={handleLogOut}>
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Nav */}
            <Nav />
            {/* End Nav */}
          </div>
        </div>
      </header>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    checkUser: state.checkUser.user,
    info: state.info.infoUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delUserFunc: () => dispatch(delUserFunc()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
