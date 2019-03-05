function DrawBar(dataset){
	var margin = {top:50, right:20, bottom:50, left:100}
	width = 800,
	height = 400

	var minDate = dataset[0][0].substr(0,4);
	minDate = new Date(minDate)
	var maxDate = dataset[dataset.length - 1][0].substr(0,4);
	maxDate = new Date(maxDate);

	var xAxisScale = d3.time.scale()
	.domain([minDate, maxDate])
	.range([0, width]);


	var yAxisScale = d3.time
	.linear()
	.domain([0, d3.max(dataset, function(d){
		return d[1];
	})
	])
	.range([height, 0]);

	var xAxis = d3.svg.axis().scale(xAxisScale).orient("bottom");
	var yAxis = d3.svg.axis().scale(yAxisScale).orient("left");


	var tooltip = d3.select('body').append('div').style({

		'position': 'absolute',
		'padding': '4px',
		'background': '#fff',
		'border': '1px solid #000',
		'color': '#000'

	});

	var svg = d3.select("#barGraph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("class", "graph-svg-component")
	.append("g")
	.attr("transform", "translate(" +margin.left + "," + margin.top + ")");



svg.select("bar").data(dataset).enter().append("rect")
.style("fill", "orangered")
.attr({
	x: function(d, i){return (i*(width/dataset.length));},
	y: function(d) {return yAxisScale(d[1]);},
	width:(width/dataset.length),
	height:(function(d){return height-yAxisScale(d[1]);})
})




}



d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data){
	var dataset = data.data;
	DrawBar(dataset);
});