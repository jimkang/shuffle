import { URLStore } from '@jimkang/url-store';
import handleError from 'handle-error-web';
import { version } from './package.json';
import { renderDeck } from './renderers/render-deck';

var urlStore;

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  urlStore = URLStore({
    onUpdate,
    windowObject: window,
    defaults: {
      cards: [],
    },
  });
  urlStore.update();
})();

function onUpdate({ cards }) {
  renderDeck({ cards, addCard, onCardChanged });

  function addCard() {
    cards.push('Edit this');
    urlStore.update({ cards });
  }

  function onCardChanged({ newText, order }) {
    cards[order] = newText;
    urlStore.update({ cards });
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
