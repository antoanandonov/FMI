const Joi = require('joi');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(morgan('short'));
app.use(router);
app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.static('./BlogItem.js'))

const data = require("../resources/blogs.json");
const blogs = data.blogs;

function validateBlog(blog){
    const schema = {
        title: Joi.string().min(3).required(),
        author: Joi.optional(),
        content: Joi.optional(),
        tags: Joi.optional(),
        // tags: Joi.array().required(),
        url: Joi.optional(),
        state: Joi.string().equal('active','inactive'),
    };
    return  Joi.validate(blog, schema);
}

// GET
app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.get('/blogs', (req, res) =>{
    res.send(blogs);
});

app.get('/blogs/:id', (req, res) =>{
    const blog = blogs.find(p => p.id === parseInt(req.params.id));

    if(!blog) { return res.status(404).send('The blog with the given ID was not found!'); }
    res.send(blog);
});

// POST
app.post('/blogs', (req, res) =>{
    const { error } = validateBlog(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }

    const blog = {
        id: (blogs.length-1)+1,
        date: Date.now(),
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        tags: req.body.tags,
        url: req.body.url,
        state: req.body.state,
    };

    blogs.push(blog);
    res.status(201).send(blog);
});

// PUT
app.put('/blogs/:id', (req, res) => {
    const blog = blogs.find(p => p.id === parseInt(req.params.id));
    if(!blog) { return res.status(404).send('The blog with the given ID was not found!'); }
    const { error } = validateBlog(req.body);

    if(error) { return res.status(400).send(error.details[0].message); }

    blog.name = req.body.name;
    res.send(blog);

});

// DELETE
app.delete('/blogs/:id', (req, res) => {
    const blog = blogs.find(p => p.id === parseInt(req.params.id));
    if(!blog) { return res.status(404).send('The blog with the given ID was not found!'); }

    const index = blogs.indexOf(blog);
    blogs.splice(index, 1);

    res.send(blog);
});

// LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));