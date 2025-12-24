import movieModel from "../model/moviesModel";
import {Request, Response} from "express";
import baseController from "./baseController";

const movieController = new baseController(movieModel);

export default movieController