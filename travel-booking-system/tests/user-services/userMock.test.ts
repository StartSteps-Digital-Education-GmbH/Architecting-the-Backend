import { Request, Response } from "express";
import mongoose from "mongoose";
import User from '../../src/modals/userModel';
import userContoller from '../../src/user-service/userController';

jest.mock('mongoose',() => ({
    connect: jest.fn(), //initializing
    disconnect: jest.fn()
}))

jest.mock('../../src/modals/userModel', () => ({
    Schema: jest.fn(), //initialing
    findById: jest.fn()
}));

describe('testing Users controller functions by mocking DB connection and http request/response', () => {
    let req: Partial<Request>; //defination
    let res: Partial<Response>;

    let statusMock: jest.Mock; //defination
    let sendMock: jest.Mock;

    const mockUser = {_id:'123', name: 'ahmadasdas', email: 'test@test.com'}; //mocked data
    beforeEach(()=> {
        req = {}
        statusMock = jest.fn().mockReturnThis(); //return this(res)
        sendMock= jest.fn();
        res = {status:statusMock, send:sendMock};
    });

    afterEach(()=> {
        jest.clearAllMocks();
    })

    it('should return a user by ID', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockResolvedValue(mockUser); //mocking the resolved case of a promise(return a value from function)

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(mockUser);
    })

    it('should return 404 when the user is not found', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockResolvedValue(undefined); //Mocking the case when user is not found from DB

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(sendMock).toHaveBeenCalledWith({ message: 'User not found' });
    })

    it('should return 404 when the user is not found', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockRejectedValue({error: 'DB not working'}); //Mocking the Caase when thier is an issue with DB

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith({error: 'DB not working'});
    })

})