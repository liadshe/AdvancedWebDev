import commentModel from "../model/commentsModel";
import {Request, Response} from "express";
import baseController from "./baseController";

const commentsController = new baseController(commentModel);

export default commentsController
