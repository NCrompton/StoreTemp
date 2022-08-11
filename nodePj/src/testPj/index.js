/**const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const axios = require('axios');
require('dotenv').config();
const { oauthlogin, oauthtoken } = require('./pages/login.js')**/
import express from "express";
import session from 'express-session'
import {oauthlogin, oauthtoken} from "./pages/login.js"
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
var app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(session({
    secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/css', express.static(path.join(__dirname, '/css')));



app.get('/', function(req, res) {
    return res.send("hello world");
})

app.get('/login', function(req, res) {
    return oauthlogin(req, res);
})

app.get('/myapp/', function(req, res) {
    return oauthtoken(req, res);
})
app.listen(3001);