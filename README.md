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
  * [Folder Structure](#folder-structrue-file_folder)
  * [Application workflow](#application-workflow-repeat)
* [Running the tests](#runner-running-the-tests)
* [Coding style](#mag-coding-style)
* [Deployment](#rocket-deployment)
* [Contributing](#raised_hands-contributing)
* [Issue Board](#pushpin-issue-board)
* [Authors](#sunglasses-authors)
* [License](#lock-license)
* [Acknowledgements](#star2-acknowledgements)


## :book: Overview 

*The following repository contains the source code from the 2019-2020 CSE200 Software Project course at TU Delft.*

In our project, we have developed software for the 'Stereotypes in Computer Science' research project, which is a collaboration between Leiden University,
Delft University of Technology, NEMO Science Museum, and VHTO. The software developed will be used in order to study stereotypes that 
children hold about computer scientists, and whether these stereotypes are affected by a virtual intervention with role models. 
The software will also provide a way for people to learn about their own stereotypes.

For this purpose, the project has been split in two parts: 
a ***data collection*** application and a ***data dissemination*** application.

## :beginner: Features 

* Parents can complete a digital consent form for their children
* Children can take an IAT test 
* Test answers are stored in a database
* Test results can be send by email
* The admin can see live statistics about the application
* The admin can download the data in excel format

TO DO!

## :camera: Screenshots 

![image](docs/screenshots/iat_gender.png) <!-- .element height="20%" width="20%" -->

## :checkered_flag: Getting started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites :gear:
A step by step series of examples that tell you how to get a development env running.

#### *Client-side*

Install npm and Nodejs

```
$ node --version
$ npm --version
```

Install React 

```
$ sudo npm install react-scripts@3.4.1 -g 
```

#### *Server-side*

Install *Python*:
```
$ python3 --version
```

Install *Pip*:
```
$ pip3 --version
```

Install *PostgreSql*:
```
$ which psql
```

Install *Redis*:
```
$ redis-server --version
```
For a more detailed explanation, you can follow the guide [here](https://redis.io/topics/quickstart)


Install all dependencies:
```
$ pip3 install requirements.txt
```

For more documentation, please consult the Dockerfiles present in each application.

### Installation :electric_plug:
A step by step series of examples that tell you how to get a development env running.

#### *Starting the server* :hot_pepper:

To start the server execute:

```
$ gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b 0.0.0.0:8000 server:app
```

>***Detailed instructions on how to run the server can be found in the correspoding [README.md](api/README.md) file.***

#### *Starting the client application* :desktop_computer:

To run the application execute:

```
$ npm install
$ npm run start
```

>***Detailed instructions on how to run the client applications can be found in the correspoding README.md files:***
>* [Data collection](client/data-collection/README.md)
>* [Data dissemination](client/data-dissemination/README.md)
>* [Consent form](client/client-consent-app/README.md)

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

>* The ***server*** in running on [http://localhost:8000/](http://localhost:8000/)
>* The ***consent form*** is on [http://localhost:3001/](http://localhost:3001/)
>* The ***client-data-collection*** is on [http://localhost:3002/](http://localhost:3002/)
>* The ***client-data-dissemination*** is on [http://localhost:3003/](http://localhost:3003/)


## :zap: Usage 

***A comprehensive documentation can be found at: https://app.swaggerhub.com/apis-docs/adondera/StereotypesCS/1.0.0*** 

There you have all the necessary information to make requests to the server that was used for this project.



### Folder structrue :file_folder:

How are the folders organised. Where to find stuff.

```
.
├── api
│   ├── endpoints
│   │   ├── auth.py
│   │   ├── consent.py
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

### Application workflow :repeat:

1. Start the client collection application
1. Log-in with username **admin** and password **admin** 
1. Select a test version and press "Load Question" to enter the test
1. Register a child via the consent app.
1. You should now see the child name on the starting page. 
1. Press start to start the test
1. Follow the instructions to complete the test
1. At the end you can enter additional notes in the open box
1. Use the **NEMO** code to submit the test 
1. You should be redirected back to the start page

For the dissemination application the quiz can be started directly, without having to login or to complete the consent form.

## :runner: Running the tests  

Explaining how to run the automated tests for this system.

### *Client-side*

Navigate to each application directory and run:

```
$ npm test
```

### *Server-side*

Make sure you have *pytest* installed:
```
$ pytest --version
```

Select the testing configuration:
```
$ export APP_SETTINGS=config.TestingConfig
```

To run all tests use:
```
$ pytest api
```
---
**NOTE**: For tests to pass you need to have both your PostgreSQL database and the Redis server running.

---


You can also run individual tests with:
```
$ pytest api -k test_file.py
```

To run tests with coverage use:
```
$ coverage run --source api --branch -m pytest api
$ coverage report
```



## :mag: Coding style

Explaining how to run the static analysis tools for this system.

### *Client-side*

For the client-side we used ***lintJS*** as a static analysis tool.

```
TO DO
```

### *Server-side*

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

You should get a pylint message that looks like this: *"Your code has been rated at 8.32/10"*

## :rocket: Deployment 

For deploying our applications, we have used Heroku. They can either be deployed manually from the GitLab CI, or you can deploy them from your own terminal using git.

For deploying any of the client applications you can execute the following command:

`git subtree push --prefix client/name_of_folder name_of_the_remote master`

In our case, the name of the folder is either *client-consent-app*, *data-collection* or *data-dissemination*

For deploying the Flask server you can directly run:

`git push name_of_the_remote name_of_your_branch:master`

>* The ***consent form*** can be found at [https://frontend-nemo.herokuapp.com/](https://frontend-nemo.herokuapp.com/)
>* The ***collection application*** can be found at [https://collection-nemo.herokuapp.com/](https://collection-nemo.herokuapp.com/)
>* The ***dissemination application*** can be found at [https://dissemination-nemo.herokuapp.com/](https://dissemination-nemo.herokuapp.com/)

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

TO DO!

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

