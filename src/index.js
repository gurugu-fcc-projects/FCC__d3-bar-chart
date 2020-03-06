const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 630;
const h = 350;
const padding = 50;

const svg = d3
  .select("#main")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

d3.json(dataUrl)
  .then(({ data }) => {
    // console.log(data);

    const max = d3.max(data, d => d[1]);
    // const min = d3.min(data, d => d[1]);

    const yScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([h - padding, padding]);

    const yAxis = d3.axisLeft(yScale);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 2 + padding)
      .attr("y", (d, i) => yScale(d[1]))
      .attr("width", 2)
      .attr("height", (d, i) => h - yScale(d[1]) - padding)
      .attr("class", "bar")
      .attr("data-date", (d, i) => d[0])
      .attr("data-gdp", (d, i) => d[1])
      .append("title")
      .text(d => d[1]);

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 2)
      .attr("y", (d, i) => h - 20 - yScale(d[1]))
      .attr("class", "bar-text")
      .text(d => d[0]);

    svg
      .append("g")
      .attr("transform", `translate(${padding - 5}, 0)`)
      .call(yAxis);
  })
  .catch(err => console.error(err));
