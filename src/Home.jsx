import "./index.css";
import "./Home.css"; 
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="container">
      <main>
        <h1 className="home-header heading-primary">Yellowstone Escape</h1>
        <Link className="see-activities-btn" to="/activitypreviews" href="#">
          BROWSE ACTIVITIES &rarr;
        </Link>
      </main>
    </div>
  );
}
export default Home;
