import express from 'express'
const app = express();
import router from './route/routes.js'
import dotenv from 'dotenv';
dotenv.config();

//app.use(json.express());
app.use('/', router) 

app.listen(3001)