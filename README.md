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


## Table of Contents

* [Overview](#book-overview)
* [Features](#beginner-features)
* [Screenshots](#camera-screenshots)
* [Getting started](#checkered_flag-getting-started)
  * [Prerequisites](#prerequisites-gear) 
  * [Installation](#installation-electric_plug)
  * [Run in Docker](#run-in-docker-whale)
* [Usage](#zap-usage)
* [Deployment](#rocket-deployment)
* [Contributing](#raised_hand-contributing)
* [Issue Board](#pushpin-issue-board)
* [Authors](#sunglasses-authors)
* [License](#pencil-license)
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

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

### Installation :electric_plug:
A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

### Run in Docker :whale:

Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on you machine.

```sh
foo@bar:~$ docker --version
Docker version 19.03.8
```

```sh
foo@bar:~$ docker-compose --version
docker-compose version 1.25.0
```

```sh
foo@bar:~$ sudo chmod +x start.sh
foo@bar:~$ sudo ./script-name-here.sh

OR

foo@bar:~$ sudo docker-compose up
```

> The server in running on [http://localhost:8000/](http://localhost:8000/)

> The consent form is on   [http://localhost:3001/](http://localhost:3001/)

> The client-data-collection on  [http://localhost:3002/](http://localhost:3002/)

> The client-data-dissemination on [http://localhost:3003/](http://localhost:3003/)


## :zap: Usage 

Some intro here

### Folder structrue :file_folder:

How are the folders organised. Where to find stuff.

```
.
├── assets
│   ├── css
│   │   ├── index-ui.css
│   │   └── rate-ui.css
│   ├── images
│   │   ├── icons
│   │   │   ├── shrink-button.png
│   │   │   └── umbrella.png
│   │   ├── logo_144.png
│   │   └── Untitled-1.psd
│   └── javascript
│       ├── index.js
│       └── rate.js
├── CNAME
├── config.py
├── server.py
└── README.md

EXAMPLE
```

| No | File/Folder Name | Details 
|----|------------|-------|
| 1  | api        |serve-side code|
| 2  | client     |client-side code|
| 3  | docs       |documentation, meeting notes|
| 4  | migrations |migration files for database schema|
| 5  | socketio   |socket communication|
| 6  | config.py  |server configurations|
| 7  | requirements.txt|packages used in the code|

### Starting the server :hot_pepper:
Reference to server README.md


### Starting the application :desktop_computer:
Reference to client README.md

## :runner: Running the tests  

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## :rocket: Deployment 

Add additional notes about how to deploy this on a live system

## :raised_hand: Contributing

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

## :pencil: License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## :star2: Acknowledgements 

* Hat tip to anyone whose code was used
* Inspiration
* etc

