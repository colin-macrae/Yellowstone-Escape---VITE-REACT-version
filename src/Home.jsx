import "./index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main>
        <h2>Yellowstone Escape</h2>
        <Link to="/activitypreviews" href="#">See activities</Link>
      </main>
    </>
  );
}
export default Home;
