import express from "express";
import moviesController from "../controllers/moviesController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", moviesController.getAll.bind(moviesController));

router.get("/:id", moviesController.getById.bind(moviesController));

router.post("/", authMiddleware, moviesController.create.bind(moviesController));

router.delete("/:id", authMiddleware, moviesController.del.bind(moviesController));

router.put("/:id", authMiddleware, moviesController.update.bind(moviesController));
export default router;
