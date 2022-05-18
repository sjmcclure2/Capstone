## Streamlined Aircraft Logistics Tracking
# SALT

Logo: ![image](image url)

## Table of Contents

- [Introduction](#Introduction)
- [Description](#Description)
- [Getting Started](#Getting-Started)
- [Road Map](#Road-Map)


## Introduction

With all the tools available to the Air Force, there has been a consistant fallback to paper tracking of pertinant production information that can be quickly outdated as quick as minutes after it is printed. For this reason we have decided to build a more powerful digital solution. Helping to both eliminate the margin for error and to speed up data reporting and accuracy.

<h3>Built With</h3>

 * [Node.js](https://nodejs.org/)
 * [React.js](https://reactjs.org/)
 * [Express.js](https://expressjs.com/)
 * [Knex.js](https://knesjs.org/)
 * [MUI](https://mui.com/)
 * [PostgreSQL](https://postgresql.org/)


## Description

Our product is designed to give team members access to immediate and live updates on equipment. This ranges from general status as pulled from a Maintenance Database to Air vehicle consumables such as fuel and oil. Team members will also have the ability to update and add information via a mobile interface. The extent of which is planned for future expansion. This will allow communication to be more accurate and concise between team members across a highly mobile work-area

## Getting Started

1. Clone the repository

  ```sh
  git clone https://github.com/sjmcclure2/Capstone.git
  ```

2. Create your PostgreSQL database and update connection information in `/server/knexfile.js`

3. Install dependencies, populate the database, and start the server

  ```sh
  cd server
  export NODE_ENV="development"
  npm install
  npm run postinstall
  npm start
  ```

4. In another terminal, install dependencies and start the client
  
  ```sh
  cd client
  export NODE_ENV="development"
  npm install
  npm start
  ```

## Road Map

* Maintenance Database integration
* Ability to input new Jobs with accurate descriptions
* MOC overview interface for rapid status updating

