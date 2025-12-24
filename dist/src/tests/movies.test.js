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
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
let app;
const moviesData = [
    {
        title: "movie1", year: 2025,
    },
    {
        title: "movie2", year: 2024,
    }
];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Befroe All Tests");
    app = yield (0, index_1.default)();
    yield moviesModel_1.default.deleteMany();
}));
afterAll(done => {
    done();
});
describe('Movies API', () => {
    test('Check empty DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); // when db is empty
    }));
    test('create 2 movies', () => __awaiter(void 0, void 0, void 0, function* () {
        for (const movie of moviesData) {
            const response = yield (0, supertest_1.default)(app)
                .post('/movie')
                .send(movie);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(movie.title);
            expect(response.body.year).toBe(movie.year);
        }
        ;
    }));
    test('GET movies by year', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/movie?year=' + moviesData[0].year);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe(moviesData[0].title);
        moviesData[0]._id = response.body[0]._id;
    }));
    // get movie by id 
    test('GET movie by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // first, get all movies to find an ID
        const response = yield (0, supertest_1.default)(app).get('/movie/' + moviesData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(moviesData[0].title);
    }));
    // update movie by id
    test('UPDATE movie by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        moviesData[0].title = "updatedMovie1";
        moviesData[0].year = 2023;
        const response = yield (0, supertest_1.default)(app)
            .put('/movie/' + moviesData[0]._id)
            .send(moviesData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(moviesData[0].title);
    }));
    // delete movie by id   
    test('DELETE movie by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete('/movie/' + moviesData[0]._id);
        expect(response.statusCode).toBe(200);
        const getResponse = yield (0, supertest_1.default)(app).get('/movie/' + moviesData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=movies.test.js.map