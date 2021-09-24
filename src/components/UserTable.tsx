import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useButtonStyles } from "../data/styles";
import { Redirect } from "react-router-dom";
import UserDto from "../types/models/UserDto";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { toUserDtos } from "../utils/mapper";
import { deleteUser, fetchUsers } from "../utils/requestHelper";
import { useSnackbar } from "notistack";
import { ReducerType } from "../redux/store";
import colors from "../data/colors";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import UserProfile from "./UserProfile";
import useLocalStorage from "../utils/useLocalStorage";
import useBadge from "../utils/useBadge";

const getRow = (
  id: string,
  fname: string,
  lname: string,
  email: string,
  role: string,
  birthday: string
) => {
  return { id, fname, lname, email, role, birthday };
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
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
  const [confirmBoxAgree, setConfirmBoxAgree] = useState<boolean>(false);
  const buttonStyles = useButtonStyles();
  const dispatch = useDispatch();
  const { setUser, removeUser } = bindActionCreators(actionCreators, dispatch);
  const currentUser = useSelector(
    (state: ReducerType) => state.userReducer.currentUser
  );
  const { enqueueSnackbar } = useSnackbar();
  const [openUserProfile, setOpenUserProfile] = useState<boolean>(false);
  const { getAdmin } = useLocalStorage();
  const { StatusBadge } = useBadge();

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsers(toUserDtos(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleViewClick = (event: React.MouseEvent<unknown>, id: number) => {
    // set current user in redux store
    setUser(users.find((u) => u.id === id)!);
    setSelectedUserId(id);
    setOpenUserProfile(true);
  };

  const handleEditClick = (event: React.MouseEvent<unknown>, id: number) => {
    // set current user in redux store
    setUser(users.find((u) => u.id === id)!);

    setSelectedUserId(id);
    setRedirect(true);
  };

  const handleDeleteClick = (event: React.MouseEvent<unknown>, id: number) => {
    //setOpenConfirmBox(true);
    //setConfirmBoxAgree(false);

    //if (confirmBoxAgree) {
    deleteUser(id, parseInt(getAdmin().id!))
      .then(() => {
        enqueueSnackbar(`Successfully deleted the user ${id}`, {
          variant: "success",
        });

        // removing the item from the table
        setUsers(users.filter((u) => u.id !== id));

        // if the deleted user is the current user in redux store. delete it
        if (currentUser?.id === id) removeUser();
      })
      .catch((err) => {
        enqueueSnackbar(`${err} .Could not delete the user.Try again later.`, {
          variant: "error",
        });
      })
      .finally(() => setConfirmBoxAgree(false));
    //}
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "UID",
      width: 120,
      editable: false,
    },
    {
      field: "fname",
      headerName: "First Name",
      width: 150,
      editable: false,
    },
    {
      field: "lname",
      headerName: "Last Name",
      width: 150,
      editable: false,
    },
    {
      field: "member",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return <StatusBadge member={params.row.member} />;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 240,
      editable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "0.5em" }}>
            <Button
              onClick={(e) => handleViewClick(e, params.row.id)}
              variant="contained"
              style={{ textTransform: "capitalize" }}
            >
              View
            </Button>
            <Button
              className={buttonStyles.editBtn}
              onClick={(e) => handleEditClick(e, params.row.id)}
            >
              Edit
            </Button>
            <Button
              className={buttonStyles.deleteBtn}
              onClick={(e) => handleDeleteClick(e, params.row.id)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        );
      },
    },
  ];

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
    <div
      style={{
        height: 400,
        width: "100%",
        backgroundColor: colors.secondaryBgClr,
        borderRadius: "1em",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        style={{
          color: colors.secondaryFontClr,
          borderColor: "transparent",
          borderRadius: "1em",
          padding: "0.5em",
        }}
      />

      <UserProfile
        open={openUserProfile}
        onClose={() => setOpenUserProfile(false)}
        id={selectedUserId!}
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
    </div>
  );
};

export default UserTable;
