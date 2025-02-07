const ViewActivitylogModal = ({ show, onClose, activityDetails }: any) => {
  if (!activityDetails) return null;

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      id="myModal"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Activity Details</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Date</th>
                  <td>{activityDetails?.created_at || "-"}</td>
                </tr>
                <tr>
                  <th>User</th>
                  <td>{activityDetails?.causer_name || "-"}</td>
                </tr>
                <tr>
                  <th>Module</th>
                  <td>{activityDetails?.log_name || "-"}</td>
                </tr>
                <tr>
                  <th>Activity</th>
                  <td>{activityDetails?.description || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewActivitylogModal;
