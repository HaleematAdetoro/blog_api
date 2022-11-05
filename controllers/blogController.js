
const BlogModel = require('../models/blogModel');

const getAllUsersBlogs = async (req, res) => {
    const blogs = await BlogModel
    .select({ title: 1})
    .find({ state: 'published' })
    .populate('author', { username: 1 })

    return res.json({ status: true, data: blogs })
};

const getAllPublishedBlogs = async (req, res) => {
    const { query } =req;

    const {
        author,
        title,
        tags,
        order = 'asc',
        order_by = 'read_time',
        page = 1,
        per_page = 20
    } = query;

    const findQuery ={};

    if (author) {
        findQuery.author = author;
    }

    if (title) {
        findQuery.title = title;
    }

    if (tags) {
        findQuery.tags = tags;
    }
    
    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (attributes of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }

    const blogs = await BlogModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    return res.status(200).json({ status: true, blogs})

}

const getPublishedBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await BlogModel.findById(id)
        .populate('author', { username: 1 })

    if (!blog) {
        return res.status(404).json({ status: false, blog: null })
    }

    if (blog.state !== 'published') {
        return res.status(404).json({ status: false, blog: null })
    }

    blog.read_count += 1
    await blog.save()

    return res.json({ status: true, blog })
}

const createNewBlog = async (req, res) => {
    try {
        const { title, description, tags, body } = req.body;
        const readingTime = (blog) => {
            const noOfWords = blog.split(' ').length
            const wordsPerMinute = noOfWords/200
            return Math.round(wordsPerMinute) === 0?1: Math.round(math.round(wordsPerMinute))
        }
    
        const blog = await BlogModel.create({
            title,
            description,
            author: req.user._id,
            reading_time: readingTime(body),
            tags,
            body
        })
    
        const createdblog = await blog.save()
        
        return res.status(201).json({
            status: true,
            data: createdblog,
        })
    } catch (error) {
        console.log(error)
        return (error)
    }
    
};

const updateOneBlog = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const blog = await BlogModel.findById(id)

    if (!blog) {
        return res.status(404).json({ status: false, blog: null })
    }

    if (state === blog.state) {
        return res.status(422).json({ status: false, blog: null, message: 'Invalid operation' })
    }

    blog.state = state;

    await blog.save()

    return res.json({ status: true, blog })
};

const updateBlog = async (req, res) => {

}

const deleteOneBlog = async (req, res) => {
    const { id } = req.params;

    const blog = await BlogModel.deleteOne({ _id: id})

    return res.json({ status: true, blog })
}

module.exports = {
    getAllUsersBlogs,
    getAllPublishedBlogs,
    getPublishedBlog,
    createNewBlog,
    updateOneBlog,
    deleteOneBlog
}


