// FreeCodeCamp D3 Visualize Project
// Author: Péter Tamás Papp



// Functions for SVG and Chart
function drawSvg(dataset) {
// Variables for SVG and Bar Chart
  var width = 800;
  var height = 500;
  var barWidth = 800/275;
  var padding = 60;

  var yearsDate = dataset.map(function(data) {
    return new Date(data[0]);
  })
  var years = dataset.map(item => item[0].substring(0, 4))

  var xMax = new Date(d3.max(yearsDate));

  var xScale = d3.scaleTime()
  .domain([d3.min(yearsDate), xMax])
  .range([padding, width-padding])

  var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([height, padding])


  var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height + padding)

  var tooltip = d3.select("#chart")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)

  var overlay = d3.select("#chart")
  .append("div")
  .attr('class', 'overlay')
  .style('opacity', 0);

  svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("data-date", (d, i) => dataset[i][0])
  .attr("data-gdp", (d, i) => dataset[i][1])
  .attr("x", (d, i) => xScale(yearsDate[i]))
  .attr("y",  (d) => yScale(d[1])) 
  .attr("width", barWidth)
  .attr("height", (d) => height - yScale(d[1]))
  .attr("fill", "teal")
  .on("mouseover", function(d, i) {
    tooltip.transition()
    .style("opacity", .8)
    tooltip.html(years[i] + "<br>" + "<br>" +"$" + dataset[i][1] + " Billion Dollars")
    .attr("data-date", dataset[i][0])
    .style("left", width/2 + 300 + "px")
    .style("top", height+ "px")
    .style("transform", "translateX(" + padding + ")");
  })
  .on('mouseout', function(d) {
    tooltip.transition()
      .duration(200)
      .style('opacity', 0);
    overlay.transition()
      .duration(200)
      .style('opacity', 0);
  });

  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)
  
  svg.append("g")
  .call(xAxis)
  .attr("id", "x-axis")
  .attr("transform", "translate(0," + height +")")

  svg.append("g")
  .call(yAxis)
  .attr("id", "y-axis")
  .attr("transform", "translate(" + padding + ",0)")

}

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function (error, data) {
    let dataset = data.data;
    drawSvg(dataset);
    console.log(data)
  }
);
