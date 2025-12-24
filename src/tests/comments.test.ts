import request from "supertest";
import initApp from '../index';
import commentModel from '../model/commentsModel';
import { Express } from 'express';    

let app:Express;
type Comment = {
    userId: string;
    message: string;
    movieId: string;
    _id?: string;
};
const commentsData:Comment[] = [
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

beforeAll(async () => {  
    console.log("Befroe All Tests") 
    app = await initApp();    
   await commentModel.deleteMany();
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
       for (const comment of commentsData){
        const response = await request(app)
            .post('/comment')
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
        expect(response.body.length).toBe(commentsData.length);

        // store the _id for later tests
        for (let i=0; i<commentsData.length; i++){
            commentsData[i]._id = response.body[i]._id;
        }
    });

    test('GET comments by movieId', async () => {
        const response = await request(app).get('/comment?movieId='+ commentsData[0].movieId);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].userId).toBe(commentsData[0].userId);
        expect(response.body[1].userId).toBe(commentsData[2].userId);
    });

    // get comment by id 
    test('GET comment by ID', async () => {
        // first, get all comments to find an ID
        const response = await request(app).get('/comment/'+ commentsData[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentsData[0].message);
    });

    // update comment by id
    test('UPDATE comment by ID', async () => {
        commentsData[0].message = "updatedComment1";        
        const response = await request(app)
            .put('/comment/' + commentsData[0]._id)
            .send(commentsData[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(commentsData[0].message  );
    });

    // delete comment by id   
    test('DELETE comment by ID', async () => {
        const response = await request(app)
            .delete('/comment/' + commentsData[0]._id);
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get('/comment/' + commentsData[0]._id);
        expect(getResponse.statusCode).toBe(404);
    });

});
