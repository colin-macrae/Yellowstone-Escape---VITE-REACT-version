import { Activity } from "./ActivityPreviews";
import { useState, useEffect } from "react";

export default function MyActivities () {
  const [mySavedActivities, setMySavedActivities] = useState([]);

  useEffect(() => {
    const activities = getActivitiesCart();
    setMySavedActivities(activities);
  }, []);

  let myActivities = getActivitiesCart();
  return (
    <div>
      <div className="container">
        <p className="under-construction">**page under construction**</p>
        
        <h2 className="header-secondary activities-list-header">
          My Activities
        </h2>
        <div className="activity-cards-container">
          {myActivities.map((activity) => (
            <div className="activity-card" key={activity.id}>
              <Activity activity={activity} />
              <button onClick={() => removeFromCart(activity)}>
                Remove from My Activities
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("activities-cart");
            setMySavedActivities([]);
          }}
        >
          Clear all My Activities
        </button>
      </div>
    </div>
  );
}

// ***************************//
// CART MANIPULATION FUNCTIONS//
// ***************************//
export function getActivitiesCart() {
  let activitiesCart = JSON.parse(localStorage.getItem("activities-cart"));
  if (activitiesCart === null) {
    return [];
  } else return activitiesCart;
}


