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
/* eslint-disable @typescript-eslint/no-explicit-any */
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
const baseController_1 = __importDefault(require("./baseController"));
class MovieController extends baseController_1.default {
    constructor() {
        super(moviesModel_1.default);
    }
    create(req, res) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const obj = req.body;
            obj.createdBy = userId;
            return _super.create.call(this, req, res);
        });
    }
    update(req, res) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const movieId = req.params.id;
            const movie = yield moviesModel_1.default.findById(movieId);
            if (!movie) {
                return;
            }
            if (movie.createdBy.toString() !== userId) {
                res.status(403).json({ message: "Forbidden: You can only update your own movies" });
                return;
            }
            return _super.update.call(this, req, res);
        });
    }
    del(req, res) {
        const _super = Object.create(null, {
            del: { get: () => super.del }
        });
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const movieId = req.params.id;
            const movie = yield moviesModel_1.default.findById(movieId);
            if (!movie) {
                return;
            }
            if (movie.createdBy.toString() !== userId) {
                res.status(403).json({ message: "Forbidden: You can only delete your own movies" });
                return;
            }
            return _super.del.call(this, req, res);
            ;
        });
    }
}
exports.default = new MovieController();
//# sourceMappingURL=moviesController.js.map