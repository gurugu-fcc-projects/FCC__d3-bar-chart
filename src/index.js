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
      .attr("height", (d, i) => d[1] / 3);
    // .text(d => `${d[0]} --- ${d[1]}`)
    // .style("font-family", "vardana")
    // .style("color", d => {
    //   const year = d[0].split("-")[0];

    //   return year > 1960 ? "mediumspringgreen" : "azure";
    // })
    // .attr("class", d => (d[1] > 1000 ? "high" : ""));
    // .attr("class", "bar")
    // .style("height", d => `${d[1] * 5}px`);
  })
  .catch(err => console.error(err));
