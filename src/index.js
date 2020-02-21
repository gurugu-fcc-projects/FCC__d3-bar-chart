const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 600;
const h = 1000;

const svg = d3
  .select("#main")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

d3.json(dataUrl)
  .then(({ data }) => {
    console.log(data);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d, i) => h - d[1] / 3)
      .attr("width", 2)
      .attr("height", (d, i) => d[1] / 3)
      .attr("fill", "rgb(53, 53, 221)");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d, i) => h - 20 - d[1] / 3)
      .attr("fill", "white")
      .attr("font-size", 6)
      .text(d => d[0]);
  })
  .catch(err => console.error(err));
