'use strict';

(function () {
  var NAMES_OF_WIZARDS = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SURNAMES_OF_WIZARDS = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  window.generateWizards = function (numberOfWizards) {
    var wizards = [];

    for (var i = 0; i < numberOfWizards; i++) {
      wizards[i] = {
        name: NAMES_OF_WIZARDS[window.utilits.getRandomIntegerFromInterval(0, NAMES_OF_WIZARDS.length)] + ' ' + SURNAMES_OF_WIZARDS[window.utilits.getRandomIntegerFromInterval(0, SURNAMES_OF_WIZARDS.length)],
        coatColor: COAT_COLORS[window.utilits.getRandomIntegerFromInterval(0, COAT_COLORS.length)],
        eyesColor: EYES_COLORS[window.utilits.getRandomIntegerFromInterval(0, EYES_COLORS.length)]
      };
    }

    return wizards;
  };
})();
