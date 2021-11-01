import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useButtonStyles } from "../data/styles";
import CertificateDto from "../types/models/CertificateDto";
import { useSnackbar } from "notistack";
import { deleteCertificate } from "../utils/requestHelper";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import colors from "../data/colors";
import moment from "moment";
import useLocalStorage from "../utils/useLocalStorage";
import useBadge from "../utils/useBadge";
import useSWR from "swr";
import requests from "../data/requests";
import useAxios from "../utils/axios";

// const getRow = (
//   certificateId: string,
//   recievedBy: string,
//   issuedBy: string,
//   type: string,
//   issuedDate: string
// ): CertificateTableProp => {
//   return { certificateId, recievedBy, issuedBy, type, issuedDate };
// };

// const rows: CertificateTableProp[] = [
//   getRow("001", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
//   getRow("002", "Lishitha", "Lasana", "Participation", "2001.03.12"),
//   getRow("003", "Chamath", "Lasana", "Participation", "2001.03.12"),
//   getRow("004", "Nadun", "Lasana", "Participation", "2001.03.12"),
//   getRow("005", "Haritha", "Hasitha", "Participation", "2001.03.12"),
//   getRow("006", "Alahakoon", "Hasitha", "Participation", "2001.03.12"),
//   getRow("007", "Tharinda P", "Lasana", "Participation", "2001.03.12"),
// ];

const CertificateTable = () => {
  // pagination & sorting
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("id");

  const buttonStyles = useButtonStyles();
  const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
  const [confirmBoxAgree, setConfirmBoxAgree] = useState<boolean>(false);
  //const [certificates, setCertficates] = useState<CertificateTableRow[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { removeCertificate } = bindActionCreators(actionCreators, dispatch);
  const currentCertificate = useSelector(
    (state: ReducerType) => state.certificateReducer.currentCertificate
  );
  const history = useHistory();
  const { getAdmin } = useLocalStorage();
  const { CertificateCategoryBadge } = useBadge();
  const axios = useAxios();

  const { data: certificates } = useSWR(
    `${requests.fetchCertificates}?page_no=${pageNo}&page_size=${pageSize}&sort_by=${sortBy}`,
    (url: string) =>
      axios
        .get(url)
        .then((r) => toCertificateTableData(r.data))
        .catch((err) => console.error(err))
  );

  type CertificateTableRow = {
    id: string;
    recievedBy: string;
    issuedBy: string;
    type: string;
    issuedDate: string;
    memberCertificate: boolean;
  };

  const toCertificateTableData = (dataArr: any[]): CertificateTableRow[] => {
    var list: CertificateTableRow[] = [];
    dataArr.map((d) => {
      list.push(getAsCertificateTableRow(d));
    });
    return list;
  };

  const getAsCertificateTableRow = (data: any): CertificateTableRow => {
    return {
      id: data.id,
      recievedBy: data.user.fname + " " + data.user.lname,
      issuedBy: data.admin.name,
      type: data.type,
      issuedDate: moment(data.issuedDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
      memberCertificate: data.memberCertificate,
    };
  };

  const handleViewClick = (event: React.MouseEvent<unknown>, id: string) => {
    // set current user in redux store
    //setCertificate(certificates.find((c) => c.id === id)!);
    history.push(`/certificate/view?id=${id}`);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<unknown>,
    certificate: CertificateDto
  ) => {
    event.stopPropagation();

    setOpenConfirmBox(true);

    if (confirmBoxAgree) {
      deleteCertificate(certificate.id, parseInt(getAdmin().id!))
        .then(() => {
          enqueueSnackbar(
            `Successfully deleted the certificate ${certificate.id}`,
            {
              variant: "success",
            }
          );

          // removing the item from the table
          //setCertficates(certificates.filter((c) => c.id !== certificate.id));

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

  const handleConfirmBoxClose = () => {
    setOpenConfirmBox(false);
    setConfirmBoxAgree(false);
  };

  const handleConfirmBoxAgree = () => {
    handleConfirmBoxClose();
    setConfirmBoxAgree(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      editable: false,
    },
    {
      field: "recievedBy",
      headerName: "Reciever",
      width: 170,
      editable: false,
    },
    {
      field: "issuedBy",
      headerName: "Issuer",
      width: 150,
      editable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      editable: false,
    },
    {
      field: "memberCertificate",
      headerName: "Category",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <CertificateCategoryBadge
            memberCertificate={params.row.memberCertificate}
          />
        );
      },
    },
    {
      field: "issuedDate",
      headerName: "Issued Date",
      width: 170,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
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
            {/* <Button
              className={buttonStyles.editBtn}
              onClick={(e) => handleEditClick(e, params.row.id)}
            >
              Edit
            </Button> */}
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

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colors.secondaryBgClr,
        borderRadius: "1em",
      }}
    >
      <DataGrid
        rows={certificates || []}
        columns={columns}
        rowCount={1000}
        rowsPerPageOptions={[5, 10, 50, 100]}
        paginationMode="server"
        pagination
        pageSize={pageSize}
        onPageChange={(n) => setPageNo(n)}
        onPageSizeChange={(s) => setPageSize(s)}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        style={{
          color: colors.secondaryFontClr,
          borderColor: "transparent",
          borderRadius: "1em",
          padding: "0.5em",
        }}
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

export default CertificateTable;
