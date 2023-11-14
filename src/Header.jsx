import "./Header.css"
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="header-title">
          <p>Yellowstone Escape</p>
          <p>LOOK NO FURTHER</p>
        </Link>
        <nav className="main-nav">
          <ul>
            <li>
              <Link
                to="/activitypreviews"
                className="nav-link"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Browse
              </Link>
            </li>
            <li>
              <Link to="/myactivities" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                My Activities
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
