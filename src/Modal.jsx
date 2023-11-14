import "./Modal.css"

// Modal
export default function Modal({ showModal, setShowModal, setMySavedActivities }) {
  return (
    <div className={showModal ? "clear-all-modal" : "clear-all-modal hide"}>
      <div className="clear-all-modal-box">
        <div className="clear-all-modal-text">Delete all items?</div>
        <div className="clear-all-btn-container">
          <button
            className="cancel-clear-all-btn"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-clear-all-btn"
            onClick={() => {
              localStorage.removeItem("activities-cart");
              setMySavedActivities([]);
              setShowModal(false);
            }}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}