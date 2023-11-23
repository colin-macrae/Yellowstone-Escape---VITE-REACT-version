import { Activity } from "./ActivityPreviews";
import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./MyActivities.css";
import Modal from "./Modal";
import { scrollToTop } from "./Header";
import { getActivitiesCart, removeFromCart } from "./CartFunctions";

export default function MyActivities({
  mySavedActivities,
  setMySavedActivities
}) {
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



