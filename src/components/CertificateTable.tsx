import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useButtonStyles, useTableStyles } from "../data/styles";
import CertificateDto from "../types/models/CertificateDto";
import { CertificateTableProp, TableHeadCellProp } from "../types/TableProp";
import { useSnackbar } from "notistack";
import TableToolbar from "./TableToolbar";
import { deleteCertificate, fetchCertificates } from "../utils/requestHelper";
import { toCertificateDtos } from "../utils/mapper";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";

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
  getRow("002", "Lishitha", "Lasana", "Participation", "2001.03.12"),
  getRow("003", "Chamath", "Lasana", "Participation", "2001.03.12"),
  getRow("004", "Nadun", "Lasana", "Participation", "2001.03.12"),
  getRow("005", "Haritha", "Hasitha", "Participation", "2001.03.12"),
  getRow("006", "Alahakoon", "Hasitha", "Participation", "2001.03.12"),
  getRow("007", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
];

const CertificateTable = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const tableStyles = useTableStyles();
  const buttonStyles = useButtonStyles();

  const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
  const [confirmBoxAgree, setConfirmBoxAgree] = useState<boolean>(false);

  const [certificates, setCertficates] = useState<CertificateDto[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { setCertificate, removeCertificate } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const currentCertificate = useSelector(
    (state: ReducerType) => state.certificateReducer.currentCertificate
  );

  useEffect(() => {
    fetchCertificates()
      .then((res) => {
        setCertficates(toCertificateDtos(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = certificates.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<unknown>,
    certificate: CertificateDto
  ) => {
    event.stopPropagation();

    setOpenConfirmBox(true);

    if (confirmBoxAgree) {
      deleteCertificate(certificate.id)
        .then(() => {
          enqueueSnackbar(
            `Successfully deleted the certificate ${certificate.id}`,
            {
              variant: "success",
            }
          );

          // removing the item from the table
          setCertficates(certificates.filter((c) => c.id !== certificate.id));

          // if the deleted certificate is the current certificate in redux store. delete it
          if (currentCertificate?.id === certificate.id) removeCertificate();
        })
        .catch((err) => {
          enqueueSnackbar(
            `${err} .Could not delete the certificate.Try again later.`,
            {
              variant: "error",
            }
          );
        });
    }
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
      arr.push(certificate.user.fname + " " + certificate.user.lname)
    );
    return arr;
  };

  const handleConfirmBoxClose = () => {
    setOpenConfirmBox(false);
    setConfirmBoxAgree(false);
  };

  const handleConfirmBoxAgree = () => {
    handleConfirmBoxClose();
    setConfirmBoxAgree(true);
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
                      <Link to={`user/${certificate.user.uid}`}>
                        {certificate.user.fname + " " + certificate.user.lname}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {certificate.admin.username}
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
                          handleDeleteClick(e, certificate);
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
      <Dialog
        open={openConfirmBox}
        aria-labelledby="Confirm"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The certificates recieved by this user will also be deleted. Do you
            really want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmBoxClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleConfirmBoxAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CertificateTable;
