const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');

const listHelper = require('../utils/list_helper');
const blogs = require('../utils/blogs_for_test');

//APP & models
const app = require('../app');
const Blog = require('../models/blog');

//super Wraper
const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	console.log('Cleared DB');
	console.log('----------');
	for (let blog of blogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe('Dummy', () => {
	test('dummy returns one', () => {
		const blogs = [];
		const result = listHelper.dummy(blogs);

		assert.strictEqual(result, 1);
	});
});

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
			__v: 0,
		},
	];

	test('of empty list is zero', () => {
		const result = listHelper.totalLikes([]);
		assert.strictEqual(result, 0);
	});

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		assert.strictEqual(result, 5);
	});

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(blogs);
		assert.strictEqual(result, 36);
	});
});

describe('FavoriteBlog', () => {
	test('find most liked blog', () => {
		const obj = {
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0,
		};

		const result = listHelper.favoriteBlog(blogs);
		assert.deepStrictEqual(result, obj);
	});
});

describe('MostBlogs', () => {
	test('find author with most blogs', () => {
		const result = listHelper.mostBlogs(blogs);
		const exemp = {
			author: 'Robert C. Martin',
			blogs: 3,
		};

		assert.deepStrictEqual(result, exemp);
	});
});

describe('MostLikes', () => {
	test('find the author most liked', () => {
		const exemp = {
			author: 'Edsger W. Dijkstra',
			likes: 17,
		};
		const result = listHelper.mostLikes(blogs);

		assert.deepStrictEqual(result, exemp);
	});
});

//4.8

test.only('HTTP GET funciona correctamente', async () => {
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body.length, blogs.length);
});

//4.9
test.only('ver si existe la propiedad id', async () => {
	const response = await api.get('/api/blogs');
	const blogViewed = response.body[0];
	const blogHasId = blogViewed.hasOwnProperty('id');

	assert.strictEqual(blogHasId, true);
});

//4.10

test.only('POST create new blog', async () => {
	const blogsAtStart = await Blog.find({});

	const newBlog = {
		title: 'Fullstack open 2024',
		author: 'Rodrigo Fernandez',
		url: 'https://fullstackopen.com/',
		likes: 2,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await Blog.find({});

	assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length);
});

//4.11*
test.only('Si no existe Likes, siempre debe ser 0?', async () => {

	const newBlog = {
		title: 'Fullstack open 2025',
		author: 'Rodrigo Fernandez',
		url: 'https://fullstackopen.com/',
	};

	
	const createNewBlog = await api
	.post('/api/blogs')
	.send(newBlog);
	
	const blogViewed = createNewBlog.body;
	const hasLikes = blogViewed.likes
	

	assert.strictEqual(hasLikes, 0);
	

	
});


//4.12*

test.only('Si no hay title o URL, devuelve 400', async () => {
	const newBlog = {
		author: 'Rodrigo Fernandez',
		likes: 2,
	}

	const createNewBlog = await api
	.post('/api/blogs')
	.send(newBlog)
	.expect(400);
})

after(async () => {
	await mongoose.connection.close();
});
