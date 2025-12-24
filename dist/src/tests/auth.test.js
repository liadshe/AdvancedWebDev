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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const userModel_1 = __importDefault(require("../model/userModel"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Befroe All Tests");
    app = yield (0, index_1.default)();
    yield userModel_1.default.deleteMany();
}));
afterAll(done => {
    done();
});
describe('Auth API', () => {
    test('Register Test', () => __awaiter(void 0, void 0, void 0, function* () {
        const resoponse = yield (0, supertest_1.default)(app).post('/auth/register').send({
            email: "test@example.com",
            password: "testpassword"
        });
        expect(resoponse.body).toHaveProperty("token");
        expect(resoponse.statusCode).toBe(201);
    }));
    test('Login Test', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/auth/login').send({
            email: "test@example.com",
            password: "testpassword"
        });
        if (response.statusCode !== 200) {
            console.log("Error Body:", response.body);
            console.log("Error Path:", response.error);
        }
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
});
//# sourceMappingURL=auth.test.js.map