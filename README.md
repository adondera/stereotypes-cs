<!-- HEADER -->
<table align="center"><tr><td align="center" width="9999">
<img src="https://www.ssf.net/Home/ShowImage?id=8211&t=636562892935730000" align="center" width="500" alt="Project icon">

# Stereotypes in Computer Science

CSE2000 Software Project

<br>

[![coverage report](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-8/stereotypes-in-cs/stereotypescs/badges/dev/coverage.svg)](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-8/stereotypes-in-cs/stereotypescs/-/commits/dev)
[![pipeline status](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-8/stereotypes-in-cs/stereotypescs/badges/dev/pipeline.svg)](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-8/stereotypes-in-cs/stereotypescs/-/commits/dev)
[![pylint](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-8/stereotypes-in-cs/stereotypescs/-/jobs/artifacts/dev/raw/public/badges/pylint.svg?job=pylint)]()
</td></tr></table>


## :ledger: Table of Contents

* [Overview](#book-overview)
* [Features](#beginner-features)
* [Screenshots](#camera-screenshots)
* [Getting started](#checkered_flag-getting-started)
  * [Prerequisites](#prerequisites-gear) 
  * [Installation](#installation-electric_plug)
  * [Run in Docker](#run-in-docker-whale)
* [Usage](#zap-usage)
* [Deployment](#rocket-deployment)
* [Contributing](#raised_hands-contributing)
* [Issue Board](#pushpin-issue-board)
* [Authors](#sunglasses-authors)
* [License](#lock-license)
* [Acknowledgements](#star2-acknowledgements)


## :book: Overview 

The following repository contains the source code from the 2019-2020 CSE200 Software Project course at TU Delft.

## :beginner: Features 

* Parents can complete a digital consent form
* Children can take an IAT test
* Test results are stored in a database
* etc

## :camera: Screenshots 

![image](docs/screenshots/iat_gender.png) <!-- .element height="20%" width="20%" -->

## :checkered_flag: Getting started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites :gear:
A step by step series of examples that tell you how to get a development env running

#### Back-end
Install Python

```
$ python3 --version
```
Install Pip

```
$ pip3 --version
```

Install Postgresql

```
$ which psql
```
Install all dependencies

```
$ pip3 install requirements.txt
```

#### Front-end

Install npm and Nodejs

```
$ node --version
$ npm --version
```

Install React 

```
$ sudo npm install react-scripts@3.4.1 -g 
```

For more documentation, please consult the Dockerfiles present in each application.

### Installation :electric_plug:
A step by step series of examples that tell you how to get a development env running

### Run in Docker :whale:

Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on you machine.

```sh
$ docker --version
Docker version 19.03.8
```

```sh
$ docker-compose --version
docker-compose version 1.25.0
```

```sh
$ sudo chmod +x start.sh
$ sudo ./script-name-here.sh

OR

$ sudo docker-compose up
```

> The server in running on [http://localhost:8000/](http://localhost:8000/)

> The consent form is on   [http://localhost:3001/](http://localhost:3001/)

> The client-data-collection on  [http://localhost:3002/](http://localhost:3002/)

> The client-data-dissemination on [http://localhost:3003/](http://localhost:3003/)


## :zap: Usage 

Register a child via the consent app. Log-in with username **ADMIN** , password **ADMIN** and you can complete a quiz.

### Folder structrue :file_folder:

How are the folders organised. Where to find stuff.

```
.
├── api
│   ├── endpoints
│   │   ├── auth.py
│   │   ├── consent.py
│   │   ├── constants.py
│   │   ├── dashboard.py
│   │   └── ...
│   ├── models
│   │   ├── category.py
│   │   ├── question.py
│   │   ├── participant.py
│   │   └── ...
│   ├── static
│   │   └── IATs
│   ├── tests
│   │   ├── test_files
│   │   ├── conftest.py
│   │   ├── test_requests.py
│   │   ├── test_sockets.py
│   │   └── ...
│   ├── __init__.py
│   ├── README.md
│   └── script.py
├── client
│   ├── client-consent-app
│   │   ├── public
│   │   ├── src
│   │   ├── app.js
│   │   └── ...
│   ├── data-collection
│   │   ├── public
│   │   ├── selenium_tests
│   │   ├── src
│   │   ├── app.js
│   │   └── ...
│   └── data-dissemination
│       ├── public
│       ├── src
│       ├── app.js
│       └── ...
├── docs
│   ├── client_meetings
│   ├── screenshots
│   ├── sprint_retrospectives
│   ├── team_meetings
│   └── ...
├── migrations
│   ├── versions
│   └── ...
├── .gitignore
├── .gitlab-ci.yml
├── config.py
├── LICENSE
├── Procfile
├── pylintrc
├── README.md
├── requirements.txt
├── runtime.txt
└── server.py

```

| File/Folder Name | Details 
|------------|-------|
| api        |server-side code|
| client     |client-side code|
| docs       |documentation, meeting notes|
| migrations |migration files for database schema|
| config.py  |server configurations|
| requirements.txt|package dependencies|
| runtime.txt | python version (for deployment)|
| server.py | running the server application|


### Starting the server :hot_pepper:
Reference to server README.md

Start the server

```
$ gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b 0.0.0.0:8000 server:app
```


### Starting the application :desktop_computer:
Reference to client README.md

Run application 

```
$ npm install
$ npm run start
```

## :runner: Running the tests  

How to run the automated tests for this system

### Client

Navigate to each application

```
$ npm test
```

### Back-end

```
$ pytest api
```

## :mag: Coding style tests

### Client-side

For the client-side we used ***lintJS*** as a static analysis tool.

```
Give an example
```

### Server-side

For the server-side we used ***pylint*** as a static analysis tool.

You can get [pylint](https://plugins.jetbrains.com/plugin/11084-pylint) as a plugin and run it directly from your Pycharm IDE.

You can also install and run pylint from your terminal.

To instal pylint use:
```
$ pip3 install pylint
```

To run pylint use:
```
$ pylint --load-plugins "pylint_flask_sqlalchemy, pylint_flask" api
```

## :rocket: Deployment 

Use Docker to deploy your application :whale: .

## :raised_hands: Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Merge Request

## :pushpin: Issue board 


#### Labels:
* `Product Backlog`: contains user stories derived from project requirements
* Every user story has a label for its importance according to the MoSCoW method
* `Sprint backlog`: contains tasks derived from user stories for a specific sprint
* The labels `application::collection` and `application::dissemination` refer to the two parts of our project (*Data collection* and *Data dissemination*)


#### Board:
* Each sprint will have a separate board
* A user story will be assigned to a sprint (milestone) 
* `Sprint Backlog` list will contain tasks derived from a user story

## :tools: Technologies used  

### Client-side
* [React](https://github.com/facebook/create-react-app) - The web framework used
* [Axios](https://github.com/axios/axios) - blabla
* [Material UI](https://material-ui.com/) - blabla
* [React-Redux](https://react-redux.js.org/) - blabla
* [React-Router](https://github.com/ReactTraining/react-router) - blabla

### Server-side

* [Flask-Restful](https://flask-restful.readthedocs.io/en/latest/) - REST API functionalities of Flask
* [Flask-JWT-extended](https://flask-jwt-extended.readthedocs.io/en/stable/) - JWT integration for authorisation and authentication
* [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/) -  Socket communication framework
* [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) - SQL toolkit and object-relational mapper.
* [Redis](https://redis.io/) - In-memory data structure store
* [Cloudinary](https://cloudinary.com/) - Cloud management service for media contents
* [Sendgrid](https://sendgrid.com/) - Email delivery service
* [PostgreSQL](https://www.postgresql.org/) - Relational database system

## :sunglasses: Authors 

**Development team:**
* Alexandru Manolache - *Backend* - [amanolache](https://gitlab.ewi.tudelft.nl/amanolache)
* Alin Dondera - *Backend* - [adondera](https://gitlab.ewi.tudelft.nl/adondera)
* Andrei Geadau - *Frontend* - [ageadau](https://gitlab.ewi.tudelft.nl/ageadau)
* Dragos Vecerdea - *Frontend* - [dvecerdea](https://gitlab.ewi.tudelft.nl/dvecerdea)
* Ionut Constantinescu - *Backend* - [iconstantinesc](https://gitlab.ewi.tudelft.nl/iconstantinesc)

**Faculty supervisors:**
* Daphne van Tetering - *TA*
* Myrthe Tielman - *Coach*

**Client:**
* Shirley de Wit

## :lock: License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## :star2: Acknowledgements 

* VHTO
* NEMO Science Museum
* Leiden University
* Delft University of Technology

