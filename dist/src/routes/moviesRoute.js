"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = __importDefault(require("../controllers/moviesController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie operations
 */
/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get("/", moviesController_1.default.getAll.bind(moviesController_1.default));
/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie object
 */
router.get("/:id", moviesController_1.default.getById.bind(moviesController_1.default));
/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Create a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authMiddleware_1.default, moviesController_1.default.create.bind(moviesController_1.default));
/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", authMiddleware_1.default, moviesController_1.default.del.bind(moviesController_1.default));
/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", authMiddleware_1.default, moviesController_1.default.update.bind(moviesController_1.default));
exports.default = router;
//# sourceMappingURL=moviesRoute.js.map