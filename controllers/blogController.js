
const BlogModel = require('../models/blogModel');


const getAllUserBlogs = async (req, res) => {
    try {
        const  currentUserId  = req.user._id;
        
        const blog = await BlogModel.find({ author: currentUserId})
            .sort({ state: 'published' })
        
        
        return res.json({ status: true, data: blog })
    } catch (error) {
        return(error)
    }
   
};

const getAllPublishedBlogs = async (req, res) => {
    try {
        const { query } =req;

        const {
            author,
            title,
            tags,
            order = 'asc',
            order_by = 'read_time',
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
    
        for (attribute of sortAttributes) {
            if (order === 'asc' && order_by) {
                sortQuery[attribute] = 1
            }
        
            if (order === 'desc' && order_by) {
                sortQuery[attribute] = -1
            }
        }
    
        const blogs = await BlogModel
        .find({ state: 'published'})
        .find(findQuery)
        .sort(sortQuery)
        .limit(per_page)
    
        return res.status(200).json({ status: true, blogs})

    } catch (error) {
        return(error)
    }

}

const getPublishedBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await BlogModel.findById(blogId)
            .populate('author', {username: 1})

        if (!blog) {
            return res.status(404).json({ status: false, blog: null })
        }

        if (blog.state !== 'published') {
            return res.status(404).json({ status: false, blog: null })
        }
    
        blog.read_count += 1
        await blog.save()

        return res.json({ status: true, blog })
    } catch (error) {
        return(error)
    }
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
        return (error)
    }
    
};

const updateBlogState = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { state } = req.body;

        const blog = await BlogModel.findById(blogId)

        if (!blog) {
            return res.status(404).json({ status: false, blog: null })
        }

        if (!blog.author.equals(req.user.id)) {
            return res.status(403).json({
                status: false,
                message: "You can't edit blog"
        })
        }

        if (state === blog.state) {
            return res.status(422).json({ status: false, blog: null, message: 'Invalid operation' })
        }

        blog.state = state;

        await blog.save()

        return res.json({ status: true, blog })
    } catch (error) {
        return(error)
    }
};

const updateBlog = async (req, res) => {
    try{
        const  blogId   = req.params.blogId
        const { title, description, body, tags } = req.body

        const blog = await BlogModel.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({ status: false, blog: null })
        }
        if (!blog.author.equals(req.user._id)) {
            return res.status(403).json({
                status: false,
                message: "You can't edit blog"
            })
        }

        blog.title = title || blog.title,
        blog.description = description || blog.description;
        blog.body = body || blog.body;
        blog.tags = tags || blog.tags;
        
        await blog.save();
        res.status(200).json({ status: true, blog })
        
    } catch (error) {
        return(error);
    }
}

const deleteOneBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await BlogModel.findById(blogId)

        if (!blog.author.equals(req.user.id)) {
            return res.status(403).json({
            status: false,
            message: "You can't delete blog"
            })
        }

        await BlogModel.deleteOne({ _id: blogId})

        return res.json({ status: true,
            message: "Blog delete succesfully"})
    } catch (error) {
        return(error)
    }
}

module.exports = {
    getAllUserBlogs,
    getAllPublishedBlogs,
    getPublishedBlog,
    createNewBlog,
    updateBlogState,
    updateBlog,
    deleteOneBlog
}


