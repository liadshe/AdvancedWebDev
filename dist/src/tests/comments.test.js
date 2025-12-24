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
const commentsModel_1 = __importDefault(require("../model/commentsModel"));
let app;
const commentsData = [
    {
        userId: "1111", message: "comment1", movieId: "movieId1",
    },
    {
        userId: "2222", message: "comment2", movieId: "movieId2",
    },
    {
        userId: "3333", message: "comment3", movieId: "movieId1",
    }
];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Befroe All Tests");
    app = yield (0, index_1.default)();
    yield commentsModel_1.default.deleteMany();
}));
afterAll(done => {
    done();
});
describe('Comments API', () => {
    test('Check empty DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); // when db is empty
    }));
    test('Create Comments', () => __awaiter(void 0, void 0, void 0, function* () {
        for (const comment of commentsData) {
            const response = yield (0, supertest_1.default)(app)
                .post('/comment')
                .send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body.userId).toBe(comment.userId);
            expect(response.body.message).toBe(comment.message);
            expect(response.body.movieId).toBe(comment.movieId);
        }
        ;
    }));
    test('GET all comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(commentsData.length);
        // store the _id for later tests
        for (let i = 0; i < commentsData.length; i++) {
            commentsData[i]._id = response.body[i]._id;
        }
    }));
    test('GET comments by movieId', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/comment?movieId=' + commentsData[0].movieId);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].userId).toBe(commentsData[0].userId);
        expect(response.body[1].userId).toBe(commentsData[2].userId);
    }));
    // get comment by id 
    test('GET comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // first, get all comments to find an ID
        const response = yield (0, supertest_1.default)(app).get('/comment/' + commentsData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentsData[0].message);
    }));
    // update comment by id
    test('UPDATE comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        commentsData[0].message = "updatedComment1";
        const response = yield (0, supertest_1.default)(app)
            .put('/comment/' + commentsData[0]._id)
            .send(commentsData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentsData[0].message);
    }));
    // delete comment by id   
    test('DELETE comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete('/comment/' + commentsData[0]._id);
        expect(response.statusCode).toBe(200);
        const getResponse = yield (0, supertest_1.default)(app).get('/comment/' + commentsData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=comments.test.js.map