import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="header">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        Activity Feed
      </Link>
      <Link 
        to="/archive" 
        className={`nav-link ${location.pathname === "/archive" ? "active" : ""}`}
      >
        Archived Calls
      </Link>
    </nav>
  );
};

export default Header;
