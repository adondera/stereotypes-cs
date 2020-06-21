import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        pointerEvents: 'none',
        width: '100%',
    },
    videoHide: {
        display: 'none',
    },
    playButton: {
        marginBottom: 10,
    },
    nextButton: {
        marginTop: 20,
    },
}));