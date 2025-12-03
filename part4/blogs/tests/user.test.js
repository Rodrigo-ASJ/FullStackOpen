const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');

const bcrypt = require('bcrypt');
const { initializeUsers } = require('./test_helper');

const User = require('../models/user');
const app = require('../app');


const api = supertest(app);


describe('User tests', ()=>{
    beforeEach( async()=>{
        await User.deleteMany({});
        await initializeUsers();
    });

    test('obtener todos los usuarios', async()=>{

        const allUsers = await api.get('/api/users').expect(200);   
        assert.strictEqual(allUsers.body.length, 2);
    
    })

    test('obtener un usuario por id', async()=>{
        const usersAtStart = await User.find({});
        const userToGet = usersAtStart[0];

        const fetchedUser = await api.get(`/api/users/${userToGet.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(fetchedUser.body.username, userToGet.username);
    });

    test('crear un usuario valido', async()=>{
        const newUser = { 
            username: 'alice',
            name: 'Alice Wonderland',
            password: 'mypassword'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await User.find({});
        assert.strictEqual(usersAtEnd.length, 3);

    });

    test('crear un usuario con password corto falla', async()=>{    
        const newUser = { 
            username: 'bob',
            name: 'Bob Builder',
            password: 'ab'
        }
        
        const response =  await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.error, 'Password is required and must be at least 3 characters long');

        const usersAtEnd = await User.find({});
        assert.strictEqual(usersAtEnd.length, 2);
    });

    test('crear un usuario con un nombre de usuario corto falla', async()=>{    
        const newUser = { 
            username: 'ab',
            name: 'Short Username',
            password: 'validpassword'
        }
        
        const response =  await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.error.includes('is shorter than the minimum allowed length'), true);

        const usersAtEnd = await User.find({});
        assert.strictEqual(usersAtEnd.length, 2);
    });



})

after( async ()=> {
    await mongoose.connection.close();
})