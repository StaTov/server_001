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

beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUsers);
});

test('notes are returned as json', async () => {
    await api
        .get('/user')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all users are returned', async () => {
    const response = await api.get('/user');
    expect(response.body).toHaveLength(initialUsers.length);
});

afterAll(async () => {
    await mongoose.connection.close();
});