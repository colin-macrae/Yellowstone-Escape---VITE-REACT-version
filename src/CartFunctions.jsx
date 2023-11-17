// These functions manipulate items in "My Activities"
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