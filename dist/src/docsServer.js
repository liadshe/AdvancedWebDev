"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./swagger");
// Use the same port as the main app so docs can run on the app port when desired
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.listen(port, () => {
    console.log(`Docs available at http://localhost:${port}/api-docs`);
});
//# sourceMappingURL=docsServer.js.map