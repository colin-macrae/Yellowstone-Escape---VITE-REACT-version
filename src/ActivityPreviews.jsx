////// my experiment with nat parks api below
import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./index.css";

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
      <div className="container">
        <h2 className="header-secondary activities-list-header">
          Activities List
        </h2>

        <div className="activity-cards-contaier">
          {users.map((activity) => {
            // in the end i destructured it here instead of outside the map method
            const { id, title, shortDescription, images, location, season } =
              activity;
            return (
              <div className="activity-card" key={id}>
                <img
                  className="activity-list-img"
                  src={images[0].url}
                  alt={title}
                />
                <h3 className="header-tertiary">{title}</h3>
                <div>{shortDescription}</div>
                <div>{location}</div>
                <div>{season}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ActivityPreviews;
