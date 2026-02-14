import { Request, Response } from "express";
import { FundModel } from "../models/fund.model";

export const FundController = {
  async getAll(_req: Request, res: Response) {
    try {
      const funds = await FundModel.getAll();
      res.json(funds);
    } catch (err) {
      console.error("Error fetching funds:", err);
      res.status(500).json({ error: "Failed to fetch funds" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid fund ID" });
        return;
      }

      const fund = await FundModel.getById(id);
      if (!fund) {
        res.status(404).json({ error: "Fund not found" });
        return;
      }

      res.json(fund);
    } catch (err) {
      console.error("Error fetching fund:", err);
      res.status(500).json({ error: "Failed to fetch fund" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, amount, description } = req.body;

      if (!name || amount === undefined) {
        res.status(400).json({ error: "name and amount are required" });
        return;
      }

      const fund = await FundModel.create({ name, amount, description });
      res.status(201).json(fund);
    } catch (err) {
      console.error("Error creating fund:", err);
      res.status(500).json({ error: "Failed to create fund" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid fund ID" });
        return;
      }

      const { name, amount, description } = req.body;
      const fund = await FundModel.update(id, { name, amount, description });

      if (!fund) {
        res.status(404).json({ error: "Fund not found" });
        return;
      }

      res.json(fund);
    } catch (err) {
      console.error("Error updating fund:", err);
      res.status(500).json({ error: "Failed to update fund" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid fund ID" });
        return;
      }

      const deleted = await FundModel.delete(id);
      if (!deleted) {
        res.status(404).json({ error: "Fund not found" });
        return;
      }

      res.status(204).send();
    } catch (err) {
      console.error("Error deleting fund:", err);
      res.status(500).json({ error: "Failed to delete fund" });
    }
  },
};
