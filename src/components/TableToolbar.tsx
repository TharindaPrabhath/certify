import {
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTableToolbarStyles, useTextfieldStyles } from "../data/styles";
import clsx from "clsx";

import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const TableToolbar = ({
  numSelected,
  suggestions,
}: {
  numSelected: number;
  suggestions: any;
}) => {
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
          options={suggestions}
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

export default TableToolbar;
