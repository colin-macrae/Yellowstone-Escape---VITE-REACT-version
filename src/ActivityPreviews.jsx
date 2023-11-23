import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./index.css";
import "./queries.css";
import { Link } from "react-router-dom";
import {
  addToMyActivities,
  getActivitiesCart,
  removeFromCart,
} from "./CartFunctions";
import { scrollToTop } from "./Header";

const ActivityPreviews = ({
  mySavedActivities,
  setMySavedActivities,
  addClicked,
  setAddClicked
}) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [classNameChange, setClassNameChange] = useState("null");
  const [loading, setLoading] = useState(true);

  // addClicked is added as a dependency as to prevent an infinite loop if  using mySavedActivities as the dependency.  the re-renders are needed when the add button is clicked in order for page to show changes.
  useEffect(() => {
    const cart = getActivitiesCart();
    setMySavedActivities(cart);
  }, [addClicked]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX"
        );
        const data = await response.json();
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToTop();
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToTop();
  };

  const pageIndicators = Array.from(
    { length: Math.ceil(users.length / itemsPerPage) },
    (_, index) => (
      <span
        key={index}
        className={`pagination-dot ${
          currentPage === index + 1 ? "active" : ""
        }`}
        onClick={() => setCurrentPage(index + 1)}
      ></span>
    )
  );

  return (
    <div>
      <div className="container">
        <h2 className="header-secondary activities-list-header">
          Activities List
        </h2>

        <div className="activity-cards-container">
          {currentItems.map((activity, id) => {
            return (
              <div className="activity-card" key={id}>
                <Activity
                  activity={activity}
                  mySavedActivities={mySavedActivities}
                  setMySavedActivities={setMySavedActivities}
                  setAddClicked={setAddClicked}
                  addClicked={addClicked}
                  setClassNameChange={setClassNameChange}
                  classNameChange={classNameChange}
                />
              </div>
            );
          })}
        </div>

        <div className="pagination-container">
          <div className="pagination-controls">
            <div className="pagination-buttons">
              <div>
                {currentPage > 1 && (
                  <button onClick={prevPage}>&larr; Previous</button>
                )}
              </div>
              <div>
                {indexOfLastItem < users.length && (
                  <button onClick={nextPage}>Next &rarr;</button>
                )}
              </div>
            </div>
            <div className="current-page">Page: {currentPage}</div>
            <div className="pagination-dots">{pageIndicators}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Activity({
  activity,
  mySavedActivities,
  setAddClicked,
  addClicked,
  classNameChange,
}) {
  const { id, title, shortDescription, images, location, season } = activity;
  let currentActivity = activity;

  let added = false;
  function savedChecker() {
    if (mySavedActivities) {
      const savedActivities = mySavedActivities;
      for (let i = 0; i < savedActivities.length; i++) {
        if (savedActivities[i].id === id) {
          added = true;
          break;
        }
      }
    }
  }
  savedChecker();

  return (
    <>
      <Link to={`/activitydetails/${id}`} onClick={scrollToTop}>
        <img className="activity-list-img" src={images[0].url} alt={title} />
        <div className="activity-card-text">
          <h3 className="header-tertiary activity-card-title">{title}</h3>
          <p className="activity-card-details">{shortDescription}</p>
          {/* Conditional rendering if objects are empty */}
          {location !== "" && location !== undefined && location != [] ? (
            <p className="activity-card-details">Location: {location}</p>
          ) : null}
          {season !== "" && season !== undefined && season != [] ? (
            <p className="activity-card-details">Season: {season[0]}</p>
          ) : null}
        </div>
      </Link>
      {added ? (
        <div className="add-to-favs-btn">
          <button
            onClick={() => {
              removeFromCart(currentActivity);
              setAddClicked(!addClicked);
            }}
            className={added ? "added" : classNameChange}
          >
            {added ? (
              <i className="fas fa-heart heart-red"></i>
            ) : (
              <i className="fas fa-heart heart-transparent"></i>
            )}
          </button>
        </div>
      ) : (
        <div className="add-to-favs-btn">
          <button
            onClick={() => {
              addToMyActivities(currentActivity);
              setAddClicked(!addClicked);
            }}
            className={added ? "added" : classNameChange}
          >
            {added ? (
              <i className="fas fa-heart heart-red"></i>
            ) : (
              <i className="fas fa-heart heart-transparent"></i>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default ActivityPreviews;
