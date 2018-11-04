# DEPRECATED

# A vue express boilerplate
> Using VueJS frontend, connecting to Express & Mongo Docker backend.

This boilerplate is based on the VueJS CLI setup, which makes a very elaborate
and robust setup for VueJS, with all the conveniences of .vue files, hot code
reloading, ESLint, etc. The main modification is adding a Docker backend with
ExpressJS and MongoDB. Also enabled Pug and Scss to work in the .vue files.

This boilerplate uses two servers for development (but only one when deployed).
This is to take advantage of `hot code reloading` when working frontend with
VueJS, as the frontend code is kept outside Docker during development, but when
deployed the frontend build files are served from Docker together with the API
(The API is always served from Docker, where the Mongo database lives).

The main source code is divided between with the frontend code in `src` folder
and the backend code in the `src-api` folder. This boilerplate also used Bulma
css framework with Font Awesome Icons setup, as well as Axios for Ajax requests
(these are optional).

## First time project setup
Replace the word `myprojectname` in the following files:
- package.json
- index.html
- docker/.env
- docker/docker-compose.yml
- src-api/Database.js

#### Backend
The `src-api/ApiAccounts.js` file can be deleted, it's left as an example.
Create many of these files and include them in `Api.js` to extend what calls the
API can accept.

All API calls return a promise, as sometimes the API needs to make some internal
calls in order to complete the external call.

#### Frontend
The `src/Filters.js`, `src/Blunder.js` (error handling) are optional, but
convenient files (work in progress). The `src/components` files is where the
action happens, I've left the `Navbar.vue`, `Accounts.vue` and `Loading.vue` as
an example.

If components need to share code, example many components might need to load
a list of accounts from the API, the shared code is in `src/client`.

## To start daily development
``` bash
yarn tail & # Tail docker logs as a background task
yarn dev # Start frontend dev server on http://localhost:8080
# To stop the background task, run:
jobs
kill %1
```

## First time development setup
``` bash
# Install yarn if needed: npm install -g yarn
# Install ESLint if needed (See bellow)
yarn # Installs local dependencies
yarn docker # Starts the docker backend on http://localhost:8015/api
```

### Install ESLint (Globally)
```bash
sudo npm install -g \
eslint \
eslint-plugin-node \
eslint-plugin-import \
eslint-plugin-promise \
eslint-plugin-standard \
eslint-config-standard

# One time pr project only
cd ./myProject
eslint --init
```

Next install `linter-eslint` in Atom and enable the setting `Use global ESLint installation`.

## Deploy
Deploys the frontend code into the `dist` folder to be served from the backend on http://localhost:8015/
```bash
yarn build
```
