const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, right: 40, bottom: 70, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const parseDate = d3.isoParse;

const x = d3
  // .scaleBand()
  // .rangeRound([0, width], 0.05)
  .scaleTime()
  .rangeRound([0, width]);
// .padding(0.1);

const y = d3.scaleLinear().range([height, 0]);

const xAxis = d3
  .axisBottom()
  .scale(x)
  // .tickFormat(d3.timeFormat("%b"));
  .tickFormat(d3.timeFormat("%Y"));

const yAxis = d3
  .axisLeft()
  .scale(y)
  .ticks(10);

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

    // x.domain(data.map(d => d[0]));
    x.domain(d3.extent(data, d => d[0]));
    y.domain([0, d3.max(data, d => d[1])]);

    const barWidth = width / data.length;

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis.ticks(null).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "middle");
    // .attr("dx", "-.8em")
    // .attr("dy", "-.55em")
    // .attr("transform", "rotate(-90)");

    svg
      .append("g")
      .attr("id", "y-axis")
      .call(yAxis.ticks(null).tickSize(0));
    // .append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 6)
    // .attr("dy", ".71em")
    // .style("text-anchor", "middle")
    // .text("Value");

    svg
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d[0]))
      .attr("width", barWidth)
      .attr("y", d => y(d[1]))
      .attr("height", d => height - y(d[1]))
      .attr("class", "bar");

    // svg
    //   .selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => xScale(new Date(d[0])))
    //   .attr("y", (d, i) => yScale(d[1]))
    //   .attr("width", barWidth)
    //   .attr("height", (d, i) => height - yScale(d[1]))
    //   .attr("class", "bar")
    //   .attr("data-date", (d, i) => d[0])
    //   .attr("data-gdp", (d, i) => d[1])
    //   .append("title")
    //   .text(d => d[1]);

    // svg
    //   .selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("x", (d, i) => i * 2)
    //   .attr("y", (d, i) => height - 20 - yScale(d[1]))
    //   .attr("class", "bar-text")
    //   .text(d => d[0]);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(0, 0)`)
    //   .call(yAxis);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(0, ${height})`)
    //   .call(xAxis);
  })
  .catch(err => console.error(err));
