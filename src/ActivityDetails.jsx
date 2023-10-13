import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ActivityDetails.css";
import "./queries.css"
import { addToMyActivities } from "./MyActivities.jsx";


export default function ActivityDetails () {
  const { id } = useParams();
  const [activity, setActivity] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadActivity(id) {
      try {
        setIsLoading(true);
        const activity = await fetchActivity(id);
        setActivity(activity);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadActivity(id);
  }, [id]);

  if (isLoading) return <div className="loading-or-error">Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {id}: {error.message}
      </div>
    );
  }
  if (!activity) return null;

  // loop through API's JSON data to find current activity's details
  let currentActivity = null;
  function findActivity () {
    for (let i = 0; i < activity.data.length; i++) {
      if (activity.data[i].id === id) {
        currentActivity = activity.data[i];        
        return currentActivity
      }
    }
  }
  findActivity()

  return (
    <div className="container details-container">
      <p className="under-construction">**page under construction**</p>
      <p>{currentActivity.title}</p>
      <img
        className="activity-list-img"
        src={currentActivity.images[0].url}
        alt={currentActivity.title}
      />
      <p
        dangerouslySetInnerHTML={{ __html: currentActivity.longDescription }}
      />
      <p>Duration: {currentActivity.duration}</p>
      <p>Activity type: {currentActivity.activities.name}</p>
      <p>Pets allowed: {currentActivity.arePetsPermittedWithRestrictions}</p>
      <p>Location: {currentActivity.location}</p>
      <p>Season: {currentActivity.season}</p>
      <p>Time of Day: {currentActivity.timeOfDay}</p>
      <p>Accessibility information:</p>
      <p
        dangerouslySetInnerHTML={{
          __html: currentActivity.accessibilityInformation,
        }}
      />
      <button onClick={() => addToMyActivities(currentActivity)}>
        Add to Favorites
      </button>
      
    </div>
  );
}

async function fetchActivity(id) {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX`
  );
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();  
}
