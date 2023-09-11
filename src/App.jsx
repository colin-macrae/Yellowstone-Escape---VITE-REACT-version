// const url = 'https://course-api.com/react-tours-project';
// import NatParksFetch from "./NatParksFetch";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./home";
import "./index.css";
import ActivityPreviews from "./ActivityPreviews";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activitypreviews" element={<ActivityPreviews />} />
        {/* <Route path="/womensproducts" element={<WomensProducts />} />
        <Route path="/mensproducts" element={<MensProducts />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};
export default App;
