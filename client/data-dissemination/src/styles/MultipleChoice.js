import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    multiple_choice_option: {
        textAlign: "center",
        margin: 'auto'
    },
    root: {
        width: '95%',
        margin: 'auto',
        flexGrow: 1,
        marginTop: '5px',
    },
    paper: {
        margin: 'auto',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));
