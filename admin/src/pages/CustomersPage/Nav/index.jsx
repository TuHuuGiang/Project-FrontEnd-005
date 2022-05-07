import { links } from './link';
import './style.scss';
import { NavLink } from 'react-router-dom';

export default function NavUser() {
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