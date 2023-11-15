import "./index.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { scrollToTop } from "./Header";

function Home() {
  return (
    <div>
      <div className="container hero-section">
        <div className="hero-section-text-container">
          <div>
            <h1 className="home-header heading-primary">
              Looking to Escape? Look no Further.
            </h1>
            <p>
              Discover the top 50 must-experience activities in Yellowstone
              Park. Whether you're snowmobiling in the winter, rock climbing in
              the summer, or marveling at wildlife and the wonders of Mother
              Nature, our guide has you covered.
            </p>
            <Link
              className="see-activities-btn"
              to="/activitypreviews"
              href="#"
              onClick={scrollToTop}
            >
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
    </div>
  );
}
export default Home;
