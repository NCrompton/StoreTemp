var express = require("express")
var path = require("path")
require('dotenv').config();
var plotd = require('nodeplotlib')
var plot = require('./src/plotg.js')

var app = express()

const function1 = () => console.trace();

app.get('/', function(req, resp){
	resp.sendFile(testfun())
	console.log("running")
	//function1();
})
const plotdata = [
	{
		x: [1, 2, 3, 4],
		y: [2, 3, 4, 6],
		type: 'scatter',
	},
];

function testfun(){
	process.argv.forEach((val, index) => {
		console.log(`${index}: ${val}`)
	})
	var rate = [1,2,3,4]
	rate.forEach(num => {
		console.log(num)
	})
	plot.plotgraph(rate);
	var r1 = rate.map(s => s)
	console.log(r1);
	var r2 = rate.map(function (s) {return s})
	console.log(r2);
	return path.join(__dirname+process.env.FILE_NAME)
}
console.log("starting")

app.listen(3000)