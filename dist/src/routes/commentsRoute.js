"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = __importDefault(require("../controllers/commentsController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment operations
 */
/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/", commentsController_1.default.getAll.bind(commentsController_1.default));
/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment object
 */
router.get("/:id", commentsController_1.default.getById.bind(commentsController_1.default));
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authMiddleware_1.default, commentsController_1.default.create.bind(commentsController_1.default));
/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
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
router.delete("/:id", authMiddleware_1.default, commentsController_1.default.del.bind(commentsController_1.default));
/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
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
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", authMiddleware_1.default, commentsController_1.default.update.bind(commentsController_1.default));
exports.default = router;
//# sourceMappingURL=commentsRoute.js.map