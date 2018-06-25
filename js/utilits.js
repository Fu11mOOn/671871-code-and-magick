'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    }
  };
})();
