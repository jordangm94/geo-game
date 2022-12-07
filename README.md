# Welcome to GlobeHunch

`GlobeHunch` is a single player geographical exploration game in which players use street view images to explore their surroundings and then guess where they are located in the world. 

Points are awarded based on how far or close a user's guess is to the actual location and users can be placed on the leaderboard based on in game performance.

GlobeHunch is a full stack web application built with `ReactJS` on the front end, an `Express` server for the back end, and uses a `postgreSQL` database. The GlobeHunch application uses the `bing maps API` and `leaflet API` as well.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.

Create a database with the command `CREATE DATABASE game_development;`.
Make a copy of the `.env.example` file from the project root directory. Name it `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=game_development
PGPASSWORD=development
PGPORT=5432
```

## Setup
After downloading the app off of github, please follow these steps in order to get the application up and running: 

1. Using your terminal, cd into the react app directory and npm install. Cd into the server directory and do the same thing.

* `NOTE`: You will need two terminal windows open in order to run this app, one for the React APP and one for the server`

2. In order for the Application to run you will need to get a Bing Maps API Key. Please visit: https://www.bingmapsportal.com/ After creating an account and signing in, click on my account and select my keys. From here select create a new key and ensure the key type is set to basic. This will provide you with a free Bing Maps API key valid for 125,000 transactions. 

3. Once you have your key, make a copy of the `.env.example` file found in the react app directory and rename it to `.env`. Plug in your key where required as shown below, do not include the quotation marks:
* REACT_APP_API_KEY="Your key goes here"

4. Now that everything is ready to go, from within the React App Directory in your terminal run `npm start`.

5. From within the server directory in a separatate terminal window run `npm start`.


6. Visit http://localhost:3000/ in order to see the app and play. Enjoy!


## Final Product:

### Home page

!["Landing page for GlobeHunch"](https://github.com/jordangm94/geo-game/blob/master/docs/globehunch-home.png?raw=true)

### Game page

!["Game page for GlobeHunch"](https://github.com/jordangm94/geo-game/blob/master/docs/globehunch-game1.png?raw=true)

### Game page - Second photo

!["Second photo of game page for GlobeHunch"](https://github.com/jordangm94/geo-game/blob/master/docs/globehunch-game2.png?raw=true)

### Leaderboard

!["Leaderboard page for GlobeHunch"](https://github.com/jordangm94/geo-game/blob/master/docs/globehunch-leaderboard.png?raw=true)

### Tutorial page

!["Tutorial page for GlobeHunch"](https://github.com/jordangm94/geo-game/blob/master/docs/globehunch-tutorial.png?raw=true)

## Dependencies: 
* Express
* Bcrypyt
* Cookie session
* Pg
* Axios
* Antd
* Bingmaps React
* Leaflet
* React-Leaflet
* React Router
