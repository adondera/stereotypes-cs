import React from "react";
import Form from "./Components/Form";
import "./App.css";
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Form />
      </div>
    </ThemeProvider>
  );
}

export default App;
