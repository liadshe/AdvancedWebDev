import commentModel from "../model/commentsModel";
import {Request, Response} from "express";

const getAllComments = async (req: Request, res: Response) => {
  try {
    const movieId = req.query.movieId;
    if (movieId) {
      const commentsByMovieId = await commentModel.find({ movieId: movieId });
      return res.json(commentsByMovieId);
    } else {
      const comments = await commentModel.find();
      res.json(comments);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comments");
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const comment = await commentModel.findById(id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comment by ID");
  }
};

const createComment = async (req: Request, res: Response) => {
  const commentData = req.body;
  console.log(commentData);
  try {
    const newComment = await commentModel.create(commentData);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating comment");
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedComment = await commentModel.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).json(deletedComment._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting comment");
  }
};

const updateComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const comment = await commentModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating comment");
  }
};

export default {
  getAllComments,
  getCommentById,
  createComment,
  deleteComment,
  updateComment,
};

