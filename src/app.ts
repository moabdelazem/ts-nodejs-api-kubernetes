import express from "express";
import fundRoutes from "./routes/fund.routes";

const app = express();
app.use(express.json());

app.use("/api/funds", fundRoutes);

export default app;
