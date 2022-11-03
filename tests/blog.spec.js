const request = require('supertest')
const { connect } = require('./database')
const app = require('../index')
const BlogModel = require('../models/blogModel')
const UserModel = require('../models/userModel')
const { it } = require('node:test')

describe('Blog Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ first_name: 'titi', last_name: 'layo', email: 'titi@gmail.com', username: 'great', password: 'qwerty' })

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'titi@gmail.com', 
            password: 'qwerty'
        });
        
        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('Should return all published blogs', async () => {
        await BlogModel.create({
            
        })
    })
})