const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

/**const connection = mysql.createConnection({
	host     : 'wt9.cs.cityu.edu.hk:1433',
	user     : 'pms',
	password : 'pms1234',
	database : 'pms2'
});**/

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, '/css')));

const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SITE,
    options: {
        trustServerCertificate: true,
    },
  }

/** async function startsql(id, pw) {
    
        try{
            await sql.connect(sqlConfig);
            const result = await sql.query(`select * from Choice where SelectionID = ${id}`);
            console.log(`result is ${result}`);
            console.dir(result);   
            if(result['recordset'][0]['StudentID'] == pw){
                console.log(`${result['recordset'][0]['StudentID']} and ${id} the things match`);
            }else{
                console.log(`${result['recordset'][0]['StudentID']} and ${id} are not match`);
            }   
            console.log(`ttttttt${result}`)
            return new Promise(resolve => {
                resolve(result);
                console.log("sql query is finished");
            })
        }catch(err){
            console.log(`the error is ${err}`);
        }
    
    //return Promise(sqlbeg);
}**/
async function startsql(id, pw) {
    
        try{
            await sql.connect(sqlConfig);
            const result = await sql.query(`select * from Course where course_id = ${id}`);
            console.log(`result is ${result}`);
            console.dir(result);   
            if(result['recordset'][0]['code'] == pw){
                console.log(`${result['recordset'][0]['code']} and ${id} the things match`);
            }else{
                console.log(`${result['recordset'][0]['code']} and ${id} are not match`);
            }   
            console.log(`ttttttt${result}`)
            return new Promise(resolve => {
                resolve(result);
                console.log("sql query is finished");
            })
        }catch(err){
            console.log(`the error is ${err}`);
        }
    
    //return Promise(sqlbeg);
}

async function startsql2(id, pw) {
    
        try{
            await sql.connect(sqlConfig);
            return result = await sql.query(`select * from Choice where SelectionID = ${id}`);
        }catch(err){
            console.log(`the error is ${err}`);
        }
    
    //return Promise(sqlbeg);
}
/**
function startsql(id, pw) {
    return new Promise(resolve => {
         try{
            sql.connect(sqlConfig);
            const result = sql.query(`select * from Choice where SelectionID = ${id}`);
            console.log(`result is ${result}`);
            console.dir(result);   
            if(result['recordset'][0]['StudentID'] == pw){
                console.log(`${result['recordset'][0]['StudentID']} and ${id} the things match`);
            }else{
                console.log(`${result['recordset'][0]['StudentID']} and ${id} are not match`);
            }   
            
            resolve(result);
            console.log("sql query is finished");
            
        }catch(err){
            console.log(`the error is ${err}`);
        }
    }) 
}**/


console.log("(THEN) now start running the then function");
sql.connect(sqlConfig).then(function(){
    (sql.query`select * from Course where course_id = 15`).then((result2) => {
        console.log(`this next result is ${result2}`);
        console.dir(result2);
        //console.log(result2['recordset'][1]['StudentID']);
    })
    
})


/**console.log("(ASYNC) now start running the asyn function");
startsql();
console.log("FINISHED");**/

/**var OAuth = require('@zalando/oauth2-client-js');
var github = new OAuth.Provider({
    id: 'github',
    authorization_url: 'https://github.com/login/oauth/authorize',
}) ;
var orequest = new OAuth.Request({
    client_id: '3e7fbe406edf15844520',
    redirect_uri: '/index'
});

app.post('/oauth', function(request, response) {
    var uri = github.requestToken(request);
    github.remember(orequest);
    //window.location.href = uri;
    //var response = github.parse(window.location.hash);
})**/

app.get('/nauth', function(req, res) {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,)
})

const axios = require('axios')
const https = require('https')
app.get('/oauth', ({ query: {code} }, res) => {
    tokens = "";
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
    };
    const opts = {headers: {accept: 'application/json'}};
    axios.post('https://github.com/login/oauth/access_token', body, opts).then((res) => {
        if(res.data.hasOwnProperty('access_token')){
            //console.dir(res)
            return res.data.access_token
        }else{
            return console.dir(res)
        }
        })
     .then((token) => {
        const config = {
            headers: {
                Authorization: 'token ' + token,
            }
        }
        console.log(`------------------------------------------${token}`);
        axios.get('https://api.github.com/user', config).then((res) => {
            console.dir(res)
        }).catch((error) => {console.log(error)});
    });
   
})

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
        (async() => {
            const result = await startsql2(username, password);
            console.log(`____result____12${result}`);
            if(result == password){
                console.log(`welcome in ${password}`);
            }
        })()
        startsql(username, password).then(result => {
            console.log(`____result____34${result}`);
            console.dir(result)
            if(result['recordset'][0]['code'] == password){
                console.log(`welcome in ${password}`);
            }else{
                console.log(`you are not ${username}`)
            }
        })
        
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(3000);