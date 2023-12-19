import * as d3 from 'd3';

export function createTooltip() {
  return d3.select('#top-middle').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
}

export function showTooltip(tooltip, event, content) {
  tooltip.transition()
    .duration(200)
    .style('opacity', 0.9);

  tooltip.html(content)
    .style('left', (event.pageX) + 'px')
    .style('top', (event.pageY - 28) + 'px');
}

export function hideTooltip(tooltip) {
  tooltip.transition()
    .duration(500)
    .style('opacity', 0);
}