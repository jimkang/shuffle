import { select } from 'd3-selection';

var shuffleButtonSel = select('#shuffle-deck-button');
var drawButtonSel = select('#draw-button');
var drawsListSel = select('#draws-list');
var cardsLeftTextSel = select('#cards-left-text');

export function renderResults({ runShuffle, drawNext, draws, cardsToDraw }) {
  shuffleButtonSel.on('click', runShuffle);
  drawButtonSel.on('click', drawNext);

  var drawsSel = drawsListSel.selectAll('.draw').data(draws);
  drawsSel.exit().remove();
  var newDrawsSel = drawsSel.enter().append('li').classed('draw', true);
  newDrawsSel.merge(drawsSel).text((x) => x);

  cardsLeftTextSel.text(cardsToDraw.length);
}
