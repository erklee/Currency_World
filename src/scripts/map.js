import * as d3 from 'd3';

export function drawMap(svg, data) {
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const projection = d3.geoMercator()
    .scale(115)
    .center([0, 40])
    .translate([width / 2, height / 2]);

  svg.append('g')
    .selectAll('path')
    .data(data.features)
    .enter().append('path')
    .attr('fill', '#69b3a2')
    .attr('d', d3.geoPath().projection(projection))
    .style('stroke', '#fff')
    
 
}
// /drawing general map