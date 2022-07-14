const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/login', express.static(path.join(__dirname, '/login')));

app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login/login.html'));
    require('/login/login.js')
});

app.listen(3000)