import React, {Component} from "react";
import Header from "./FormParts/Header";
import Body from "./FormParts/Body";
import Footer from "./FormParts/Footer";
import "./FormParts/style/Form.css";
import {postData} from "../utils/requests/postRequests";
import {getData} from "../utils/requests/getRequests";

class Form extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            text: "",
        };
    }

    changeText = (event) => {
        this.setState({text: event.target.value});
    };
    onSubmit = (submitData) => () => {
        console.log(submitData);
        //TODO! remove this
        // example of GET request to URL specified in API.js
        getData({}, null, null);
        //TODO! remove this
        // example of POST request to URL specified in API.js
        postData({
            title: 'foo',
            body: 'bar',
            userId: 1
        }, null, null);
    };

    render() {
        return (
            <div className="Form">
                <Header/>
                <Body/>
                <Footer onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default Form;
