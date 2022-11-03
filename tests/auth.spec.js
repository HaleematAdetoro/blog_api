const request = require('supertest');
const { connect } = require('./database');
const UserModel = require('../models/userModel');
const app = require('../index');

describe('auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        // const user = await UserModel.create({ first_name: 'titi', last_name: 'layo', email: 'titi@gmail.com', username: 'great', password: 'qwerty'})
        const response = await request(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send({
            first_name: 'titi',
            last_name: 'layo',
            email: 'titi@gmail.com',
            username: 'great',
            password: 'qwerty'
        })

        expect(response.status).toBe(201)
        // expect(response.body).toHaveProperty('user')
        expect(response.body.data).toHaveProperty('first_name', 'titi')
        expect(response.body.data).toHaveProperty('last_name', 'layo')
        expect(response.body.data).toHaveProperty('email', 'titi@gmail.com')
        expect(response.body.data).toHaveProperty('username', 'great')
    })

    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({ first_name: 'titi', last_name: 'layo', email: 'titi@gmail.com', username: 'great', password: 'qwerty'})
        // const user = await UserModel.find({ username: 'tobi@gmail.com', password: '123456'});

        // login user
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'titi@gmail.com', 
            password: 'qwerty'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})