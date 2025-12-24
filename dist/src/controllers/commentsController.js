"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentsModel_1 = __importDefault(require("../model/commentsModel"));
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.query.movieId;
        if (movieId) {
            const commentsByMovieId = yield commentsModel_1.default.find({ movieId: movieId });
            return res.json(commentsByMovieId);
        }
        else {
            const comments = yield commentsModel_1.default.find();
            res.json(comments);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving comments");
    }
});
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const comment = yield commentsModel_1.default.findById(id);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        res.json(comment);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving comment by ID");
    }
});
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = req.body;
    console.log(commentData);
    try {
        const newComment = yield commentsModel_1.default.create(commentData);
        res.status(201).json(newComment);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error creating comment");
    }
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedComment = yield commentsModel_1.default.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).send("Comment not found");
        }
        res.status(200).json(deletedComment._id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting comment");
    }
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const comment = yield commentsModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.json(comment);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error updating comment");
    }
});
exports.default = {
    getAllComments,
    getCommentById,
    createComment,
    deleteComment,
    updateComment,
};
//# sourceMappingURL=commentsController.js.map