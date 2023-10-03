import { useState, useEffect } from "react";
import "./ActivityPreviews.css";
import "./index.css";
import "./queries.css";

const ActivityPreviews = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX"
        );
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const pageIndicators = Array.from(
    { length: Math.ceil(users.length / itemsPerPage) },
    (_, index) => (
      <span
        key={index}
        className={`pagination-dot ${
          currentPage === index + 1 ? "active" : ""
        }`}
        onClick={() => setCurrentPage(index + 1)}
      ></span>
    )
  );

  return (
    <div>
      <div className="container">
        <h2 className="header-secondary activities-list-header">
          Activities List
        </h2>

        <div className="activity-cards-contaier">
          {currentItems.map((activity, id) => {            
            return (
              <div className="activity-card" key={id}>

                <Activity activity={activity} />

              </div>
            );
          })}
        </div>

        <div className="pagination-container">
          <div className="pagination-controls">
            <div className="pagination-buttons">
              <div>
                {currentPage > 1 && (
                  <button onClick={prevPage}>&larr; Previous</button>
                )}
              </div>
              <div>
                {indexOfLastItem < users.length && (
                  <button onClick={nextPage}>Next &rarr;</button>
                )}
              </div>
            </div>
            <div className="pagination-dots">{pageIndicators}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Activity({ activity }) {
  const { id, title, shortDescription, images, location, season } = activity;
  return (
    <>
      <img className="activity-list-img" src={images[0].url} alt={title} />
      <div className="activity-card-text">
        <h3 className="header-tertiary activity-card-title">{title}</h3>
        <p className="activity-card-details">Description: {shortDescription}</p>
        <p className="activity-card-details">Location: {location}</p>
        <p className="activity-card-details">Season: {season}</p>
        <div className="add-to-favs-btn">
          <button>Add to Favorites</button>
        </div>
      </div>
    </>
  );
}

export default ActivityPreviews;


























// ////// my experiment with nat parks api below
// import { useState, useEffect } from "react";
// import "./ActivityPreviews.css";
// import "./index.css";

// const ActivityPreviews = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://developer.nps.gov/api/v1/thingstodo?parkCode=yell&api_key=iSpPR5udcPCzijjVFDgRMe2hLAfepOt9jbFeGFjX"
//         );
//         const users = await response.json();
//         setUsers(users.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   // you can put this here but then in the render you must call each variable with "users dot variableName, e.g. users.login"
//   // the alternative is to destructure it INSIDE the map function and each one will already be unique, making the object name (e.g. users.login) unnessecary, and you can do like this, e.g. login.
//   // const { id, node_id, avatar_url, login } = users;

//   return (
//     <div>
//       <div className="container">
//         <h2 className="header-secondary activities-list-header">
//           Activities List
//         </h2>

//         <div className="activity-cards-contaier">
//           {users.map((activity) => {
//             // in the end i destructured it here instead of outside the map method
//             const { id, title, shortDescription, images, location, season } =
//               activity;
//             return (
//               <div className="activity-card" key={id}>
//                 <img
//                   className="activity-list-img"
//                   src={images[0].url}
//                   alt={title}
//                 />

//                 <div className="activity-card-text">
//                   <h3 className="header-tertiary activity-card-title">
//                     {title}
//                   </h3>
//                   <p className="activity-card-details">Description: {shortDescription}</p>
//                   <p className="activity-card-details">Location: {location}</p>
//                   <p className="activity-card-details">Season: {season}</p>
//                   <div className="add-to-favs-btn">
//                     <button>Add to Favorites</button>
//                   </div>

//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       </div>
//     </div>
//   );
// };
// export default ActivityPreviews;
