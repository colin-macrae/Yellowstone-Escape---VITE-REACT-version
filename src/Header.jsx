import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <Link to="/" className="header-title" href="#">
          Yellowstone Escape
        </Link>
        <nav class="main-nav">
          <ul>
            {/* <li>
              <Link to="/" className="nav-link" href="#">
                Home
              </Link>
            </li> */}
            <li>
              <a className="nav-link" href="#">
                My Activities
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
