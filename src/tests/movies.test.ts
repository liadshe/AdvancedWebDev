import request from "supertest";
import initApp from '../index';
import moviesModel from '../model/moviesModel';
import { Express } from 'express';    
import { registerUserTest, userData, movieData} from "./testUtils";
let app:Express;


beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp();    
    await moviesModel.deleteMany();
    await registerUserTest(app);
});

afterAll(done => {      
    done()
})  

describe('Movies API', () => {
    test('Check empty DB', async () => {
        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); // when db is empty
    });

    test('create 2 movies', async () => {
       for (const movie of movieData){
        const response = await request(app)
            .post('/movie').set("Authorization", `Bearer ${userData.token}`)
            .send(movie);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(movie.title);
        expect(response.body.year).toBe(movie.year);
       };
    }) ;
    test('GET all movies', async () => {    
        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(movieData.length);
    });
    
    test('GET movies by year', async () => {
        const response = await request(app).get('/movie?year='+ movieData[0].year);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe(movieData[0].title);
        movieData[0]._id = response.body[0]._id;
    });

    // get movie by id 
    test('GET movie by ID', async () => {
        // first, get all movies to find an ID
        const response = await request(app).get('/movie/'+ movieData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(movieData[0].title);
    });

    // update movie by id
    test('UPDATE movie by ID', async () => {
        movieData[0].title = "updatedMovie1";
        movieData[0].year = 2023;
        const response = await request(app)
            .put('/movie/' + movieData[0]._id).set("Authorization", `Bearer ${userData.token}`)
            .send(movieData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(movieData[0].title);
    });

    // delete movie by id   
    test('DELETE movie by ID', async () => {
        const response = await request(app)
            .delete('/movie/' + movieData[0]._id).set("Authorization", `Bearer ${userData.token}`);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/movie/' + movieData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    });

});
