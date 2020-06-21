import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    card: {
        flexGrow: 1,
        height: '120%',
    },
    textContent: {
        textAlign: 'center',
        height: '100%',
    },
    cardContent: {
        height: '100%',
        opacity: '0.3',
    }
}));
