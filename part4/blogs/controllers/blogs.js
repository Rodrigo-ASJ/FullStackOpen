const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/*
const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
}
	*/


blogsRouter.get('/', async (req, res, next) => {
	try {
		const result = await Blog.find({})
			.populate('user', { username: 1, name: 1});
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

	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	if(!decodedToken.id){
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	
	const user = await User.findById(decodedToken.id);

	if(!user)return res.status(400).json({ error: 'invalid user'})

	const blog = new Blog({
		title: body.title,
		url: body.url,
		author: body.author || '',
		likes: body.likes || 0,
		user: user.id,
	});

	try {
		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save();
		res.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	if (!id) return res.status(400).end();

	try {

		const decodedToken = jwt.verify(req.token, process.env.SECRET);
		
		if(!decodedToken.id){
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const blog =  await Blog.findById(id);

		if(!blog) return  res.status(404).json({ error: 'blog not found' });
		
		if(blog.user.toString() !== decodedToken.id.toString()){
			return res.status(401).json({ error: 'only the creator can delete a blog' });
		}



		await Blog.findByIdAndDelete(id);
		res.status(204).json({success: "Blog deleted successfully"}).end();
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
