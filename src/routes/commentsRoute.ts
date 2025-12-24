import express from "express";
import commentsController from "../controllers/commentsController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", commentsController.getAll.bind(commentsController)); 

router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", authMiddleware, commentsController.create.bind(commentsController));

router.delete("/:id", authMiddleware, commentsController.del.bind(commentsController));    

router.put("/:id", authMiddleware, commentsController.update.bind(commentsController));
export default router;
