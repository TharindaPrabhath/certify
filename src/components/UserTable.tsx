import React, { useEffect, useState } from "react";

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
import { TableHeadCellProp, UserTableProp } from "../types/TableProp";

import { useButtonStyles, useTableStyles } from "../data/styles";
import TableToolbar from "./TableToolbar";
import { Link, Redirect } from "react-router-dom";
import UserDto from "../types/models/UserDto";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { toUserDtos } from "../utils/mapper";
import { deleteUser, fetchUsers } from "../utils/requestHelper";
import { useSnackbar } from "notistack";
import { ReducerType } from "../redux/store";

const headCells: TableHeadCellProp[] = [
  { id: "uid", name: "UID", numeric: false, label: "UID" },
  { id: "name", name: "Name", numeric: false, label: "Name" },
  { id: "email", name: "Email", numeric: false, label: "Email" },
  { id: "role", name: "Role", numeric: false, label: "Role" },
  { id: "birthday", name: "Birthday", numeric: false, label: "Birthday" },
];

const getRow = (
  uid: string,
  fname: string,
  lname: string,
  email: string,
  role: string,
  birthday: string
) => {
  return { uid, fname, lname, email, role, birthday };
};

const rows = [
  getRow("001", "Tharinda", "P", "tharindahp@gmail.com", "Uni", "2001.03.12"),
  getRow("002", "Prabhath", "", "anurajeewa@gmail.com", "Uni", "2001.03.12"),
  getRow("003", "Lasana", "sanketh", "lasana@gmail.com", "Uni", "2001.03.12"),
  getRow(
    "004",
    "Lishitha",
    "Alahakoon",
    "lishitha@gmail.com",
    "Uni",
    "2001.03.12"
  ),
  getRow("005", "Nadun", "", "nadun@gmail.com", "Uni", "2001.03.12"),
  getRow("006", "Chamath", "Roo", "chamath@gmail.com", "Uni", "2001.03.12"),
  getRow("007", "Hasitha", "G", "hasitha@gmail.com", "Uni", "2001.03.12"),
];

const UserTable = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [redirect, setRedirect] = useState<boolean>(false);

  const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
  const [confirmBoxAgree, setConfirmBoxAgree] = useState<boolean>(false);

  const tableStyles = useTableStyles();
  const buttonStyles = useButtonStyles();

  const dispatch = useDispatch();
  const { setUser, removeUser } = bindActionCreators(actionCreators, dispatch);
  const currentUser = useSelector(
    (state: ReducerType) => state.userReducer.currentUser
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsers(toUserDtos(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => String(n.uid));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleEditClick = (event: React.MouseEvent<unknown>, user: UserDto) => {
    // set current user in redux store
    setUser(user);

    // disable selection of the whole row on click
    event.stopPropagation();
    setSelectedUserId(user.uid);
    setRedirect(true);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<unknown>,
    user: UserDto
  ) => {
    event.stopPropagation();

    setOpenConfirmBox(true);

    if (confirmBoxAgree) {
      deleteUser(user.uid)
        .then(() => {
          enqueueSnackbar(
            `Successfully deleted the user ${user.fname} ${user.lname}`,
            {
              variant: "success",
            }
          );

          // removing the item from the table
          setUsers(users.filter((u) => u.uid !== user.uid));

          // if the deleted user is the current user in redux store. delete it
          if (currentUser?.uid === user.uid) removeUser();
        })
        .catch((err) => {
          enqueueSnackbar(
            `${err} .Could not delete the user.Try again later.`,
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

    users.map((user) => arr.push(user.fname + " " + user.lname));
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

  if (redirect) return <Redirect push to={`/user/edit/${selectedUserId}`} />;

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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => {
                const isItemSelected = isSelected(String(user.uid));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    className={tableStyles.tableRow}
                    key={index}
                    hover={true}
                    role="checkbox"
                    onClick={(event) => handleClick(event, String(user.uid))}
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
                        // icon={<span className={checkboxStyles.icon} />}
                        // checkedIcon={
                        //   <span className={checkboxStyles.checkedIcon} />
                        // }
                        color="primary"
                      />
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      padding="normal"
                      className={tableStyles.tableCell}
                    >
                      {user.uid}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={tableStyles.tableCell}
                      style={{ fontWeight: 700 }}
                    >
                      <Link to={`user/${user.uid}`}>
                        {user.fname + " " + user.lname}
                      </Link>
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {user.email}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {user.role}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {user.birthday}
                    </TableCell>
                    <TableCell className={tableStyles.tableCell}>
                      <Button
                        className={buttonStyles.editBtn}
                        onClick={(e) => handleEditClick(e, user)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className={tableStyles.tableCell}>
                      <Button
                        className={buttonStyles.deleteBtn}
                        onClick={(e) => handleDeleteClick(e, user)}
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
        //onClose={handleClose}
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

export default UserTable;
