const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mysql = require('mysql');
// import axios from 'axios';
const axios = require('axios');

const data = require("../resources/blogs.json");
const internalServerErrorMessage = "The server encountered an unexpected condition which prevented it from fulfilling the request!";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'tonyMySQLp@$$',
    database: 'pets_blog'
})

function getConnection(){
    return pool;
}

loginValidation = (obj) => {
    const schema = {
        userNameOrEmail: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    }
    return  Joi.validate(obj, schema);
}

signinValidation = (obj) => {
    const schema = {
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        userName: Joi.string().min(3).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    }
    return  Joi.validate(obj, schema);
}

userValidation = (obj) => {
    const schema = {
        id: Joi.number().required(),
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        userName: Joi.string().min(3).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
        isAdmin: Joi.boolean().required()
    }
    return  Joi.validate(obj, schema);
}

postValidation = (obj) => {
    const schema = {
        title: Joi.string().min(5).required(),
        description: Joi.string().min(10).required(),
        userName: Joi.string().min(3).required()
    }
    return  Joi.validate(obj, schema);
}

router.post('/api/login', (req, res) =>{
    const { error } = loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }

    const query = "SELECT id, firstName, lastName, userName, email, isAdmin FROM users WHERE email = ? OR userName = ? AND password = ?";
    // const query = "SELECT id, firstName, lastName, email, isAdmin FROM users WHERE email = ? AND password = AES_ENCRYPT(?, 'secret')";
    const userNameOrEmail = req.body.userNameOrEmail;
    const password = req.body.password;
    
    try{
        getConnection().query(query, [userNameOrEmail, userNameOrEmail, password],  (err, rows) =>{
            if(err){ res.status(500).send(err.sqlMessage); return;}
            if(rows.length === 0){ res.sendStatus(401); return;}
            res.status(200).json(rows[0]);
        }); 
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/api/signin', (req, res) =>{
    const { error } = signinValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }

    // const query = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, AES_ENCRYPT(?, 'secret'))";
    const query = "INSERT INTO users (firstName, lastName, userName, email, password) VALUES (?, ?, ?, ?, ?)";
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        getConnection().query(query, [firstName, lastName, userName, email, password],  (err, rows) =>{
            if(err){  res.status(500).send(internalServerErrorMessage); return; }
            if(rows.length === 0) { res.sendStatus(401); return;}
            res.status(201).json({rows, message:"You are signed in!"});
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/api/pets', (req, res) =>{
    const query = "SELECT id, name, breed, description FROM pets";
    // const query = "SELECT id, firstName, lastName, userName, email, isAdmin, AES_DECRYPT(password, 'secret') AS ENCRYPTED FROM users";

    try{
        getConnection().query(query, (err, rows) =>{
            if(err) { res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/api/posts', (req, res) =>{
    const query = "SELECT * FROM posts";
    try{
        getConnection().query(query, (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/api/users', (req, res) =>{
    const query = "SELECT id, firstName, lastName, userName, email, isAdmin FROM users";
    // const query = "SELECT id, firstName, lastName, userName, email, isAdmin, AES_DECRYPT(password, 'secret') AS ENCRYPTED FROM users";

    try{
        getConnection().query(query, (err, rows) =>{
            if(err) { res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.put(`/api/:userName/edit`, (req, res) =>{
    const { error } = userValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }

    const query = "UPDATE users SET firstName = ?, lastName = ?, password = ? WHERE id = ?";
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
console.log(id)
    try{
        getConnection().query(query, [firstName, lastName, password, id], (err, rows) =>{
            if(err) { res.status(500).send(internalServerErrorMessage); return; }
            if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/api/:userName/pets', (req, res) =>{
    const query = "SELECT id, name, breed, description FROM pets WHERE userName = ?";
    // const query = "SELECT id, firstName, lastName, userName, email, isAdmin, AES_DECRYPT(password, 'secret') AS ENCRYPTED FROM users";

    try{
        getConnection().query(query, [req.params.userName], (err, rows) =>{
            if(err) { res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/api/profile/:userName/', (req, res) =>{
    const query = "SELECT id, firstName, lastName, userName, email, isAdmin FROM users WHERE userName = ?";
    
    try{
        getConnection().query(query, [req.params.userName], (err, rows) =>{
            if(err) { res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.put('/api/pets/:petId/', (req, res) =>{
    const query = "UPDATE pets SET name = ?, breed = ?, description = ? WHERE id = ?";
    const petId = req.params.petId;
    const name = req.body.name;
    const breed = req.body.breed;
    const description = req.body.description;
    try{
        getConnection().query(query, [name, breed, description, petId], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.put('/api/posts/:postId/', (req, res) =>{
    const query = "UPDATE posts SET title = ?, description = ? WHERE id = ?";
    const postId = req.params.postId;
    const title = req.body.title;
    const description = req.body.description;
    try{
        getConnection().query(query, [title, description, postId], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.delete('/api/posts/:postId', (req, res) =>{
    const query = "DELETE FROM posts WHERE id = ?";
    const postId = req.params.petId;
    console.log(petId)
    try{
        getConnection().query(query, [postId], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.delete('/api/pets/:petId', (req, res) =>{
    const query = "DELETE FROM pets WHERE id = ?";
    const petId = req.params.petId;
    console.log(petId)
    try{
        getConnection().query(query, [petId], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/api/pets/add', (req, res) =>{
    const query = "INSERT INTO pets (breed, description) VALUES (?, ?)";
    const breed = req.body.breed;
    const description = req.body.description;

    try{
        getConnection().query(query, [breed, description], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/api/posts/add', (req, res) =>{
    const { error } = postValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }

    const query = "INSERT INTO posts (title, description, userNameFK) VALUES (?, ?, ?)";
    const title = req.body.title;
    const description = req.body.description;
    const userName = req.body.userName;

    try{
        getConnection().query(query, [title, description, userName], (err, rows) =>{
            if(err) { console.log(err); res.status(500).send(internalServerErrorMessage); return; }
            // if(rows.length === 0) { res.status(204).send("Empty"); return; }
            console.log(rows);
            res.status(200).json(rows);
        });
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;