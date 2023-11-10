import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import "./index.css";
import ActivityPreviews from "./ActivityPreviews";
import ActivityDetails from "./ActivityDetails";
import MyActivities from "./MyActivities";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activitypreviews" element={<ActivityPreviews />} />
        <Route path="/activitydetails/:id" element={<ActivityDetails />} />
        <Route path="/myactivities" element={<MyActivities />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
