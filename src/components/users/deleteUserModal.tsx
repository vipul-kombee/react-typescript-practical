const DeleteUserModal = ({ show, onClose, onConfirm, deleteId }: any) => {
  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {Array.isArray(deleteId) ? "Delete Multiple Users" : "Delete User"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>
              {Array.isArray(deleteId)
                ? `Are you sure you want to delete ${deleteId.length} users?`
                : "Are you sure you want to delete this user?"}
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteUserModal;
