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
      alert("Activities may only be added to cart once.");
      return;
    }
  }
  activitiesCart.push(currentActivity);
  localStorage.setItem("activities-cart", JSON.stringify(activitiesCart));
  window.location.reload();
}
