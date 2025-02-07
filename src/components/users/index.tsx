import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CSVDownloader from "react-csv-downloader";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../store/reducer";

import DeleteUserModal from "./deleteUserModal";
import ViewUserModal from "./viewUserModal";
import * as UsersActions from "./usersActions";
import { USERS, ADD_USERS, EDIT_USERS } from "../../global/routes";
import Table from "../../pages/dataTable";
import { notification } from "../../pages/notificationContainer/notification";
import { NotificationContainer } from "../../pages/notificationContainer";

const Users: FC = (props: any) => {
  const { users, actions } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstInit, setFirstInit] = useState(false);
  const [resData, setResData] = useState<any>([]);
  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [pending, setPending] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  useEffect(() => {
    if (firstInit) {
      setPending(true);
      const filterParam = selectedRole
        ? JSON.stringify({ role_id: [selectedRole] })
        : undefined;

      // Base64 encode the filter parameter
      // const encodedFilter = filterParam ? btoa(filterParam) : undefined;

      actions.getUsersRequest({
        page,
        perPage,
        filter: filterParam,
        search,
        sort: sortColumn,
        orderBy: sortDirection,
      });
      actions.getUserRoleRequest();
    }
  }, [
    firstInit,
    page,
    perPage,
    selectedRole,
    search,
    sortColumn,
    sortDirection,
  ]);

  useEffect(() => {
    setFirstInit(true);
  }, [page, perPage, selectedRole, search, sortColumn, sortDirection]);

  useEffect(() => {
    if (typeof users?.usersData?.data !== "undefined") {
      setResData(users?.usersData?.data);
      setPending(false);
    }
  }, [users?.usersData]);

  useEffect(() => {
    if (users?.resDeleteUser !== undefined && !users.isUserDelete) {
      notification(
        users?.resDeleteUser?.message ?? "Delete User Successfully!",
        "success"
      );
      dispatch({
        type: UsersActions.ActionTypes.USER_DELETE_SUCCESS,
        resDeleteUser: undefined,
      });
      actions.getUsersRequest({ page: 1, perPage: 5 });
    }
    dispatch({
      type: UsersActions.ActionTypes.USER_DELETE_FAILURE,
      deleteerror: undefined,
    });
  }, [users?.resDeleteUser, users.isUserDelete, users.deleteerror]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
  };

  const handleChange = ({ selectedRows }: any) => {
    const selectedIds: any = new Set(selectedRows.map((row: any) => row.id));
    setSelectedUsers(selectedIds);
  };

  const handleDelete = (row: any) => {
    setDeleteId(row);
    setShowModal(true);
  };

  const handleView = (row: any) => {
    setUserDetails(row);
    setShowViewModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleConfirmDelete = () => {
    actions.deleteUsersRequest({ id: [deleteId?.id] });
    setShowModal(false);
  };

  const handleMultiDelete = () => {
    if (selectedUsers.size === 0) {
      alert("Please select at least one user to delete.");
      return;
    }
    setDeleteId(Array.from(selectedUsers));
    setShowBulkDeleteModal(true);
  };

  const handleConfirmMultiDelete = () => {
    actions.deleteUsersRequest({ id: deleteId });
    setShowBulkDeleteModal(false);
    setSelectedUsers(new Set());
  };

  const handleSortChange = () => {
    setSortColumn("name");
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const columns: any = [
    {
      name: "Name",
      selector: (row: any) => row?.name || "-",
      sortable: true,
      onSort: handleSortChange,
    },
    {
      name: "Email",
      selector: (row: any) => row?.email || "-",
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => row.role?.name || "-",
    },
    {
      name: "Dob",
      selector: (row: any) => row?.dob || "-",
    },
    {
      name: "Gender",
      selector: (row: any) => row?.gender_text || "-",
    },
    {
      name: "Status",
      selector: (row: any) => row?.status_text || "-",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            className="btn btn-primary"
            onClick={() => handleView(row)}
            title="View"
          >
            <i className="fa-regular fa-eye"></i>
          </button>
          <button
            className="btn btn-success m-2"
            onClick={() => navigate(`${USERS}${EDIT_USERS}/${row?.id}`)}
            title="Edit"
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row)}
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#myModal"
            title="Delete"
            disabled={selectedUsers.size > 1}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          {/* Search Input */}
          <div className="d-flex">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="form-control me-3"
              style={{ width: "200px" }}
            />
          </div>

          <div className="d-flex gap-2">
            {/* Filter Dropdown */}
            <select
              className="form-select"
              style={{ width: "150px" }}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              {users?.userRole?.map((role: any) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>

            {/* Add User Button */}
            <button
              onClick={() => navigate(`${USERS}${ADD_USERS}`)}
              className="btn btn-success"
              title="Add"
            >
              <i className="fa-solid fa-plus"></i>
            </button>

            {/* Multiple Delete Button */}
            <button
              onClick={handleMultiDelete}
              className="btn btn-danger"
              disabled={selectedUsers.size <= 1}
              title="Multiple Delete"
            >
              <i className="fa-solid fa-trash"></i>
            </button>

            <CSVDownloader
              className="btn btn-secondary"
              filename="users.csv"
              title="Export CSV"
              columns={[
                { id: "name", title: "Name" },
                { id: "email", title: "Email" },
                { id: "role_name", title: "Role" },
                { id: "dob", title: "Dob" },
                { id: "gender_text", title: "Gender" },
                { id: "status_text", title: "status" },
              ]}
              datas={resData.map((user: any) => ({
                ...user,
                role_name: user.role?.name || "",
              }))}
            >
              <i className="fa-solid fa-download"></i>
            </CSVDownloader>
          </div>
        </div>

        <Table
          columns={columns}
          data={resData}
          pagination
          paginationServer
          paginationTotalRows={users?.usersData?.total ?? 0}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerPageChange}
          highlightOnHover
          selectableRows
          progressPending={pending}
          onSelectedRowsChange={handleChange}
          sortServer
          onSort={handleSortChange}
          responsive
        />

        <ViewUserModal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          userDetails={userDetails}
        />

        {/* Single Delete Modal */}
        <DeleteUserModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          deleteId={deleteId}
        />

        {/* Bulk Delete Modal */}
        <DeleteUserModal
          show={showBulkDeleteModal}
          onClose={() => setShowBulkDeleteModal(false)}
          onConfirm={handleConfirmMultiDelete}
          deleteId={deleteId}
        />
      </div>
      <NotificationContainer />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.usersData,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(UsersActions as any, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
