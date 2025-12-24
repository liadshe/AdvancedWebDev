"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = __importDefault(require("../controllers/commentsController"));
const router = express_1.default.Router();
router.get("/", commentsController_1.default.getAllComments);
router.get("/:id", commentsController_1.default.getCommentById);
router.post("/", commentsController_1.default.createComment);
router.delete("/:id", commentsController_1.default.deleteComment);
router.put("/:id", commentsController_1.default.updateComment);
exports.default = router;
//# sourceMappingURL=commentsRoute.js.map