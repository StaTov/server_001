import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import User from '../models/User';



const api = supertest(app);

const initialUsers = [
    {
        username: 'Stainslav',
        password: 'one'
    },
    {
        username: 'Olya',
        password: 'two'
    }
];

describe('TEST USER_API', () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await User.insertMany(initialUsers);
    });
    describe('method: GET, path: /', () => {

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
    describe('method: GET, path: /:id', () => {
        test('Wrong id return error', async () => {
            const wrongId = 'wrong';
            await api
                .get(`/user/${wrongId}`)
                .expect(404);
        });
        test.only('Exist user get to valid id succesful', async () => {
            let users = await User.find({});
            users = [...users].map(u => u.toJSON());
            const existUser = users[0];

            const response = await api
                .get(`/user/${existUser.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(response.body).toEqual(existUser);

            // const foundUser = response.body;
            // expect(foundUser).toEqual(existUser);
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});