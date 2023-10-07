import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import "./index.css";
import ActivityPreviews from "./ActivityPreviews";
import ActivityDetails from "./ActivityDetails";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activitypreviews" element={<ActivityPreviews />} />
        <Route path="/activitydetails/:id" element={<ActivityDetails />} />
      </Routes>
    </div>
  );
};
export default App;
