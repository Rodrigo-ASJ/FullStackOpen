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
    // lodash
    const authorCounts = _(blogs)
    .groupBy('author')
    .map( (blog, author) => {
        return { author, blogs: blog.length}
    }).value()
    

    const reducer = ( prev, curr ) => {
        return prev.blogs > curr.blogs ? prev : curr
    }

    const result = authorCounts.reduce( reducer, { author: null, blogs: 0});
   
    return result
}


const mostLikes = ( blogs )=> {
    const authorBlogs = _(blogs)
    .groupBy('author')
    .map((bloglist, author)=>{
        const totalLikes = bloglist.reduce((sum, blog) =>{
            return sum + blog.likes
        }, 0)
        return { author, likes: totalLikes}
    }).value()

    const reducer = ( prev, curr ) => {
        return prev.likes > curr.likes ? prev : curr
    }
    return authorBlogs.reduce(reducer, { author: null, likes: 0 })
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}