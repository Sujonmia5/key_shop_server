import express from "express";
import cors from "cors";
import router from "./app/routes/routes";
import globalErrorHendler from "./app/middleware/globalErrorHandler";

const app = express();

// express parsers
app.use(express.json());
// CORS middleware
app.use(cors());

// Define routes
app.get("", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", router);

app.use(globalErrorHendler);
export default app;
