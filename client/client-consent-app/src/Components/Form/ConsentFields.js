const validateInput = function (input) {
    var letters = /^[A-Za-z]+$/;
    if(input.length === 0 || input.match(letters)) return true;
    return false;
}

const fields = [
    {              
        id: "firstNameChild",
        name: "firstNameChild",
        label: "Child's first name",
        onChange: function (event) { 
            if(!validateInput(event.target.value)) return;
            this.setState({firstNameChild: event.target.value})},
        autoComplete: "fnameChild"
    },
    {              
        id: "lastNameChild",
        name: "lastNameChild",
        label: "Child's second name",
        onChange: function (event) {
            if(!validateInput(event.target.value)) return;
            this.setState({lastNameChild: event.target.value})},
        autoComplete: "lnameChild"
    },
    {              
        id: "firstNameParent",
        name: "firstNameParent",
        label: "First name",
        onChange: function (event) {
            if(!validateInput(event.target.value)) return;
            this.setState({firstNameParent: event.target.value})},
        autoComplete: "fname"
    },
    {              
        id: "lastNameParent",
        name: "lastNameParent",
        label: "Last name",
        onChange: function (event) {
            if(!validateInput(event.target.value)) return;
            this.setState({lastNameParent: event.target.value})},
        autoComplete: "lname"
    }

]

export default fields