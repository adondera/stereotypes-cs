const ValidateConsentInput = function (input) {
  var letters = /^[A-Za-z\-\s]+$/;
  if (input.length === 0 || input.match(letters)) return true;
  return false;
};

const fields = [
    {
        firstName: {
          id: "firstNameParent",
          name: "firstNameParent",
          label: "First name",
          onChange: function (event) {
            if (!ValidateConsentInput(event.target.value)) return;
            this.setState({ firstNameParent: event.target.value });
          },
          autoComplete: "fname",
        },
        lastName: {
          id: "lastNameParent",
          name: "lastNameParent",
          label: "Last name",
          onChange: function (event) {
            if (!ValidateConsentInput(event.target.value)) return;
            this.setState({ lastNameParent: event.target.value });
          },
          autoComplete: "lname",
        },
      },
    {
      firstName: {
        id: "firstNameChild1",
        name: "firstNameChild",
        label: "Child's first name",
        onChange: function (event) {
          if (!ValidateConsentInput(event.target.value)) return;
          this.setState({ firstNameChild1: event.target.value });
        },
        autoComplete: "fnameChild",
      },
      lastName: {
        id: "lastNameChild1",
        name: "lastNameChild",
        label: "Child's second name",
        onChange: function (event) {
          if (!ValidateConsentInput(event.target.value)) return;
          this.setState({ lastNameChild1: event.target.value });
        },
        autoComplete: "lnameChild",
      },
    },
];

export default fields;
