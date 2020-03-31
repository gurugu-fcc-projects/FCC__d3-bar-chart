const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, right: 20, bottom: 50, left: 50 };
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
      d[1] = +d[1];
    });

    xScale.domain(d3.extent(data, d => parseDate(d[0])));
    yScale.domain([0, d3.max(data, d => d[1])]);

    const barWidth = width / data.length;

    //--> X Axis
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis.ticks(null).tickSize(10, 10, 0));

    //--> Y Axis
    svg
      .append("g")
      .attr("id", "y-axis")
      .call(yAxis.ticks(null).tickSize(10, 10, 0));

    //--> Add tooltip
    const tooltip = d3
      .select(".chart")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    //--> Add tooltip overlay
    const overlay = d3
      .select(".chart")
      .append("div")
      .attr("class", "overlay")
      .style("opacity", 0);

    //--> Plot main data
    svg
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(parseDate(d[0])))
      .attr("width", barWidth)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => height - yScale(d[1]))
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .attr("class", "bar")
      .on("mouseover", (d, idx) => {
        overlay
          .transition()
          .duration(0)
          .style("height", d + "px")
          .style("width", barWidth + "px")
          .style("opacity", 0.9)
          .style("left", idx * barWidth + 0 + "px")
          .style("top", height - d + "px")
          .style("transform", "translateX(60px)");
        tooltip
          .transition()
          .duration(200)
          .attr("data-date", data[idx][0])
          .style("opacity", 0.9)
          .style("left", idx * barWidth + 30 + "px")
          .style("top", height - 100 + "px")
          .style("transform", "translateX(60px)");
        tooltip.html(`<p>${parseDate(d[0])}</p>`);
      })
      .on("mouseout", d => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
        overlay
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    //--> Show tooltip
  })
  .catch(err => console.error(err));
