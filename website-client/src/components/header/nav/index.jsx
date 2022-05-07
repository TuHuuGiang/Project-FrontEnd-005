import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export default function Nav(props) {
    return (
        <>
            <div className="header-nav">
                            <ul className="nav">
                                <li className="nav-link">
                                    <Link to="#">
                                        Top
                                        <i className="arrow fa-solid fa-chevron-down"></i>
                                    </Link>
                                    <ul className="sub-nav">
                                        <li className="subnav-link"><Link to="category/hoodie">Hoodie</Link></li>
                                        {/* <li className="subnav-link"><Link to="#">Sweatshirt</Link></li> */}
                                        <li className="subnav-link"><Link to="category/jacket">Jacket</Link></li>
                                        <li className="subnav-link"><Link to="category/t-shirt">T-Shirt</Link></li>
                                        <li className="subnav-link"><Link to="category/shirt">Shirt</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-link">
                                    <Link to="#">
                                        Bottom
                                        <i className="arrow fa-solid fa-chevron-down"></i>
                                    </Link>
                                    <ul className="sub-nav">
                                        <li className="subnav-link"><Link to="category/jean">Jean & Denim</Link></li>
                                        <li className="subnav-link"><Link to="category/pant">Pants</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-link">
                                    <Link to="#">
                                        Accessory
                                        <i className="arrow fa-solid fa-chevron-down"></i>
                                    </Link>
                                    <ul className="sub-nav">
                                        <li className="subnav-link"><Link to="category/bag">Bag</Link></li>
                                        <li className="subnav-link"><Link to="category/backpack">Backpack</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-link"><Link to="">Contact Us</Link></li>
                            </ul>
                        </div>
        </>
    );
}