import { Express } from "express";
import request from "supertest";
import User from "../model/userModel";

type user = {
    email: string;
    password: string;   
    _id?: string;
    token?: string;
};

export const userData:user = {email: "test@example.com", password: "testpassword"};

type movie = {
    title: string;
    year: number;
    _id?: string;
};

export const movieData:movie[] = [
    {
        title: "movie1", year: 2025,   
    },
    {
        title: "movie2", year: 2024,   
    },
    {
        title: "movie3", year: 2023,   
    }
];

type comment = {
    userId: string;
    message: string;
    movieId: string;
    _id?: string;
};
export const commentData:comment[] = [
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

export const registerUserTest = async (app: Express) => {
    await User.deleteMany({"email": userData.email});
    // register user and get token
    const response = await request(app).post('/auth/register').send(userData);
    userData._id = response.body._id;
    userData.token = response.body.token;
    return response;
}
