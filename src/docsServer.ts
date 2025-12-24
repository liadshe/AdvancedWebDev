import express from "express";
import { swaggerUi, swaggerSpec } from "./swagger";

// Use the same port as the main app so docs can run on the app port when desired
const port = process.env.PORT || 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Docs available at http://localhost:${port}/api-docs`);
});
