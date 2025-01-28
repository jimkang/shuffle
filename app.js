import { URLStore } from '@jimkang/url-store';
import handleError from 'handle-error-web';
import { version } from './package.json';
import { renderDeck } from './renderers/render-deck';
import { renderResults } from './renderers/render-results';
import { shuffle } from 'probable';

var urlStore;
var draws = [];
var currentIndex = 0;

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
  renderResults({ runShuffle, drawNext, draws });

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
    cards = shuffle(cards);
  }

  function drawNext() {
    draws.push(cards[currentIndex]);
    renderResults({ runShuffle, drawNext, draws });

    currentIndex += 1;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
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
