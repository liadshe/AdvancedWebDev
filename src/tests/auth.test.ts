import request from "supertest";
import initApp from '../index';
import { Express } from 'express';    
import User from "../model/userModel";
import Movie from "../model/moviesModel";
import {userData, movieData} from "./testUtils";

let app:Express;



beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp(); 
    await User.deleteMany();
    await Movie.deleteMany();   
});

afterAll(done => {      
    done()
})  

describe('Auth API', () => {

    test("Access restricted url denied", async () => {
        const response = await request(app).post('/movie').send(movieData[0]);
        expect(response.statusCode).toBe(401);
    });

    test('Register Test', async () => {
        const resoponse = await request(app).post('/auth/register').send(userData);
        userData._id = resoponse.body._id;
        expect(resoponse.body).toHaveProperty("token");
        expect(resoponse.statusCode).toBe(201);
    });

    test('Login Test', async () => {
        const response = await request(app).post('/auth/login').send(userData);
        userData.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    test("Access with token permitted", async () => {       
        const response = await request(app).post('/movie').set("Authorization", `Bearer ${userData.token}`).send(movieData[0]);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
    });

    test("Access with modified token denied", async () => {   
        const newToken = userData.token + "modified";    
        const response = await request(app).post('/movie').set("Authorization", `Bearer ${newToken}`).send(movieData[1]);
        expect(response.statusCode).toBe(401);
    });
    
    // set jet timout to 10 seconds
    jest.setTimeout(10000);

    test("Token Expiration", async () => {
        // assuming the token expiration is set to 5 second for testing purposes
        await new Promise(res => setTimeout(res, 6000)); // wait for 6 seconds
        const response = await request(app).post('/movie').set("Authorization", `Bearer ${userData.token}`).send(movieData[1]);
        expect(response.statusCode).toBe(401);  
    });
});