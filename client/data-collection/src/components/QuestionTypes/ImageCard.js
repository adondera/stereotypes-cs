import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import Slide from  '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '60%',
    margin: 'auto',
  },
  image: {
    margin: 'auto',
    height: '100%',
    width: 300,
    transform: 'scale(1.05)',
  },
  imageFocus: {
    transition: 'transform .2s',
  },
}));


const ImageCard = ({onClick, onLoadImage, imageLoaded, image}) => {
  const classes = useStyles();
  const [loaded, setloaded] = useState(false)
  useEffect(() => {
    setloaded(imageLoaded)
  }, [imageLoaded])
  return (
    <Slide direction='down' in={loaded}  >
          <CardMedia
            className={classes.image}
            component='img'
            alt=''
            onLoad={onLoadImage}
            image={image}
          />
    </Slide>
  );
};

export default ImageCard;
