const ViewUserModal = ({ show, onClose, userDetails }: any) => {
  if (!userDetails) return null;

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
            <h5 className="modal-title">User Details</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img
                src={userDetails.profile}
                alt="User Profile"
                className="img-fluid rounded-circle border border-3 border-muted"
                width="100"
                height="100"
              />
            </div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{userDetails?.name || "-"}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{userDetails?.email || "-"}</td>
                </tr>
                <tr>
                  <th>Role</th>
                  <td>{userDetails?.role?.name || "-"}</td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{userDetails?.dob || "-"}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{userDetails?.gender_text || "-"}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{userDetails?.status_text || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
