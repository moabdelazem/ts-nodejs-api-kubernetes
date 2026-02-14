import express from "express";
import fundRoutes from "./routes/fund.routes";
import healthRoutes from "./routes/health.routes";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();

// Body parsing
app.use(express.json());

// Request logging
app.use(requestLogger);

// Routes
app.use("/health", healthRoutes);
app.use("/api/funds", fundRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
