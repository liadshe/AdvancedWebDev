"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
const baseController_1 = __importDefault(require("./baseController"));
const movieController = new baseController_1.default(moviesModel_1.default);
exports.default = movieController;
//# sourceMappingURL=moviesController.js.map