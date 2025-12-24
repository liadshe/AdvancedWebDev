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
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
let app;
const user = { email: "test@example.com", password: "testpassword", _id: "", token: "" };
const movie1 = { title: "Test Movie", year: 2025 };
const movie2 = { title: "Another Test Movie", year: 2024 };
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Befroe All Tests");
    app = yield (0, index_1.default)();
    yield userModel_1.default.deleteMany();
    yield moviesModel_1.default.deleteMany();
}));
afterAll(done => {
    done();
});
describe('Auth API', () => {
    test("Access restricted url denied", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/movie').send(movie1);
        expect(response.statusCode).toBe(401);
    }));
    test('Register Test', () => __awaiter(void 0, void 0, void 0, function* () {
        const resoponse = yield (0, supertest_1.default)(app).post('/auth/register').send(user);
        user._id = resoponse.body._id;
        expect(resoponse.body).toHaveProperty("token");
        expect(resoponse.statusCode).toBe(201);
    }));
    test('Login Test', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/auth/login').send(user);
        user.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    test("Access with token permitted", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/movie').set("Authorization", `Bearer ${user.token}`).send(movie1);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
    }));
    test("Access with modified token denied", () => __awaiter(void 0, void 0, void 0, function* () {
        const newToken = user.token + "modified";
        const response = yield (0, supertest_1.default)(app).post('/movie').set("Authorization", `Bearer ${newToken}`).send(movie2);
        expect(response.statusCode).toBe(401);
    }));
    // set jet timout to 10 seconds
    jest.setTimeout(10000);
    test("Token Expiration", () => __awaiter(void 0, void 0, void 0, function* () {
        // assuming the token expiration is set to 5 second for testing purposes
        yield new Promise(res => setTimeout(res, 6000)); // wait for 6 seconds
        const response = yield (0, supertest_1.default)(app).post('/movie').set("Authorization", `Bearer ${user.token}`).send(movie2);
        expect(response.statusCode).toBe(401);
    }));
});
//# sourceMappingURL=auth.test.js.map