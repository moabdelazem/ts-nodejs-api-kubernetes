import { Router, Request, Response } from "express";
import { query } from "../config/db";
import { version } from "../../package.json";

const router = Router();

router.get("/live", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

router.get("/ready", async (_req: Request, res: Response) => {
  try {
    await query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

router.get("/info", (_req: Request, res: Response) => {
  res.json({
    version,
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
