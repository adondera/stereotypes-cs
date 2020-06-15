import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: "auto",
        flexGrow: 1,
        marginTop: "50px",
    },
    paper: {
        padding: theme.spacing(0.5),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    rootBeforeChoice: {
        padding: theme.spacing(0.5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        pointerEvents: "none",
    },
    card: {
        maxWidth: 345,
    },
}));
