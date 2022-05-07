import { NavLink } from 'react-router-dom';

export default function NavOrder() {
  return (
    <>
      <div className="nav-order">
        <ul>
          <li>
            <NavLink to="/user/orders/all">Tất cả</NavLink>
            <NavLink to="/user/orders/delivering">Đang giao</NavLink>
          </li>
          <li>
            <NavLink to="/user/orders/received">Đã nhận</NavLink>
          </li>
          <li>
            <NavLink to="/user/orders/cancelled">Đã hủy</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
