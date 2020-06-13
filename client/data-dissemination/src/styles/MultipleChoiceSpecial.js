import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    margin: "auto",
    flexGrow: 1,
    marginTop: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  grid: {
    textAlign: "center",
    margin: "auto",
  },
  formControl: {
      width: '50%'
  }
}));
