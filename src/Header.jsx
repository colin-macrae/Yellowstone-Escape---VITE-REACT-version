// const url = 'https://course-api.com/react-tours-project';
// import NatParksFetch from "./NatParksFetch";

function Header() {
  return (
    <>
      <header>
        <a className="header-title" href="#">
          Yellowstone Escape
        </a>
        <nav class="main-nav">
          <ul>
            <li>
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                My Activities
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* <main>
        <h2>Yellowstone Escape</h2>
        <a href="#">See activities</a>
      </main>
      <NatParksFetch /> */}
    </>
  );
};
export default Header;
