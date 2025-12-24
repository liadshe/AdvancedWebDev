/* eslint-disable @typescript-eslint/no-explicit-any */
import movieModel from "../model/moviesModel";
import baseController from "./baseController";
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

class MovieController extends baseController {
    constructor() {
        super(movieModel);
    }
    async create(req: AuthRequest, res: Response){
        const userId = (req as any).user?._id;
        const obj = req.body;
        obj.createdBy = userId;
        return super.create(req, res);
    }

    async update(req: AuthRequest, res: Response){
        const userId = (req as any).user?._id;
        const movieId = req.params.id;
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            return;
        }
        if (movie.createdBy.toString() !== userId) {
           res.status(403).json({ message: "Forbidden: You can only update your own movies" });
           return;
        }
        return super.update(req, res);
    }

    async del(req: AuthRequest, res: Response) {
        const userId = (req as any).user?._id;
        const movieId = req.params.id;
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            return;
        }
        if (movie.createdBy.toString() !== userId) {
              res.status(403).json({ message: "Forbidden: You can only delete your own movies" });
                return;
        }
        return super.del(req, res);;
    }
}

export default new MovieController();