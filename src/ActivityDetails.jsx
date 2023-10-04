import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityPreviews from "./ActivityPreviews";


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
    <div>
      <p>{currentActivity.title}</p>
      <p>(under construction)</p>
    </div>
  );
}

async function fetchActivity(id) {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX`
  );
  // console.log(res);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();  
}
