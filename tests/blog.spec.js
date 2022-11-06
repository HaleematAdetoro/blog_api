const request = require('supertest')
const { connect } = require('./database')
const app = require('../index')
const BlogModel = require('../models/blogModel')
const UserModel = require('../models/userModel')
const { ObjectId } = require('bson')


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
            title: 'My first day',
            description: 'Describing the activities of a day',
            author: ObjectId(),
            body: 'it has been a wonderful day',
       
            
        })

        const response = await request(app)
        .get('/blogs?state=published')
        .set('content-type', 'application/json')
        .set('Authorization', token)
       
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body.blogs.every(blog => blog.state=== 'published')).toBe(true)
        expect(response.body).toHaveProperty('status', true)

    })

    it('Should return all user blogs', async () => {
        await BlogModel.create({
            title: 'My first day',
            description: 'Describing the activities of a day',
            author: ObjectId(),
            body: 'it has been a wonderful day',    
        })

        
        const response = await request(app)
        .get('/blogs?id=ObjectId()')
        .set('content-type', 'application/json')
        .set('Authorization', token)
       
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.blogs.every(author => ObjectId())).toBe(true)

    })

    it('Should get a published blog', async () => {
         await BlogModel.create({
            title: 'My first day',
            description: 'Describing the activities of a day',
            author: ObjectId(),
            body: 'it has been a wonderful day',    
        })

        
        const response = await request(app)
        .get('/blogs?id=ObjectId()')
        .set('content-type', 'application/json')
        .set('Authorization', token)
       
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.blogs.every(blog => ObjectId())).toBe(true)
    })

    it('should create a new blog', async () => {
        await BlogModel.create({
            title: 'My fourth day',
            description: 'Describing activities',
            author: ObjectId(),
            body: 'it has been a wonderful day'
        })

        await BlogModel.create({
            title: 'My third day',
            description: 'Describing activities',
            author: ObjectId(),
            body: 'it has been a wonderful day'
        })

        const response = await request(app)
            .post('/blog')
            .set('content-type', 'application/json')
            .set('Authorization', token)
    
       

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('author')
   
        // expect(response.body.data.state).toBe('draft')
    })
 })