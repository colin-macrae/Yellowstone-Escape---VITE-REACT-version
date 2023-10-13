export default function MyActivities () {
  return (
    <h2>My Activities</h2>
  )
}


// cart manipulation functions //
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
