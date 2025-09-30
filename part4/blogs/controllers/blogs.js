const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res, next) => {
	try {
		const result = await Blog.find({});
		if (!result) res.status(404).end();
		res.json(result);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.get('/:id', (req, res, next) => {
	const { id } = req.params;

	Blog.findById(id)
		.then((blog) => {
			if (!blog) res.status(404).end();

			res.status(200).json(blog);
		})
		.catch((error) => next(error));
});

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body;

	if (!body.title || !body.url) {
		return res.status(400).json({
			error: 'title or url missing',
		});
	}

	const blog = new Blog({
		title: body.title,
		url: body.url,
		author: body.author || '',
		likes: body.likes || 0,
	});

	try {
		const savedBlog = await blog.save();
		res.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	if (!id) return res.status(400).end();

	try {
		await Blog.findByIdAndDelete(id);
		res.status(204).end();
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	const blog = {
		title: body.title,
		url: body.url,
		author: body.author,
		likes: body.likes,
	};
	
	try{
	const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})

		res.json(updatedBlog);


	}catch(exception){
		next(exception)
	}


});

module.exports = blogsRouter;
