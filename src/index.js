const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, right: 40, bottom: 70, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const parseDate = d3.isoParse;

const xScale = d3.scaleTime().rangeRound([0, width]);

const yScale = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom().scale(xScale);

const yAxis = d3.axisLeft().scale(yScale);

const svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json(dataUrl)
  .then(({ data }) => {
    data.forEach(d => {
      d[0] = parseDate(d[0]);
      d[1] = +d[1];
    });

    xScale.domain(d3.extent(data, d => d[0]));
    yScale.domain([0, d3.max(data, d => d[1])]);

    const barWidth = width / data.length;

    //--> X Axis
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis.ticks(null).tickSize(0));

    //--> Y Axis
    svg
      .append("g")
      .attr("id", "y-axis")
      .call(yAxis.ticks(null).tickSize(0));

    //--> Plot main data
    svg
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d[0]))
      .attr("width", barWidth)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => height - yScale(d[1]))
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .attr("class", "bar");
  })
  .catch(err => console.error(err));
