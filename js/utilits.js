'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var errorClass = 'error-message';
  var lastTimeout;

  window.utilits = {
    getRandomIntegerFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getNextElement: function (array, element) {
      var currentElement = array.indexOf(element) === -1 ? array[0] : array[array.indexOf(element) + 1];

      if (currentElement === array[array.length - 1]) {
        currentElement = array[0];
      }

      return currentElement;
    },
    escPressed: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    enterPressed: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    addErrorText: function (errorText, element) {
      var lastElement = element.lastElementChild;

      if (!lastElement.classList.contains(errorClass)) {
        var text = document.createElement('p');

        text.textContent = errorText;
        text.classList.add(errorClass);
        element.appendChild(text);
      }
    },
    removeErrorText: function (element) {
      var lastElement = element.lastElementChild;

      if (lastElement.classList.contains(errorClass)) {
        lastElement.remove();
      }
    },
    removeAllChildElement: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    eliminateBounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
