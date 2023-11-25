import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import "./index.css";
import ActivityPreviews from "./ActivityPreviews";
import ActivityDetails from "./ActivityDetails";
import MyActivities from "./MyActivities";
import Footer from "./Footer";
import { useState } from "react";

const App = () => {
  const [mySavedActivities, setMySavedActivities] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  return (
    <div className="outer-container">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/activitypreviews"
          element={
            <ActivityPreviews
              setMySavedActivities={setMySavedActivities}
              mySavedActivities={mySavedActivities}
              setAddClicked={setAddClicked}
              addClicked={addClicked}
            />
          }
        />
        <Route
          path="/activitydetails/:id"
          element={
            <ActivityDetails
              setMySavedActivities={setMySavedActivities}
              mySavedActivities={mySavedActivities}
              setAddClicked={setAddClicked}
              addClicked={addClicked}
            />
          }
        />
        <Route
          path="/myactivities"
          element={
            <MyActivities
              setMySavedActivities={setMySavedActivities}
              mySavedActivities={mySavedActivities}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
