const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, right: 20, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const parseDate = d3.isoParse;

const xScale = d3.scaleTime().rangeRound([0, width]);
// const xScale = d3.scaleTime().range([0, width]);
//--> I see no difference between rangeRound() and range()
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

//--> Y axis label
svg
  .append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -130)
  .attr("y", 30)
  .text("GDP (in millions)");

//--> X axis label
svg
  .append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2 - 20)
  .attr("y", height + 50)
  .text("Year");

//--> Horizontal grid
// svg
//   .append("g")
//   .attr("class", "h-grid")
//   .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""));

//--> Add tooltip
const tooltip = d3
  .select(".chart")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)
  .style("left", `${width / 2}px`)
  .style("top", `${height / 2}px`);

d3.json(dataUrl)
  .then(({ data }) => {
    data.forEach(d => {
      d[1] = +d[1];
    });

    xScale.domain(d3.extent(data, d => parseDate(d[0])));
    yScale.domain([0, d3.max(data, d => d[1])]);

    const barWidth = width / data.length;

    //--> X Axis
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis.ticks(null).tickSize(10, 10, 0));
    // .call(xAxis.ticks(d3.timeYear.every(5)).tickSize(10, 10, 0));
    /* 
    interesting that both ticks(null) and ticks(d3.timeYear.every(5)) give the same result 
    */

    //--> Y Axis
    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("class", "axis")
      .call(yAxis.ticks(null).tickSize(10, 10, 0));

    //--> Plot main data
    svg
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(parseDate(d[0])))
      .attr("width", barWidth + 1)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => height - yScale(d[1]))
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .attr("class", "bar")
      .on("mouseover", (d, idx) => {
        tooltip
          .attr("data-date", data[idx][0])
          .style("opacity", 0.9)
          .style("left", `${idx * barWidth}px`)
          .style("top", `${height - 130}px`)
          .style("transform", "translateX(90px)")
          .html(`<div>${d[0]}</div><div>$${d[1]} billions</div>`);
      })
      .on("mouseout", d => {
        tooltip.style("opacity", 0);
      });
  })
  .catch(err => console.error(err));
