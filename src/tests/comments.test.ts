import request from "supertest";
import initApp from '../index';
import commentModel from '../model/commentsModel';
import { Express } from 'express';  
import {registerUserTest, commentData, userData} from "./testUtils";

let app:Express;



beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp();    
   await commentModel.deleteMany();
   await registerUserTest(app);
});

afterAll(done => {      
    done()
})  

describe('Comments API', () => {
    test('Check empty DB', async () => {
        const response = await request(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]); // when db is empty
    });

    test('Create Comments', async () => {
       for (const comment of commentData){
        const response = await request(app)
            .post('/comment')
            .set("Authorization", "Bearer " + userData.token)
            .send(comment);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.userId).toBe(comment.userId);
        expect(response.body.message).toBe(comment.message);
        expect(response.body.movieId).toBe(comment.movieId);
       };
    }) ;

    test('GET all comments', async () => {
        const response = await request(app).get('/comment');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(commentData.length);

        // store the _id for later tests
        for (let i=0; i<commentData.length; i++){
            commentData[i]._id = response.body[i]._id;
        }
    });

    test('GET comments by movieId', async () => {
        const response = await request(app).get('/comment?movieId='+ commentData[0].movieId);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].userId).toBe(commentData[0].userId);
        expect(response.body[1].userId).toBe(commentData[2].userId);
    });

    // get comment by id 
    test('GET comment by ID', async () => {
        // first, get all comments to find an ID
        const response = await request(app).get('/comment/'+ commentData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentData[0].message);
    });

    // update comment by id
    test('UPDATE comment by ID', async () => {
        commentData[0].message = "updatedComment1";        
        const response = await request(app)
            .put('/comment/' + commentData[0]._id)
            .set("Authorization", "Bearer " + userData.token)
            .send(commentData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentData[0].message  );
    });

    // delete comment by id   
    test('DELETE comment by ID', async () => {
        const response = await request(app)
            .delete('/comment/' + commentData[0]._id)
            .set("Authorization", "Bearer " + userData.token);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/comment/' + commentData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    });

});
