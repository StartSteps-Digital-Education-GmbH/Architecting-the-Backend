import { Request, Response } from "express";
import mongoose from "mongoose";
import User from '../../src/modals/userModel';
import userContoller from '../../src/user-service/userController';

jest.mock('mongoose',() => ({
    connect: jest.fn(),
    disconnect: jest.fn()
}))

jest.mock('../../src/modals/userModel', () => ({
    Schema: jest.fn(),
    findById: jest.fn()
}));

describe('testing Users controller functions by mocking DB connection and http request/response', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    const mockUser = {_id:'123', name: 'ahmadasdas', email: 'test@test.com'};
    beforeEach(()=> {
        req = {}
        statusMock = jest.fn().mockReturnThis();
        sendMock= jest.fn();
        res = {status:statusMock, send:sendMock};
    });

    afterEach(()=> {
        jest.clearAllMocks();
    })

    it('should return a user by ID', async()=> {
        req.params = {id: '123'};
        (User.findById as jest.Mock).mockResolvedValue(mockUser);

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(mockUser);
    })
})