import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavMobile() {
  let [showNav, setShowNav] = useState(false);

  let handleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <div className="header-navbar">
        <i className="icon-navbar fa-solid fa-bars" onClick={handleNav}></i>
      </div>
      <div className={showNav ? 'navbar activess' : 'navbar'}>
        <div className="navbar-link">
          <ul>
            <li>
              <Link to="">Top</Link>
            </li>
            <li>
              <Link to="">Bottom</Link>
            </li>
            <li>
              <Link to="">Accessory</Link>
            </li>
            <li>
              <Link to="">Contact Us</Link>
            </li>
          </ul>
          <i className="icon-close fa-solid fa-xmark" onClick={() => setShowNav(false)}></i>
        </div>
      </div>
    </>
  );
}
