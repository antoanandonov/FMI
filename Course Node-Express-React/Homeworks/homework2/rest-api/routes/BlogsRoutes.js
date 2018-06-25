const express = require('express');
const router = express.Router();
const Joi = require('joi');
// const mysql = require('mysql');

const data = require("../resources/blogs.json");
const blogs = data.blogs;
const internalServerErrorMessage = "The server encountered an unexpected condition which prevented it from fulfilling the request!";

function validateBlog(blog){
    const schema = {
        title: Joi.string().min(3).required(),
        author: Joi.optional(),
        content: Joi.optional(),
        tags: Joi.optional(),
        url: Joi.optional(),
        state: Joi.string().equal('active','inactive'),
    };
    return  Joi.validate(blog, schema);
}

// GET
router.get('/', (req, res) =>{
    try{
        res.send('Hello World!');
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

router.get('/api/blogs', (req, res) =>{
    try{
        if(blogs.length <= 0){ return res.status(404).send('Blogs not found!'); }
        res.status(200).send(blogs);
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

router.get('/api/blogs/:id', (req, res) =>{
    try{
        const blog = blogs.find(p => p.id === parseInt(req.params.id));
        if(!blog) { return res.status(404).send(`Blog with ID: ${req.params.id} was not found!`); }
        res.status(200).send(blog);
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

// POST
router.post('/api/blogs/add', (req, res) =>{
    try{
        const { error } = validateBlog(req.body);
        if(error) { return res.status(400).send(error.details[0].message); }

        const blog = {
            id: (blogs.length)+1,
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
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

// PUT
router.put('/api/blogs/:id', (req, res) => {
    try{
        const blog = blogs.find(p => p.id === parseInt(req.params.id));
        if(!blog) { return res.status(404).send(`Blog with ID: ${req.params.id} was not found!`); }
        const { error } = validateBlog(req.body);
        if(error) { return res.status(400).send(error.details[0].message); }

        // blog.name = req.body.name;
        blog.date = Date.now();
        blog.title = req.body.title; 
        blog.author = req.body.author;
        blog.content = req.body.content;
        blog.tags = req.body.tags;
        blog.url = req.body.url;
        blog.state = req.body.state;

        res.status(200).send(blog);
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

// PATCH
router.patch('/api/blogs/:id', (req, res) => {
    try{
        const blog = blogs.find(p => p.id === parseInt(req.params.id));
        if(!blog) { return res.status(404).send(`Blog with ID: ${req.params.id} was not found!`); }
        const { error } = validateBlog(req.body);

        if(error) { return res.status(400).send(error.details[0].message); }

        blog.date = Date.now();
        blog.title = req.body.title; 
        blog.author = req.body.author;
        blog.content = req.body.content;
        blog.tags = req.body.tags;
        blog.url = req.body.url;
        blog.state = req.body.state;

        res.status(200).send(blog);
    }catch(err){
        return res.status(500).send(internalServerErrorMessage);
    }
});

// DELETE
router.delete('/api/blogs/:id', (req, res) => {
    try{
        const blog = blogs.find(p => p.id === parseInt(req.params.id));
        if(!blog) { return res.status(404).send(`Blog with ID: ${req.params.id} was not found!`); }

        const index = blogs.indexOf(blog);
        blogs.splice(index, 1);

        res.status(200).send(blog);
    }catch(err){
        // return res.status(500).send(err.details[0].message);
        return res.status(500).send(internalServerErrorMessage);
    }
});

module.exports = router;