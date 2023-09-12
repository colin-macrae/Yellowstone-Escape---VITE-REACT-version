// const url = 'https://course-api.com/react-tours-project';
// import NatParksFetch from "./NatParksFetch";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import "./index.css";
import ActivityPreviews from "./ActivityPreviews";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activitypreviews" element={<ActivityPreviews />} />
      </Routes>
    </div>
  );
};
export default App;
