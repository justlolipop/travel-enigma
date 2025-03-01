import { Link, Outlet } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav_logo">
          <Link to="/">
            <img src="/image/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="nav_links">
          <li className="link">
            <Link to="/">HOME</Link>
          </li>
          <li className="link">
            <Link to="/explore">EXPLORE</Link>
          </li>
          <li className="link">
            <Link to="/reservation">RESERVATIONS</Link>
          </li>
          <li className="link">
            <Link to="/aboutus">ABOUT US</Link>
          </li>
          <li className="signin">
            <Link to="/signin">SIGN IN <i className="fa-solid fa-user"></i></Link>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* This renders the current route's content */}
    </>
  );
};

export default Navbar;
