import { Link, NavLink } from 'react-router-dom';

import './style.css';

export default function SideBar() {
  return (
    <>
      <div className="side-bar">
          <h2>Admin ClownZ</h2>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <i class="icon fa-solid fa-house-chimney"></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <i class="icon fa-brands fa-product-hunt"></i>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <i class="icon fa-solid fa-user"></i>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              <i class="icon fa-solid fa-cart-shopping"></i>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
