import React, { FC, useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RootState } from "../store/reducer";

import * as ActivityLogActions from "./activitylogActions";
import Table from "../../pages/dataTable";
import ViewActivitylogModal from "./viewActivitylogModal";

const Activitylog: FC = (props: any) => {
  const { activitylog, actions } = props;
  const [firstInit, setFirstInit] = useState(false);
  const [resData, setResData] = useState<any>([]);
  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [pending, setPending] = React.useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activityDetails, setActivityDetails] = useState(null);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (firstInit) {
      setPending(true);
      actions.getActivityLogRequest({
        page,
        perPage,
        search,
      });
    }
  }, [firstInit, page, perPage, search]);

  useEffect(() => {
    setFirstInit(true);
  }, [page, perPage, search]);

  useEffect(() => {
    if (typeof activitylog?.activityLogs?.data !== "undefined") {
      setResData(activitylog?.activityLogs?.data);
      setPending(false);
    }
  }, [activitylog?.activityLogs]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
  };

  const handleView = (row: any) => {
    setActivityDetails(row);
    setShowViewModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns: any = [
    {
      name: "Date",
      selector: (row: any) => row?.created_at || "-",
      maxWidth: "300px",
      sortable: true,
    },
    {
      name: "User",
      selector: (row: any) => row?.causer_name || "-",
      sortable: true,
    },
    {
      name: "Module",
      //   maxWidth: "150px",
      selector: (row: any) => row.log_name || "-",
    },
    {
      name: "Activity",
      selector: (row: any) => row?.description || "-",
    },
    {
      name: "Actions",
      align: "center",
      maxWidth: "200px",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            className="btn btn-primary"
            onClick={() => handleView(row)}
            title="View"
          >
            <i className="fa-regular fa-eye"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%" }}>
        {/* Search Input */}
        <div className="d-flex p-3">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="form-control me-3"
            style={{ width: "200px" }}
          />
        </div>
        <Table
          columns={columns}
          data={resData}
          pagination
          paginationServer
          paginationTotalRows={activitylog?.activityLogs?.total ?? 0}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerPageChange}
          highlightOnHover
          progressPending={pending}
          responsive
        />
        <ViewActivitylogModal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          activityDetails={activityDetails}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  activitylog: state.activitylog,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActivityLogActions as any, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activitylog);
