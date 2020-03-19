const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 800;
const h = 500;
const padding = 50;

const svg = d3
  .select(".main")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

d3.json(dataUrl)
  .then(({ data }) => {
    const maxGDP = d3.max(data, d => d[1]);
    const barWidth = w / data.length;
    const gdp = data.map(d => d[1]);
    // const years = data.map(datum => Number(datum[0].split("-")[0]));
    // const years = data.map(datum => new Date(datum[0].split("-")[0]));
    // const minYear = d3.min(years, year => year);
    // const maxYear = d3.max(years, year => year);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxGDP])
      // .range([h - padding, padding]);
      .range([h, 0]);

    const xScale = d3
      .scaleTime()
      // .domain([minYear, maxYear])
      .domain(d3.extent(data, d => new Date(d[0])))
      // .range([padding, w]);
      .range([0, w]);

    // const bandScale = d3
    //   .scaleBand()
    //   .domain(gdp)
    //   .range([h, 0]);

    const yAxis = d3.axisLeft(yScale);
    // const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const xAxis = d3.axisBottom(xScale).scale(xScale);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      // .attr("x", (d, i) => i * 2 + padding)
      .attr("x", (d, i) => xScale(new Date(d[0])))
      .attr("y", (d, i) => yScale(d[1]))
      // .attr("y", (d, i) => bandScale(d[1]))
      // .attr("width", 2)
      // .attr("width", (d, i) => xScale(new Date(d[0])))
      .attr("width", barWidth)
      // .attr("height", (d, i) => h - yScale(d[1]) - padding)
      .attr("height", (d, i) => h - yScale(d[1]))
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
      // .attr("transform", `translate(${padding}, 0)`)
      .attr("transform", `translate(0, 0)`)
      .call(yAxis);

    svg
      .append("g")
      // .attr("transform", `translate(0, ${h - padding})`)
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);
  })
  .catch(err => console.error(err));
