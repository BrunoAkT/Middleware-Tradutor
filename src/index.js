import express from "express";
import { processarPost } from "./pages/JSON/post.js";
import { processarGet } from "./pages/JSON/Get.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


// Rotas

// Rota para tradução via JSON
app.post("/traduzir", processarPost);
app.get("/traduzir", processarGet);

app.listen(process.env.PORT, () => {
  console.log(`Middleware rodando na porta ${process.env.PORT}`);
});
