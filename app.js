const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const pg = require("pg");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "teas-drank",
  password: "1234",
  port: 5432,
});

db.connect()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/NeemaToto/NeemaToto.github.io/main/data/tea.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

app.get("/", async (req, res) => {
  try {
    const teaData = await fetchData();
    const { rows } = await db.query("SELECT tea_drank FROM teas");
    const teaDrankNames = rows.map((row) => row.tea_drank);
    res.render("index", { teaData, teaDrankNames });
  } catch (error) {
    console.error("Error rendering page:", error);
    res.sendStatus(500);
  }
});

app.get("/tea", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT tea_drank FROM teas WHERE drank = true"
    );
    const drankTeas = result.rows.map((row) => row.tea_drank);
    res.json(drankTeas);
  } catch (error) {
    console.error("Error fetching drank teas:", error);
    res.sendStatus(500);
  }
});

app.post("/tea", async (req, res) => {
  const { teaName, drank } = req.body;
  try {
    if (drank) {
      await db.query(
        "INSERT INTO teas (tea_drank, drank) VALUES ($1, $2) ON CONFLICT (tea_drank) DO UPDATE SET drank = EXCLUDED.drank",
        [teaName, drank]
      );
    } else {
      await db.query("DELETE FROM teas WHERE tea_drank = $1", [teaName]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error storing tea data:", error);
    res.sendStatus(500);
  }
});
