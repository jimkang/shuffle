import { select } from 'd3-selection';
import Strokerouter from 'strokerouter';

var cardListSel = select('#card-list');

export function renderDeck({ cards, addCard, onCardChanged }) {
  console.log('card count', cards.length);
  var cardsSel = cardListSel.selectAll('.card').data(cards);
  cardsSel.exit().remove();
  var newCardsSel = cardsSel
    .enter()
    .append('li')
    .classed('card', true)
    .attr('contenteditable', true)
    .on('blur', onCardBlur)
    .each(setUpKeys);

  var existingCardsSel = newCardsSel.merge(cardsSel);
  existingCardsSel.text((x) => x).attr('data-order', (d, i) => i);

  select('#add-card-button').on('click', addCard);

  function onCardBlur({ target }) {
    onCardChanged({ newText: target.textContent, order: target.dataset.order });
  }

  function setUpKeys() {
    var el = this;
    var strokerouter = Strokerouter(el);
    strokerouter.routeKeyUp('enter', ['ctrl'], () => el.blur());
  }
}
