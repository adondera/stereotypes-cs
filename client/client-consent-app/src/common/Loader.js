import React from 'react'
import Progress from "@material-ui/core/CircularProgress"
import "../Components/FormParts/style/Form.css"
const Loader = (props) => {
    return(
        <Progress color="primary" size={props.size}/>
    )
} 
export default Loader