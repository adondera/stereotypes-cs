const fields = [
    {              
        id: "firstNameChild",
        name: "firstNameChild",
        label: "Child's first name",
        onChange: function (event) {this.setState({firstNameChild: event.target.value})},
        autoComplete: "fnameChild"
    },
    {              
        id: "lastNameChild",
        name: "lastNameChild",
        label: "Child's second name",
        onChange: function (event) {this.setState({lastNameChild: event.target.value})},
        autoComplete: "lnameChild"
    },
    {              
        id: "firstNameParent",
        name: "firstNameParent",
        label: "First name",
        onChange: function (event) {this.setState({firstName: event.target.value})},
        autoComplete: "fname"
    },
    {              
        id: "lastNameParent",
        name: "lastNameParent",
        label: "Last name",
        onChange: function (event) {this.setState({lastName: event.target.value})},
        autoComplete: "lname"
    }

]

export default fields