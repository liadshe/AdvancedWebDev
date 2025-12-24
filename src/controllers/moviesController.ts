import movieModel from "../model/moviesModel";
import baseController from "./baseController";

const movieController = new baseController(movieModel);

export default movieController