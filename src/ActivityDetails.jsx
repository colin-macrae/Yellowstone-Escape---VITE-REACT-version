import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ActivityDetails.css";
import "./queries.css";
import {
  addToMyActivities,
  removeFromCart,
  getActivitiesCart,
} from "./CartFunctions";

export default function ActivityDetails({
  mySavedActivities,
  setMySavedActivities,
  addClicked,
  setAddClicked,
}) {
  const { id } = useParams();
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const cart = getActivitiesCart();
    setMySavedActivities(cart);
  }, [addClicked]);

  useEffect(() => {
    async function loadActivities() {
      try {
        setIsLoading(true);
        const activities = await fetchActivities();
        setActivities(activities);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadActivities();
  }, []);

  if (isLoading)
    return <div className="loading-or-error loading">Loading...</div>;
  if (error) {
    return <div>Error Loading Activities: {error.message}</div>;
  }
  if (!activities) return null;

  // loop through API's JSON data to find current activity's details
  let currentActivity = null;
  function findActivity() {
    for (let i = 0; i < activities.data.length; i++) {
      if (activities.data[i].id === id) {
        currentActivity = activities.data[i];
        return;
      }
    }
  }
  findActivity();

  let added = false;
  if (mySavedActivities) {added = mySavedActivities.some(
    (savedActivity) => savedActivity.id === id
  );}

  const {
    longDescription,
    duration,
    name,
    arePetsPermittedWithRestrictions,
    location,
    season,
    timeOfDay,
    title,
    images,
  } = currentActivity;

  return (
    <div className="container details-container">
      <button
        className="details-like-btn"
        onClick={
          added
            ? () => {
                removeFromCart(currentActivity);
                setAddClicked(!addClicked);
              }
            : () => {
                addToMyActivities(currentActivity);
                setAddClicked(!addClicked);
              }
        }
      >
        {added ? (
          <div>
            <i className="fas fa-heart heart-red"></i>
          </div>
        ) : (
          <div>
            <i className="fas fa-heart heart-transparent"></i>
          </div>
        )}
      </button>

      <h2 className="details-title">{title}</h2>
      <img className="activity-list-img" src={images[0].url} alt={title} />
      <p dangerouslySetInnerHTML={{ __html: longDescription }} />

      {duration !== "" && duration !== undefined && duration != [] ? (
        <div className="description-item-container">
          <p className="description-item-name">Duration:</p>
          <p className="description-item-info">{duration}</p>
        </div>
      ) : null}

      {/* Check for any empty objects before rendering elements conditionally, as the API is inconsistent in how it stores them */}
      {name !== "" && name !== undefined && name != [] ? (
        <div className="description-item-container">
          <p className="description-item-name">Activity type:</p>
          <p className="description-item-info">{name}</p>
        </div>
      ) : null}

      <div className="description-item-container">
        <p className="description-item-name">Pets allowed:</p>
        <p className="description-item-info">
          {arePetsPermittedWithRestrictions === true ? "Yes" : "No"}
        </p>
      </div>

      {location !== "" && location !== undefined && location != [] ? (
        <div className="description-item-container">
          <p className="description-item-name">Location:</p>
          <p className="description-item-info">{location}</p>
        </div>
      ) : null}

      {season !== "" && season !== undefined && season != [] ? (
        <div className="description-item-container">
          <p className="description-item-name">Season:</p>
          <p className="description-item-info">{season[0]}</p>
        </div>
      ) : null}

      {timeOfDay !== "" && timeOfDay !== undefined && timeOfDay != [] ? (
        <div className="description-item-container">
          <p className="description-item-name">Time of Day:</p>
          <p className="description-item-info">{timeOfDay[0]}</p>
        </div>
      ) : null}
    </div>
  );
}

async function fetchActivities() {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX`
  );
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
