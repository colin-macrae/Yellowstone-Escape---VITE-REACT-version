import { Activity } from "./ActivityPreviews";

export default function MyActivities () {
  let myActivities = getActivitiesCart();
  return (
    <div>
      <div className="container">
        <p className="under-construction">**page under construction**</p>

        <p className="under-construction">
          fix: Remove from My Activities button
        </p>
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
            window.location.reload();
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

const items = getActivitiesCart();
const cartItemsQuantity = items.length;
console.log(cartItemsQuantity)

export function addToMyActivities(currentActivity) {
  const activitiesCart = items;
  for (let i = 0; i < activitiesCart.length; i++) {
    if (activitiesCart[i].id === currentActivity.id) {
      alert("This activity has already been added.");
      return;
    }
  }
  activitiesCart.push(currentActivity);
  localStorage.setItem("activities-cart", JSON.stringify(activitiesCart));
  window.location.reload();
}

export function removeFromCart(currentActivity) {
  let cart = items;
  const newCart = items.filter(
    (item) => currentActivity.id !== currentActivity.id
  );
  localStorage.setItem("activities-cart", JSON.stringify(newCart));
  window.location.reload();
}
