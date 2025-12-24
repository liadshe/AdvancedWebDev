import express from "express";
import commentsController from "../controllers/commentsController";

const router = express.Router();

router.get("/", commentsController.getAllComments); 

router.get("/:id", commentsController.getCommentById);

router.post("/", commentsController.createComment);

router.delete("/:id", commentsController.deleteComment);    

router.put("/:id", commentsController.updateComment);


export default router;
