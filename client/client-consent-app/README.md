# Client consent application


The following repo contains the source code for the client consent application.

## Technologies used

* [React](https://github.com/facebook/create-react-app) 
* [Axios](https://github.com/axios/axios) 
* [Material UI](https://material-ui.com/) 
* [React-Redux](https://react-redux.js.org/)
* [React-Router](https://github.com/ReactTraining/react-router)


## How to run


### Update .env

Make sure the details of your application are correctly written in .env file:

``cp .env_example .env``


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Run in kiosk mode

> Currently only supported in Google Chrome.

###### Linux
```
google-chrome --kiosk http://example.com/
```

###### MacOS

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app=localhost:3000
```

Then open Google Chrome and go to [localhost:3000](http://localhost:3000).

###### Windows
```
–chrome-frame –kiosk “http://www.google.com”
```

More info can be found at the following [link](https://thegeekpage.com/how-to-setup-chrome-kiosk-mode-in-windows-10/).


### Code Splitting

This section covers the folder strucure of the project.

|FOLDER          |PURPOSE                                           |
|----------------|--------------------------------------------------|
|tests           |`'Contains all the tests'`                        |
|components      |`"Contains all the React components`              |
|common          |`"Contains common functionality for all pages"`   |
|utils           |`"Constants and API calls to server"`             |

# Deployment

To start production server, run, in this order: `npm install` / `npm build` / `node app.js` <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. <br/>
By default, PORT is set to 3000
