import React from "react";
import DataTable from "react-data-table-component";

interface TableProps {
  columns: any[];
  data: any[];
  pagination?: boolean;
  paginationServer?: boolean;
  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (perPage: number, page: number) => void;
  onSelectedRowsChange?: (selectedRows: any) => void;
  onSort?: (column: any) => void;
  progressPending?: boolean;
  customStyles?: object;
  fixedHeader?: boolean;
  rowsPerPageOptions?: number[];
  theme?: string;
  responsive?: boolean;
  highlightOnHover?: any;
  pointerOnHover?: any;
  sortServer?: any;
  selectableRows?: any;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pagination = true,
  paginationServer = false,
  paginationTotalRows = 0,
  paginationPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
  onSelectedRowsChange,
  onSort,
  progressPending = false,
  customStyles = {},
  fixedHeader = true,
  rowsPerPageOptions = [5, 10, 15, 25],
  theme = "solarized",
  responsive = true,
  highlightOnHover,
  pointerOnHover,
  sortServer,
  selectableRows,
}) => {
  const tableStyle = {
    headRow: {
      style: {
        backgroundColor: "rgb(245, 246, 248)",
      },
    },
    headCells: {
      style: {
        fontSize: "17px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    rows: {
      style: {
        border: "1px dotted #ccc",
        padding: "15px 15px",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        color: "#555",
      },
    },
    ...customStyles,
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      theme={theme}
      fixedHeader={fixedHeader}
      pagination={pagination}
      paginationServer={paginationServer}
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={rowsPerPageOptions}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onSelectedRowsChange={onSelectedRowsChange}
      onSort={onSort}
      responsive={responsive}
      customStyles={tableStyle}
      highlightOnHover={highlightOnHover}
      pointerOnHover={pointerOnHover}
      progressPending={progressPending}
      sortServer={sortServer}
      selectableRows={selectableRows}
    />
  );
};

export default Table;
