const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res, next) => {
	Blog.find({})
		.then((blog) => {
			if (!blog) res.status(404).end();

			res.status(200).json(blog);
		})
		.catch((error) => next(error));
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

blogsRouter.post('/', (req, res, next) => {
	const body = req.body;

	console.log(body);

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

	blog
		.save()
		.then((newBlog) => {
			res.status(201).json(newBlog);
		})
		.catch((error) => next(error));
});

blogsRouter.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	Blog.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

blogsRouter.put('/:id',( req, res, next )=>{
    const { id } = req.params;
    const body = req.body;

    const blog = {
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
    };
    Blog.findByIdAndUpdate(id, blog, {new: true})
    .then( updatedBlog => {
        res.json(updatedBlog);
    })
    .catch( error => next(error));
});

module.exports = blogsRouter
