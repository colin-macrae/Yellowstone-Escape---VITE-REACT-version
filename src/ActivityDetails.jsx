import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ActivityDetails.css";
import "./queries.css"
// import { addToMyActivities } from "./MyActivities.jsx";
// import { removeFromCart } from "./MyActivities.jsx";
import { getActivitiesCart } from "./MyActivities";


export default function ActivityDetails () {
  const { id } = useParams();
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [myActivities, setMyActivities] = useState([]);

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

  if (isLoading) return <div className="loading-or-error">Loading...</div>;
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
        return currentActivity;
      }
    }
  }
  findActivity();

  // ***************************//
  // CART MANIPULATION FUNCTIONS//
  // ***************************//
  const items = getActivitiesCart();
  const cartItemsQuantity = items.length;

  function addToMyActivities(currentActivity) {
    const activitiesCart = items;
    for (let i = 0; i < activitiesCart.length; i++) {
      if (activitiesCart[i].id === currentActivity.id) {
        alert("This activity has already been added.");
        return;
      }
    }
    activitiesCart.push(currentActivity);
    localStorage.setItem("activities-cart", JSON.stringify(activitiesCart));
    setMyActivities(items);
  }
  console.log(myActivities);

  function removeFromCart(currentActivity) {
    let cart = items;
    const newCart = items.filter((item) => item.id !== currentActivity.id);
    localStorage.setItem("activities-cart", JSON.stringify(newCart));
    setMyActivities(items);
  }
  console.log(myActivities);

  return (
    <div className="container details-container">
      <p className="under-construction">**page under construction**</p>
      <p>{currentActivity.title}</p>
      <img
        className="activity-list-img"
        src={currentActivity.images[0].url}
        alt={currentActivity.title}
      />
      <p
        dangerouslySetInnerHTML={{ __html: currentActivity.longDescription }}
      />
      <p>Duration: {currentActivity.duration}</p>
      <p>Activity type: {currentActivity.activities.name}</p>
      <p>Pets allowed: {currentActivity.arePetsPermittedWithRestrictions}</p>
      <p>Location: {currentActivity.location}</p>
      <p>Season: {currentActivity.season}</p>
      <p>Time of Day: {currentActivity.timeOfDay}</p>
      <p>Accessibility information:</p>
      <p
        dangerouslySetInnerHTML={{
          __html: currentActivity.accessibilityInformation,
        }}
      />
      <button onClick={() => addToMyActivities(currentActivity)}>
        Add to Favorites
      </button>
      <button onClick={() => removeFromCart(currentActivity)}>
        Remove from My Activities
      </button>
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





