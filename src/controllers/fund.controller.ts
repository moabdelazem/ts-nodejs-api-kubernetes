import { Request, Response, NextFunction } from "express";
import { FundModel } from "../models/fund.model";
import { createFundSchema, updateFundSchema } from "../schemas/fund.schema";
import { AppError } from "../utils/app-error";

const DIVERSIFICATION_CAP = 10;
const COVERAGE_CAP = 50_000;

function calculateShieldScore(fundCount: number, totalAmount: number): number {
  const diversification = Math.min(fundCount / DIVERSIFICATION_CAP, 1);
  const coverage = Math.min(totalAmount / COVERAGE_CAP, 1);
  return Math.round((diversification * 0.5 + coverage * 0.5) * 100);
}

export const FundController = {
  async getSummary(_req: Request, res: Response, next: NextFunction) {
    try {
      const { total_amount, fund_count } = await FundModel.getSummary();
      const shield_score = calculateShieldScore(fund_count, total_amount);
      res.json({ total_amount, fund_count, shield_score });
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const funds = await FundModel.getAll();
      res.json(funds);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw AppError.badRequest("Invalid fund ID");

      const fund = await FundModel.getById(id);
      if (!fund) throw AppError.notFound("Fund not found");

      res.json(fund);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createFundSchema.parse(req.body);
      const fund = await FundModel.create(data);
      res.status(201).json(fund);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw AppError.badRequest("Invalid fund ID");

      const data = updateFundSchema.parse(req.body);
      const fund = await FundModel.update(id, data);
      if (!fund) throw AppError.notFound("Fund not found");

      res.json(fund);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw AppError.badRequest("Invalid fund ID");

      const deleted = await FundModel.delete(id);
      if (!deleted) throw AppError.notFound("Fund not found");

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
