import { links } from './link';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default function NavOrders() {
  return (
    <>
      <div className="nav-order">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
