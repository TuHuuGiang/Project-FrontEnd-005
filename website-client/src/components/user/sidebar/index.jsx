import { Link, NavLink } from "react-router-dom";

export default function SideBarUser() {
    return (
      <>
        <div className="side-bar">
          <ul>
            <li>
              <NavLink to="profile">
                <i className="icon fa-solid fa-user"></i>
                Thông tin tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink to="orders">
                <i className="icon fa-solid fa-receipt"></i>
                Đơn hàng của bạn
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <i className="icon fa-solid fa-heart"></i>
                Sản phẩm yêu thích
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders">
                <i className="icon fa-solid fa-star-half-stroke"></i>
                Nhận xét của tôi
              </NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  }
  