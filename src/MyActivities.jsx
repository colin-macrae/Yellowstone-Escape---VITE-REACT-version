import { Activity } from "./ActivityPreviews";
import { useState, useEffect } from "react";
import "./ActivityPreviews.css";

export default function MyActivities() {
  const [mySavedActivities, setMySavedActivities] = useState([]);

  // removeFromCart function is duplicated below as it must be able to setMySavedActivities directly within the scope of this function, and therefor the difference between the duplicates is the added line in the function below: setMySavedActivities(newCart).  the out-of-scope function below this component cannot update useState.
  function removeFromCart(currentActivity) {
    let activitiesCart = getActivitiesCart();
    const newCart = activitiesCart.filter(
      (activitiesCart) => activitiesCart.id !== currentActivity.id
    );
    localStorage.setItem("activities-cart", JSON.stringify(newCart));
    setMySavedActivities(newCart);
  }

  useEffect(() => {
    const activities = getActivitiesCart();
    setMySavedActivities(activities);
  }, []);

  const myActivities = mySavedActivities;
  console.log(myActivities.length);

  return (
    <div>
      <div className="container">
        <p className="under-construction">**page under construction**</p>

        <h2 className="header-secondary activities-list-header">
          My Activities
        </h2>
        <div className="activity-cards-container">
          {myActivities.length > 0 ? (
            myActivities.map((activity) => (
              <div className="activity-card" key={activity.id}>
                <Activity activity={activity} />
                <button onClick={() => removeFromCart(activity)}>
                  Remove from My Activities
                </button>
              </div>
            ))
          ) : (
            <div className="no-favs">No items added to My Favorites</div>
          )}
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

export function addToMyActivities(currentActivity) {
  const activitiesCart = getActivitiesCart();
  for (let i = 0; i < activitiesCart.length; i++) {
    if (activitiesCart[i].id === currentActivity.id) {
      alert("This activity has already been added.");
      return;
    }
  }
  activitiesCart.push(currentActivity);
  localStorage.setItem("activities-cart", JSON.stringify(activitiesCart));
}

export function removeFromCart(currentActivity) {
  let activitiesCart = getActivitiesCart();
  const newCart = activitiesCart.filter(
    (activitiesCart) => activitiesCart.id !== currentActivity.id
  );
  localStorage.setItem("activities-cart", JSON.stringify(newCart));
}
