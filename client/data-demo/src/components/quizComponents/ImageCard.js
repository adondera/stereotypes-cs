import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import { useStyles} from '../../styles/ImageCard';

const ImageCard = (props) => {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardActionArea onClick={props.onClick}>
          <CardMedia
            className={classes.image}
            component='img'
            alt=''
            image={props.image}
            onLoad={props.onImageLoaded}
          />
        </CardActionArea>
      </Card>
  );
};

export default ImageCard;
