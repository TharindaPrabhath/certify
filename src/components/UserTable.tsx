import React from "react";

import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { TableHeadCellProp, UserTableProp } from "../types/TableProp";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  useButtonStyles,
  useTableStyles,
  useTableToolbarStyles,
  useTextfieldStyles,
} from "../data/styles";

const getRow = (
  uid: string,
  name: string,
  email: string,
  role: string,
  birthday: string
): UserTableProp => {
  return { uid, name, email, role, birthday };
};

const rows: UserTableProp[] = [
  getRow("001", "Tharinda P", "tharindahp@gmail.com", "Uni", "2001.03.12"),
  getRow("002", "Lasana", "anurajeewa@gmail.com", "Uni", "2001.03.12"),
  getRow("003", "Lasana", "lasana@gmail.com", "Uni", "2001.03.12"),
  getRow("004", "Lishitha", "lishitha@gmail.com", "Uni", "2001.03.12"),
  getRow("005", "Alahakoon", "lishitha@gmail.com", "Uni", "2001.03.12"),
  getRow("006", "Chamath", "lishitha@gmail.com", "Uni", "2001.03.12"),
  getRow("007", "Hasitha", "lishitha@gmail.com", "Uni", "2001.03.12"),
];

const headCells: TableHeadCellProp[] = [
  { id: "uid", name: "UID", numeric: false, label: "UID" },
  { id: "name", name: "Name", numeric: false, label: "Name" },
  { id: "email", name: "Email", numeric: false, label: "Email" },
  { id: "role", name: "Role", numeric: false, label: "Role" },
  { id: "birthday", name: "Birthday", numeric: false, label: "Birthday" },
];

const TableToolbar = ({ numSelected }: { numSelected: number }) => {
  const toolbarStyles = useTableToolbarStyles();
  const textfieldStyles = useTextfieldStyles();

  return (
    <Toolbar
      className={clsx(toolbarStyles.root, {
        [toolbarStyles.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={toolbarStyles.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          className={toolbarStyles.autocompleteField}
          style={{ width: "15em" }}
          disableClearable
          options={rows.map((row) => row.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              label="Search user..."
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: "search",
                className: textfieldStyles.input,
              }}
            />
          )}
        />
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const UserTable = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const tableStyles = useTableStyles();
  const buttonStyles = useButtonStyles();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uid);
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

  return (
    <Paper className={tableStyles.paper} style={{ borderRadius: "1em" }}>
      <TableToolbar numSelected={selected.length} />
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.uid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    className={tableStyles.tableRow}
                    key={index}
                    hover={true}
                    role="checkbox"
                    onClick={(event) => handleClick(event, row.uid)}
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
                      {row.uid}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={tableStyles.tableCell}
                      style={{ fontWeight: 700 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {row.email}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {row.role}
                    </TableCell>
                    <TableCell align="left" className={tableStyles.tableCell}>
                      {row.birthday}
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
                          // disable selection of the whole row on click
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

export default UserTable;
