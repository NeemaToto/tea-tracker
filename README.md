# Tea Tracker

## Made by Kai, Aldrin, Meelaud, Neema (Set G)

## Description
Tea Tracker is a full-stack application that allows you to keep track of teas you have drunk. It's a great way to explore different teas without getting confused about which ones you have tried before, as there are hundreds of unique teas out there!

## To Run the Application Locally 
1. Clone app from github
2. Run npm install to download dependencies
```
npm install
```
3. Open pgAdmin 4 and create a new database named teas-drank
4. Create a new table in the database with this code:
```
CREATE TABLE teas (
    id SERIAL PRIMARY KEY,
    tea_drank VARCHAR(100) UNIQUE,
    drank BOOLEAN DEFAULT false
);
```
5. Configure database settings in app.js to match
```
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "teas-drank",
  password: "YOUR PASSWORD HERE",
  port: 5432,
});
```
6. Run app.js
```
nodemon app.js
```
