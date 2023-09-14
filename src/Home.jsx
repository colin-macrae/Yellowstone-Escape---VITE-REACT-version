import "./index.css";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container hero-section">
      <div className="hero-section-text-container">
        <div>
          <h1 className="home-header heading-primary">
            Looking to Escape? Look no Further.
          </h1>
          <p>Fifty of Yellowstone Park's most unforgettable activities that you simply must experience.</p>
          <Link className="see-activities-btn" to="/activitypreviews" href="#">
            BROWSE ACTIVITIES &rarr;
          </Link>
        </div>
      </div>
      <img
        className="#"
        src="https://www.nps.gov/common/uploads/cropped_image/E0F10DF6-F62B-0546-3A490CD9DCC01051.jpg"
        alt="yellowstone image"
      />
    </div>
  );
}
export default Home;
