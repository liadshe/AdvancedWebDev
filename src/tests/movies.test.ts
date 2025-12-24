import request from "supertest";
import initApp from '../index';
import moviesModel from '../model/moviesModel';
import User from "../model/userModel";
import { Express } from 'express';    

let app:Express;
type Movie = {
    title: string;
    year: number;
    _id?: string;
};
const moviesData:Movie[] = [
    {
        title: "movie1", year: 2025, 
    },
    {
        title: "movie2", year: 2024,
    }
];

const user = {email: "test@example.com", password: "testpassword", _id:"", token:""};

beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp();    
    await moviesModel.deleteMany();
    await User.deleteMany({"email": user.email});
    // register user and get token
    const resoponse = await request(app).post('/auth/register').send(user);
    user._id = resoponse.body._id;
    user.token = resoponse.body.token;
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
       for (const movie of moviesData){
        const response = await request(app)
            .post('/movie').set("Authorization", `Bearer ${user.token}`)
            .send(movie);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(movie.title);
        expect(response.body.year).toBe(movie.year);
       };
    }) ;
    test('GET all movies', async () => {    
        const response = await request(app).get('/movie');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(moviesData.length);
    });
    
    test('GET movies by year', async () => {
        const response = await request(app).get('/movie?year='+ moviesData[0].year);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe(moviesData[0].title);
        moviesData[0]._id = response.body[0]._id;
    });

    // get movie by id 
    test('GET movie by ID', async () => {
        // first, get all movies to find an ID
        const response = await request(app).get('/movie/'+ moviesData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(moviesData[0].title);
    });

    // update movie by id
    test('UPDATE movie by ID', async () => {
        moviesData[0].title = "updatedMovie1";
        moviesData[0].year = 2023;
        const response = await request(app)
            .put('/movie/' + moviesData[0]._id).set("Authorization", `Bearer ${user.token}`)
            .send(moviesData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(moviesData[0].title);
    });

    // delete movie by id   
    test('DELETE movie by ID', async () => {
        const response = await request(app)
            .delete('/movie/' + moviesData[0]._id).set("Authorization", `Bearer ${user.token}`);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/movie/' + moviesData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    });

});
