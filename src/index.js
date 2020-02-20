const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl)
  .then(({ data }) => {
    console.log(data);
    d3.select("#main")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      // .text(d => `${d[0]} --- ${d[1]}`)
      // .style("font-family", "vardana")
      // .style("color", d => {
      //   const year = d[0].split("-")[0];

      //   return year > 1960 ? "mediumspringgreen" : "azure";
      // })
      // .attr("class", d => (d[1] > 1000 ? "high" : ""));
      .attr("class", "bar")
      .style("height", d => `${d[1]}px`);
  })
  .catch(err => console.error(err));
