import {
  Breadcrumbs,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import CertifyTextField from "../components/core/CertifyTextField";
import colors from "../data/colors";
import { useButtonStyles } from "../data/styles";
import { boolean, date, object, string } from "yup";

import "./NewCertificateBulk.css";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";
import XLSX from "xlsx";
import { CloseOutlined } from "@material-ui/icons";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const validationSchema = object().shape({
  event: object({
    name: string().required("Required"),
    description: string().optional(),
    imageUrl: string().optional(),
    startDate: date().optional(),
    endDate: date().optional(),
    isNewEvent: boolean().required("Required"),
  }),
  certificate: object({
    type: string().required("Required"),
    reason: string().required("Required"),
    remarks: string().required("Required"),
  }),
});

const supportedFileTypes = ["xlsx", "csv"];

const NewCertificateBulk = () => {
  const buttonStyles = useButtonStyles();
  const certificateTypes = ["Participation", "Content Creation", "Other"];
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );
  const fileImportRef = createRef<HTMLInputElement>();
  const [importedFile, setImportedFile] = useState<{
    name: "";
    size: 0;
    type: "";
    invalidType: boolean;
  }>();
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [newEvent, setNewEvent] = useState(false);

  const tableColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 120,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 170,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 170,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      editable: false,
    },
  ];

  type TableRow = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

  const toTableRowData = (data: any[]): TableRow[] => {
    let out: TableRow[] = [];
    for (var i = 0; i < data.length; i++) {
      out.push({
        id: i + 1,
        firstName: data[i].firstName,
        lastName: data[i].lastName,
        email: data[i].email,
      });
    }
    return out;
  };

  const initialValues = {
    event: {
      name: "",
      description: "",
      imageUrl: "",
      startDate: "",
      endDate: "",
      isNewEvent: newEvent,
    },
    certificate: {
      type: "",
      reason: "",
      remarks: "",
    },
  };

  const submit = (values: typeof initialValues) => {
    console.log(values);
  };

  const handleFileImport = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // getting the file extension from the file name
      const fileExtension =
        file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) ||
        "";

      // checking the imported file extension
      if (supportedFileTypes.includes(fileExtension)) {
        setImportedFile({
          invalidType: false,
          name: file.name,
          type: file.type,
          size: file.size,
        });
        readFile(file)
          .then((data) => {
            setTableData(toTableRowData(data as any[]));
          })
          .catch((err) => {
            alert(err);
            console.error(err);
          });
      } else {
        // invalid file type
        setImportedFile({
          invalidType: true,
          name: file.name,
          type: file.type,
          size: file.size,
        });
      }
    }
  };

  const readFile = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target!.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const worksheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        resolve(data);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
    return promise;
  };

  const handleCloseImportedData = () => {
    setImportedFile(null!);
  };

  return (
    <div className="new-certificate-bulk">
      <div className="new-certificate-bulk__content">
        <div className="top">
          <div className="left-col">
            <h2>Certificate Bulk</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/certificate">Certificates</Link>
              <Typography style={{ color: colors.dimmedClr }}>
                Certificate Bulk
              </Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="bottom">
          <div className="content__section">
            <div className="section__content">
              <h3 className="section__content__topic">File</h3>
              <p>Import your csv or xlsx file here</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  value=""
                  ref={fileImportRef}
                  onChange={handleFileImport}
                  style={{ display: "none" }}
                />
                {importedFile && (
                  <>
                    <TextField
                      variant="outlined"
                      fullWidth
                      disabled
                      value={importedFile.name}
                    />
                    <Tooltip title="close imported data">
                      <Button
                        className={buttonStyles.deleteBtn}
                        onClick={handleCloseImportedData}
                      >
                        <CloseOutlined />
                      </Button>
                    </Tooltip>
                  </>
                )}

                <Button
                  style={{
                    display: importedFile ? "none" : "initial",
                  }}
                  className={buttonStyles.standardBtn}
                  onClick={() => fileImportRef.current!.click()}
                >
                  Import
                </Button>
              </div>
              {importedFile?.invalidType && (
                <p style={{ textAlign: "center", color: "red" }}>
                  Unsupported File Type. Only xlsx and csv file types are
                  supported
                </p>
              )}
            </div>
          </div>

          {importedFile !== null && importedFile !== undefined && (
            <div className="new-certificate-bulk-group">
              <div className="new-certificate-bulk-group__left-col">
                <div className="content__section">
                  <div className="section__content">
                    <h3 className="section__content__topic">Imported Data</h3>
                    <p>Here is imported data from the file</p>
                    <DataGrid
                      rows={tableData}
                      columns={tableColumns}
                      //rowCount={100}
                      //rowsPerPageOptions={[5, 10]}
                      //pageSize={10}
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
                  </div>
                </div>
              </div>

              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={submit}
              >
                <Form>
                  <div className="new-certificate-bulk-group__right-col">
                    <div className="content__section">
                      <div className="section__content">
                        <h3 className="section__content__topic">Event</h3>
                        <p>Enter the details about this event</p>
                        {newEvent ? (
                          <>
                            <Field
                              label="Name"
                              name="event.name"
                              component={CertifyTextField}
                              required
                            ></Field>
                            <Field
                              label="Thumbnail URL"
                              name="event.imageUrl"
                              component={CertifyTextField}
                            ></Field>
                            <Field
                              label="Description"
                              name="event.description"
                              component={CertifyTextField}
                              textArea={true}
                            ></Field>
                            <Field
                              label="Start Date"
                              name="event.startDate"
                              component={CertifyDatePicker}
                            ></Field>
                            <Field
                              label="End Date"
                              name="event.endDate"
                              component={CertifyDatePicker}
                            ></Field>
                            <h4 style={{ textAlign: "center" }}>or</h4>
                            <Button
                              className={buttonStyles.standardBtn}
                              onClick={() => setNewEvent(false)}
                            >
                              Select an existing event
                            </Button>
                          </>
                        ) : (
                          <>
                            <Field
                              label="Select Event"
                              name="event.name"
                              component={CertifySelect}
                              options={certificateTypes}
                              required
                            ></Field>
                            <h4 style={{ textAlign: "center" }}>or</h4>
                            <Button
                              className={buttonStyles.standardBtn}
                              onClick={() => setNewEvent(true)}
                            >
                              Create a new Event
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="content__section">
                      <div className="section__content">
                        <h3 className="section__content__topic">Certificate</h3>
                        <p>Enter the details about the certiicate</p>
                        <Field
                          label="Type"
                          name="certificate.type"
                          component={CertifySelect}
                          options={certificateTypes}
                          required
                        ></Field>
                        <Field
                          label="Reason"
                          name="certificate.reason"
                          component={CertifyTextField}
                          textArea={true}
                          required
                        ></Field>
                        <Field
                          label="Remarks"
                          name="certificate.remarks"
                          component={CertifyTextField}
                          textArea={true}
                          required
                        ></Field>
                        <Button
                          className={buttonStyles.standardBtn}
                          type="submit"
                          disabled={loading}
                          startIcon={
                            loading ? (
                              <CircularProgress size="1rem" color="secondary" />
                            ) : null
                          }
                        >
                          {loading ? "Submitting" : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCertificateBulk;
