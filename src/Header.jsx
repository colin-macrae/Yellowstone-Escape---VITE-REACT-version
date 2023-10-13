import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <Link to="/" className="header-title" href="#">
          <p>Yellowstone Escape</p>
          <p>LOOK NO FURTHER</p>
        </Link>
        <nav class="main-nav">
          <ul>
            <li>
              <Link to="/activitypreviews" className="nav-link" href="#">
                Browse
              </Link>
            </li>
            <li>
              <Link to="/myactivities" className="nav-link" href="#">
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
