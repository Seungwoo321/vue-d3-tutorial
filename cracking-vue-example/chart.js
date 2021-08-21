import * as d3 from "https://cdn.skypack.dev/d3@7";

const data = [90, 72, 75, 25, 10, 92];
const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
};
const width = 500;
const height = 300;

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(0, 0)`);

const x = d3.scaleLinear()
    .range([margin.left, width - margin.right])
    .domain(d3.extent(data, (d, i) => i));
const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0, 100]);

const line = d3.line()
    .x((d, i) => x(i))
    .y(d => y(d));

svg
    .append('path')
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#76BF8A")
    .attr("stroke-width", 3)
    .attr("d", line);

svg.append('g')
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(data.length).tickSizeOuter(0));

svg.append('g')
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));