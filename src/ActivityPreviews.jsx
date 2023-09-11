////// my experiment with nat parks api below
import { useState, useEffect } from "react";

const ActivityPreviews = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX"
        );
        const users = await response.json();
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // you can put this here but then in the render you must call each variable with "users dot variableName, e.g. users.login"
  // the alternative is to destructure it INSIDE the map function and each one will already be unique, making the object name (e.g. users.login) unnessecary, and you can do like this, e.g. login.
  // const { id, node_id, avatar_url, login } = users;

  return (
    <div>
      <div>
        {users.map((activity) => {
          // in the end i destructured it here instead of outside the map method
          const { id, title, shortDescription, images, location, season } = activity;
          return (
            <div key={id}>
              {/* <img src={user.images.url} alt={"hi"} /> */}
              <div>{title}</div>
              <img style={{ width: "550px" }} src={images[0].url} alt={title} />
              <div>{shortDescription}</div>
              <div>{location}</div>
              <div>{season}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ActivityPreviews;
