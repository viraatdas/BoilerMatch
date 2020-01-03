# Backend
Built with Node.js.

## Setup
1. Initialize node dependencies
```
npm install
```
2. Copy and setup variables in .env
    * `$ cp .env.example .env`
    * Then make any env changes you need
    * To connect to a local mongod process, set the DATABASE_URL to "mongodb://127.0.0.1:27017"

3. Intialize frontend (Refer [here](frontend/purdue-net-frontend) for more details)

## Usage
The following command will start a server that serves files from the frontend build folder.
```
npm start
```
To use a local database, run the following command in another process. Ensure DATABASE_URL in the .env file is set to a local url as given above.
```
mongod
```
