const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const reducer = ( sum, blog ) => {
        return sum + blog.likes
    } 

    const result = blogs.reduce( reducer, 0)

    return result
}

const favoriteBlog = (blog) => {
    const reducer = ( val, blog )=>{
        return val > blog.likes ? val : blog.likes
    }

    const maxLikes = blog.reduce( reducer, 0);

    const result = blog.find( blog => blog.likes === maxLikes);

    return result
}

const mostBlogs = (blogs) => {

    const authorCounts = _(blogs)
    .groupBy('author')
    .map( (blog, author) => {
        console.log( 'blog', blog);
        console.log( 'author', author);
        return { author, blogs: blog.length}
    })
    

    const reducer = ( prev, curr ) => {
        return prev.blogs > curr.blogs ? prev : curr
    }

    const result = authorCounts.reduce( reducer, { author: null, blogs: 0});
   
    return result
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}