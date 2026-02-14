import { Router } from "express";
import { FundController } from "../controllers/fund.controller";

const router = Router();

router.get("/", FundController.getAll);
router.get("/:id", FundController.getById);
router.post("/", FundController.create);
router.put("/:id", FundController.update);
router.delete("/:id", FundController.delete);

export default router;
