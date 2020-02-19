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
      .text(d => `${d[0]} --- ${d[1]}`);
  })
  .catch(err => console.error(err));
