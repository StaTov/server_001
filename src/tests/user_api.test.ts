import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import UserModel from '../models/user';
import { fetchOneUser, fetchUsers, initialUsers } from './test_helper';
import { User } from '../types';



const api = supertest(app);

describe('TEST USER_API', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await UserModel.insertMany(initialUsers);
    });

    describe('method: GET, path: /user', () => {
        test('users are returned as json', async () => {
            await api
                .get('/user')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });
        test('all users are returned', async () => {
            const response = await api.get('/user');
            expect(response.body).toHaveLength(initialUsers.length);
        });
    });

    describe('method: GET, path: /user/:id', () => {
        test('Wrong id return error', async () => {
            const wrongId = 'wrong';
            await api
                .get(`/user/${wrongId}`)
                .expect(404);
        });
        test('Exist user get to valid id succesful', async () => {
            let users = await UserModel.find({});
            users = [...users].map(u => u.toJSON());
            const existUser = users[0];

            const response = await api
                .get(`/user/${existUser.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(response.body).toEqual(existUser);
        });
    });

    describe('method: POST, path: /user', () => {
        test('missing data return error 400', async () => {
            const misUsername = {};
            await api
                .post('/user')
                .send(misUsername)
                .expect(400);
        });
        test('valid user created with status 201', async () => {
            const userObj = { username: 'testName', password: 'testPassword' };
            await api
                .post('/user')
                .send(userObj)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const allUsers = await fetchUsers();

            expect(allUsers.length).toBe(initialUsers.length + 1);
            expect(allUsers[2].username).toBe(userObj.username);
        });
        test('non-unique username return error 400', async () => {
            const userObj = { username: initialUsers[0].username, password: 'pwd' };
            await api
                .post('/user')
                .send(userObj)
                .expect(400);
        });
    });
    describe('method: DELETE, path: /user/id', () => {
        test.only('success delete with status 200', async () => {
            const usersBefor = await fetchUsers();

            //add new user
            const newUser = { username: 'newName', password: 'newPassword' };
            await api
                .post('/user')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const userAfterPost = await fetchUsers();
            const AllUsersAfterPost = await fetchUsers();
            expect(userAfterPost.length).toBe(usersBefor.length + 1);

            //delete added user
            const savedUser = await fetchOneUser({ username: newUser.username });
            const id = savedUser.id;
            await api
                .delete(`/${id}`)
                .expect(200);

            const usersAfter = await fetchUsers();
            expect(usersAfter.length).toBe(usersBefor.length);
            expect(usersAfter.length).toBe(AllUsersAfterPost.length - 1);

        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});