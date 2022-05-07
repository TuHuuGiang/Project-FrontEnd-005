import SideBar from '../../components/SideBar';
import Nav from './Nav';
import AllProducts from './AllProducts';

import './style.scss';
import { Outlet } from 'react-router-dom';

function Products() {
  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div className="container-product">
          <Nav />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Products;
