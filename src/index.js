const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 500;
const h = 400;

const svg = d3
  .select("#main")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

d3.json(dataUrl)
  .then(({ data }) => {
    // console.log(data);

    const max = d3.max(data, d => d[1]);
    const min = d3.min(data, d => d[1]);

    const yScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, h]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 1.5)
      .attr("y", (d, i) => h - yScale(d[1]))
      .attr("width", 1.5)
      .attr("height", (d, i) => yScale(d[1]))
      .attr("class", "bar")
      .append("title")
      .text(d => d[1]);

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d, i) => h - 20 - d[1] / 3)
      .attr("class", "bar-text")
      .text(d => d[0]);
  })
  .catch(err => console.error(err));
