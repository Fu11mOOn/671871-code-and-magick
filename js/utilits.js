'use strict';

(function () {
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
    }
  };
})();
