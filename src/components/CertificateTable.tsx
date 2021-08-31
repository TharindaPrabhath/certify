import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useButtonStyles, useTableStyles } from "../data/styles";
import CertificateDto from "../types/models/CertificateDto";
import { CertificateTableProp, TableHeadCellProp } from "../types/TableProp";
import TableToolbar from "./TableToolbar";

const headCells: TableHeadCellProp[] = [
  {
    id: "certificateId",
    name: "CertificateId",
    numeric: false,
    label: "CertificateId",
  },
  { id: "recievedBy", name: "RecievedBy", numeric: false, label: "RecievedBy" },
  { id: "issuedBy", name: "IssuedBy", numeric: false, label: "IssuedBy" },
  { id: "type", name: "Type", numeric: false, label: "Type" },
  { id: "issuedDate", name: "IssuedDate", numeric: false, label: "IssuedDate" },
];

const getRow = (
  certificateId: string,
  recievedBy: string,
  issuedBy: string,
  type: string,
  issuedDate: string
): CertificateTableProp => {
  return { certificateId, recievedBy, issuedBy, type, issuedDate };
};

const rows: CertificateTableProp[] = [
  getRow("001", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("002", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("003", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("004", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("005", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("006", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
  getRow("007", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
];

const CertificateTable = ({
  certificates,
}: {
  certificates: CertificateDto[];
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const tableStyles = useTableStyles();
  const buttonStyles = useButtonStyles();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = certificates.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const getSuggestions = (): string[] => {
    var arr: string[] = [];

    certificates.map((certificate) =>
      arr.push(certificate.user.fName + " " + certificate.user.lName)
    );
    return arr;
  };

  return (
    <Paper className={tableStyles.paper} style={{ borderRadius: "1em" }}>
      <TableToolbar
        numSelected={selected.length}
        suggestions={getSuggestions()}
      />
      <TableContainer>
        <Table
          size="medium"
          className={tableStyles.table}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "decorative checkbox" }}
                  onChange={(event) => handleSelectAllClick(event)}
                />
              </TableCell>
              {headCells.map((headCell, index) => {
                return (
                  <TableCell
                    key={index}
                    align="left"
                    padding="normal"
                    className={tableStyles.tableHeaderCell}
                  >
                    {headCell.label}
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {certificates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((certificate, index) => {
                const isItemSelected = isSelected(String(certificate.id));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    className={tableStyles.tableRow}
                    key={index}
                    hover={true}
                    role="checkbox"
                    onClick={(event) =>
                      handleClick(event, String(certificate.id))
                    }
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    tabIndex={-1}
                  >
                    <TableCell
                      padding="checkbox"
                      className={tableStyles.tableCell}
                    >
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        color="primary"
                      />
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      padding="normal"
                      className={tableStyles.tableCell}
                    >
                      {certificate.id}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={tableStyles.tableCell}
                      style={{ fontWeight: 700 }}
                    >
                      <Link
                        to={`user/${
                          certificate.user.fName + certificate.user.lName
                        }`}
                      >
                        {certificate.user.fName + " " + certificate.user.lName}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {certificate.issuedAdmin.username}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {certificate.type}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {certificate.issuedDate}
                    </TableCell>
                    <TableCell className={tableStyles.tableCell}>
                      <Button
                        className={buttonStyles.editBtn}
                        onClick={(e) => {
                          // disable selection of the whole row on click
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className={tableStyles.tableCell}>
                      <Button
                        className={buttonStyles.deleteBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={tableStyles.pagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CertificateTable;
