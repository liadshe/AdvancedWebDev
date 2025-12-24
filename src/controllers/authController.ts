import {Request, Response} from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendError = (res: Response, message: string, code: number = 500) => {
    res.status(code).json({ message });
}

const generateToken = (userId: string, email: string): string => {
        const secret = process.env.JWT_SECRET || "defaultsecret";
        const expires: number = parseInt(process.env.JWT_EXPIRES_IN || "3600");     
        const token = jwt.sign({ userId: userId, email: email }, secret, { expiresIn: expires });
        return token;
}

const register = async (req: Request, res: Response) => {
    // extract email and password from req.body
    const { email, password } = req.body;

    // check if email or password is missing
    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }
    try {

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // create new user in the database
    const newUser = await User.create({ email, password: encryptedPassword });

    // generate JWT token
    const token = generateToken(newUser._id.toString(), newUser.email);

    // respond with the token
    res.status(201).json({ "token": token });
    } 
    catch (error) {
        return sendError(res, "Error registering user: " + error);
    }

};
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return sendError(res, "Email and password are required");
    }

    try{
        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, "Invalid email or password", 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendError(res, "Invalid email or password", 401);
        }

        // generate JWT token
       const token = generateToken(user._id.toString(), user.email);

        // respond with the token
        res.status(200).json({ "token": token });

    }
    catch (error) {
        return sendError(res, "Error logging in user: " + error);
    }
};

export default { register, login }