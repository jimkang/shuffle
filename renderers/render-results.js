import { select } from 'd3-selection';

var shuffleButtonSel = select('#shuffle-deck-button');
var drawButtonSel = select('#draw-button');
var drawsListSel = select('#draws-list');

export function renderResults({ runShuffle, drawNext, draws }) {
  shuffleButtonSel.on('click', runShuffle);
  drawButtonSel.on('click', drawNext);

  var drawsSel = drawsListSel.selectAll('.draw').data(draws.reverse());
  drawsSel.exit().remove();
  var newDrawsSel = drawsSel.enter().append('li').classed('draw', true);
  newDrawsSel.merge(drawsSel).text((x) => x);
}
