import NavUser from './Nav';
import SideBar from '../../components/SideBar'

import { Outlet } from 'react-router-dom';

export default function Users() {
  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div className="container-product">
          <NavUser />
          <Outlet />
        </div>
      </div>
    </>
  );
}
