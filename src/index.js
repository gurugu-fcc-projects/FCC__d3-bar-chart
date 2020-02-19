const dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl)
  .then(data => console.log(data))
  .catch(err => console.error(err));
