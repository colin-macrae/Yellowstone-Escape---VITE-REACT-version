import "./index.css";
import { Link } from "react-router-dom";
import "./Home.css"; 

function Home() {
  return (
    <div className="container">
      <main>
        <h1 className="home-header heading-primary">Yellowstone Escape</h1>
        <Link className="see-activities-btn" to="/activitypreviews" href="#">See activities</Link>
      </main>
    </div>
  );
}
export default Home;
