import request from "supertest";
import initApp from '../index';
import { Express } from 'express';    
import User from "../model/userModel";
let app:Express;


beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp(); 
    await User.deleteMany();   
});

afterAll(done => {      
    done()
})  

describe('Auth API', () => {
    test('Register Test', async () => {
        const resoponse = await request(app).post('/auth/register').send({
            email: "test@example.com",
            password: "testpassword"
        });
        expect(resoponse.body).toHaveProperty("token");
        expect(resoponse.statusCode).toBe(201);
    });

    test('Login Test', async () => {
        const response = await request(app).post('/auth/login').send({
            email: "test@example.com",
            password: "testpassword"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

});