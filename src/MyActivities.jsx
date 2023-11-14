import { Activity } from "./ActivityPreviews";
import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./MyActivities.css";
import Modal from "./Modal";
import { scrollToTop } from "./Header";

export default function MyActivities() {
  const [mySavedActivities, setMySavedActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    const activities = getActivitiesCart();
    setMySavedActivities(activities);
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="header-secondary activities-list-header">
          My Activities
        </h2>
        <div className="activity-cards-container">
          {mySavedActivities.length > 0 ? (
            mySavedActivities.map((activity) => (
              <div className="activity-card" key={activity.id}>
                <Activity activity={activity} />
                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(activity);
                    setMySavedActivities(getActivitiesCart());
                    scrollToTop();
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="no-favs">No items added to My Favorites</div>
          )}
        </div>
        {mySavedActivities.length > 0 ? (
          <button
            className="remove-all-btn"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Clear all My Activities
          </button>
        ) : (
          ""
        )}
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          setMySavedActivities={setMySavedActivities}
        />
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
