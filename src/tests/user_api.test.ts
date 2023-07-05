import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import UserModel from '../models/user';

import { fetchUsers, initialUsers, userObj } from './test_helper';

const api = supertest(app);

describe('TEST USER_API', () => {

    describe('USER Route', () => {

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

        describe('method: DELETE, path: /user/id', () => {
            test('success delete with status 200', async () => {

                const users = await fetchUsers();

                //delete  user

                const id = users[0].id;
                await api
                    .delete(`/user/${id}`)
                    .expect(200);

                const usersAfter = await fetchUsers();
                expect(usersAfter.length).toBe(users.length - 1);
            });
        });
    });

    describe('AUTH Route', () => {

        beforeEach(async () => {
            await UserModel.deleteMany({});
            await UserModel.insertMany(initialUsers);
        });
        describe('method: POST, path: /auth/reg', () => {
            test('missing data return error 400', async () => {
                const missUsername = {};
                await api
                    .post('/auth/reg')
                    .send(missUsername)
                    .expect(400);
            });
            test('valid user created with status 201', async () => {

                await api
                    .post('/auth/reg')
                    .send(userObj)
                    .expect(201)
                    .expect('Content-Type', /application\/json/);

                const allUsers = await fetchUsers();

                expect(allUsers.length).toBe(initialUsers.length + 1);
                expect(allUsers[2].username).toBe(userObj.username);
            });
            test('non-unique username return error 400', async () => {
                const noUniqueUsernameUser = { ...userObj, username: initialUsers[0].username };
                await api
                    .post('/auth/reg')
                    .send(noUniqueUsernameUser)
                    .expect(400);
            });
            test('saved user return with no password', async () => {
                const response = await api
                    .post('/auth/reg')
                    .send(userObj)
                    .expect(201);

                expect(response.body.auth).toBeUndefined();

            });
        });
        describe('method: POST, path: /auth/loin', () => {
            test('not exist email return error 400 ', async () => {
                const credentials = { email: 'notExist@mail.com', password: 'pwd' };
                await api
                    .post('/auth/login')
                    .send(credentials)
                    .expect(400);
            });
            test('not valid password return error 400 ', async () => {
                const credentials = { email: 'one@test.com', password: 'noValid' };
                await api
                    .post('/auth/login')
                    .send(credentials)
                    .expect(400);
            });
            test('Valid email and password success (200) ', async () => {
                const obj = { email: 'new@email.com', username: 'newUsername', password: 'newPassword' };
                await api
                    .post('/auth/reg')
                    .send(obj)
                    .expect(201)
                    .expect('Content-Type', /application\/json/);

                await api
                    .post('/auth/login')
                    .send({ email: 'new@email.com', password: 'newPassword' })
                    .expect(200);
            });
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});