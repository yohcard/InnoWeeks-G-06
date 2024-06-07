import { initDb, sequelize } from "./Db/sequelize.mjs";
import express from "express";
//import dotenv from "dotenv";
const port = 3901;
const app = express();

//Lecture des documents json
app.use(express.json());

//dotenv.config();

//Connexion db
sequelize
  .authenticate()
  .then((_) => console.log("La connexion à la db a bien été établie"))
  .catch((error) => {
    console.error("Error lors de la connexion à la db", error);
  });
initDb();

app.get("/", (req, res) => {
  res.send("Api REST trouvé");
});

//Importation des routes exercices
import { ExerciseRouter } from "./Routes/Exercises.mjs";
app.use("/api/exercises", ExerciseRouter);

//Importation des routes log
import { logRouter } from "./Routes/Log.mjs";
app.use("/api/login", logRouter);

//Importation des routes log
import { EmailRouter } from "./Routes/Send-email.mjs";
app.use("/api/emails", EmailRouter);

// Si aucune route ne correspondant à l'URL demandée par le consommateur
app.use(({ req, res }) => {
  const message =
    "Impossible de trouver la ressource demandée, veuillez réesayer";
  res.status(404).json({ msg: message });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
