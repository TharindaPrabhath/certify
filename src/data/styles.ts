import { makeStyles, Theme } from "@material-ui/core";

import colors from "./colors";

export const useTableToolbarStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        borderRadius: "1em 1em 0 0",
      },
      highlight: { color: colors.secondaryFontClr, backgroundColor: colors.primaryBrandClr },
      title: {
        flex: "1 1 100%",
      },
      autocompleteField: {
        color: colors.primaryFontClr,
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
          paddingLeft: 26,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.secondaryFontClr,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.secondaryFontClr,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primaryFontClr,
        },
      },
}));

export const useTableStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
      },
      paper: {
        width: "100%",
        marginBottom: 0,
        backgroundColor: colors.secondaryBgClr,
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
      },
      tableRow: {
        "&:hover": {
            backgroundColor: "#2A343F !important",
          },
          '&.Mui-selected,&.Mui-selected:hover': {
            backgroundColor: "#333D49 !important"
          }      
      },
      tableHeaderCell: {
        fontWeight: 700,
        color: colors.primaryFontClr,
      },
      tableCell: {
        color: colors.secondaryFontClr,
        borderBottomColor: "transparent",
        height: "3em",
      },
      pagination: {
        color: colors.secondaryFontClr,
        margin: "1em 0",
      }
}));

export const useButtonStyles = makeStyles((theme: Theme) => ({
    standardBtn: {
      backgroundColor: colors.primaryBrandClr,
      fontWeight: 700,
      textTransform: "capitalize",
      padding: "0.5em 1em",
      "&:hover": {
        backgroundColor: colors.primaryBrandClr,
      }
    },
    editBtn: {
        backgroundColor: colors.primarySuccesClr,
        color: "#000000",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: colors.primarySuccesClr,
        }
      },
      
      deleteBtn: {
        backgroundColor: colors.primaryErrorClr,
        color: colors.primaryFontClr,
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: colors.primaryErrorClr,
        }
      },
}));

export const useTextfieldStyles = makeStyles((theme: Theme) => ({
  
textField: {
  '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
    paddingLeft: 26,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#434E5A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.primaryBrandClr,
  },
},
input: {
    color: colors.secondaryFontClr
},
}));





// export const useCheckboxStyles = makeStyles((theme: Theme) => ({
//   icon: {
//       borderRadius: 3,
//       width: 16,
//       height: 16,
//       boxShadow:
//         "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
//       backgroundColor: "transparent",
//       backgroundImage: "transparent",
//       outline: `2px solid ${colors.secondaryFontClr}`,
//       "$root.Mui-focusVisible &": {
//         outline: "2px auto rgba(19,124,189,.6)",
//         outlineOffset: 2,
//       },
//       "input:hover ~ &": {
//         backgroundColor: "transparent",
//       },
//       "input:disabled ~ &": {
//         boxShadow: "none",
//         background: "rgba(206,217,224,.5)",
//       },
//     },
//     checkedIcon: {
//       backgroundColor: colors.primaryBrandClr,
//       "&:before": {
//         display: "block",
//         width: 16,
//         height: 16,
//         backgroundImage:
//           "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//           " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//           "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
//         content: '""',
//       },
//       "input:hover ~ &": {
//         backgroundColor: colors.secondaryBrandClr,
//       },
//     },
// }));

// export const useSwitchStyles = makeStyles({
//   switch_track: {
//     backgroundColor: colors.secondaryFontClr,
// },
//   switch_base: {
//     color: "#e0e0e0",
//     "&.Mui-disabled": {
//         color: "#e886a9"
//     },
//     "&.Mui-checked": {
//         color: colors.primaryBrandClr
//     },
//     "&.Mui-checked + .MuiSwitch-track": {
//         backgroundColor: "#1E7B9B",
//     }
// },
  
// });