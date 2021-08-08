# Getting Started
* Clone the repo to your documents folder with the **git clone** command through the terminal
* Have node installed on your machine
* cd to the pixeloos-api folder and **npm install** to get the relevant dependencies, repeat this step for the pixeloos main folder
* Download postgreSQL from https://www.postgresql.org/
* From your terminal create your db with: **createdb dbname** for the API as well as the testing database
* Seed your database from the animals-schema.sql file
* Run tests from either folder with **npm test** command
* ## Set up the following env variables with **export var=value**:
  * DATABASE_URL=yourdb
  * SECRET_KEY=yoursecretkey 
  * DEV_APPROVAL_KEY=yoursecretkey 
  * PORT=3001 or port of your choice
  * NODE_ENV=development
  * BASE_URL = localhost:3001 or port of your choice for the API
* You can start the API with command **nodemon server.js** and the React front-end app with **npm start** hosted on localhost:3000
* **note that the backend API is hosted on port 3001**
* ## Key features:
* ### Name your own Pixeloo with currently 6 Pixeloos to choose from:
  * Pixeloos gain EXP and level up as you interact with them. What do the levels mean? Nothing right now, but features related to leveling will be added at a later date. Pixeloos also feel lonely when neglected for too long -- check on them from time to time. You can view their status anytime from your portal. 
* ### 20 items to buy and use to interact with your Pixeloos:
  * Items either feed or entertain your Pixeloo. Each item works a bit differently -- check out the descriptions for more info. You might just get a laugh out of the corny copywriting. 
* ### Earn coins through the More or Less minigame:
  * All the fun of a cardgame without the actual gambling! You won't lose coins for answering incorrectly. More minigames to come in the future.
## Technology used:
* NodeJS
* React
* jQuery
* CSS
* PostgreSQL
* ### Credit to https://deckofcardsapi.com/ for the minigame
* Enjoy!
