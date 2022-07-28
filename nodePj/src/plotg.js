var plot = require('nodeplotlib');

const plotdata = [
	{
		x: [1, 2, 3, 4],
		y: [2, 3, 4, 6],
		type: 'scatter',
	},
];

module.exports = {
    
    plotgraph: function (plotdatai) {
        plot.plot(plotdatai);
        console.log("plotting the graph")
    }

};
