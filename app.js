import { URLStore } from '@jimkang/url-store';
import handleError from 'handle-error-web';
import { version } from './package.json';
import { renderDeck } from './renderers/render-deck';
import { renderResults } from './renderers/render-results';
import { shuffle } from 'probable';

var urlStore;
var cardsToDraw = [];
var draws = [];

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  urlStore = URLStore({
    onUpdate,
    windowObject: window,
    defaults: {
      cards: [],
      deckName: '[Your deck name here]',
    },
  });
  urlStore.update();
})();

function onUpdate({ cards, deckName }) {
  renderDeck({ cards, deckName, addCard, onCardChanged, onDeckNameChanged });
  renderResults({ runShuffle, drawNext, draws, cardsToDraw });

  function addCard() {
    cards.push('Edit this');
    urlStore.update({ cards });
  }

  function onCardChanged({ newText, order }) {
    cards[order] = newText;
    urlStore.update({ cards });
  }

  function onDeckNameChanged({ newName }) {
    urlStore.update({ deckName: newName });
  }

  function runShuffle() {
    cardsToDraw = shuffle(cards);
    renderResults({ runShuffle, drawNext, draws, cardsToDraw });
  }

  function drawNext() {
    if (cardsToDraw.length > 0) {
      draws.push(cardsToDraw.pop());
      renderResults({ runShuffle, drawNext, draws, cardsToDraw });
    }
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
