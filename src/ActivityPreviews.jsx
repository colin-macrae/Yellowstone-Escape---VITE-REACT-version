import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./index.css";
import "./queries.css";
import { Link } from "react-router-dom";
import { addToMyActivities } from "./MyActivities";
import { getActivitiesCart } from "./MyActivities";

const ActivityPreviews = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [number, setNumber] = useState(true);



  const [mySavedActivities, setMySavedActivities] = useState([]);
  
  useEffect(() => {
    const cart = getActivitiesCart();
    setMySavedActivities(cart);
  }, [number]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX"
        );
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
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

        <div className="activity-cards-contaier">
          {currentItems.map((activity, id) => {
            return (
              <div className="activity-card" key={id}>
                <Activity
                  activity={activity}
                  mySavedActivities={mySavedActivities} 
                  setMySavedActivities={setMySavedActivities}
                  setNumber={setNumber}
                  number={number}
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
            <div className="pagination-dots">{pageIndicators}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Activity({ activity, mySavedActivities, setNumber, number }) {
  const { id, title, shortDescription, images, location, season } = activity;
  let currentActivity = activity;

  console.log(mySavedActivities)

  let added = false;
  function savedChecker() {
    if (mySavedActivities) {
      const savedActivities = mySavedActivities;
      for (let i = 0; i < savedActivities.length; i++) {
        if (savedActivities[i].id === id) {
          added = true;
          console.log(added);
        }
      }
    }
  }
  savedChecker();

  return (
    <>
      <Link to={`/activitydetails/${id}`}>
        <img className="activity-list-img" src={images[0].url} alt={title} />
        <div className="activity-card-text">
          <h3 className="header-tertiary activity-card-title">{title}</h3>
          <p className="activity-card-details">{shortDescription}</p>
          <p className="activity-card-details">Location: {location}</p>
          <p className="activity-card-details">Season: {season}</p>
        </div>
      </Link>
      <div className="add-to-favs-btn">
        <button
          onClick={() => {
            addToMyActivities(currentActivity);
            setNumber(!number); 
          }}
        >
          {added ? "Added to Favorites" : "Add to Favorites"}
        </button>
      </div>
    </>
  );
}

export default ActivityPreviews;
