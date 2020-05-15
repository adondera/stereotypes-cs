import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React from "react"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    image: {
        margin: "auto",
        height: 200,
        width: "100%"
    }
}))

const ImageCard = (props) => {
    const classes = useStyles();
    var ref = React.createRef()
    return (
    <Card className={classes.root}>
                <CardActionArea onClick={props.onClick} action={ref}>
                  <CardMedia
                    className={classes.image}
                      component="img"
                      alt=""
                      image={props.image}
                  />
                </CardActionArea>
              </Card>
    )
}

export default ImageCard