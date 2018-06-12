'use strict';

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
var NUMBER_OF_WIZARDS = 4;

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var generateWizards = function (numberOfWizards) {
  var wizards = [];

  for (var i = 0; i < numberOfWizards; i++) {
    wizards[i] = {
      name: NAMES_OF_WIZARDS[getRandomIntegerFromInterval(0, NAMES_OF_WIZARDS.length)] + ' ' + SURNAMES_OF_WIZARDS[getRandomIntegerFromInterval(0, SURNAMES_OF_WIZARDS.length)],
      coatColor: COAT_COLORS[getRandomIntegerFromInterval(0, COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomIntegerFromInterval(0, EYES_COLORS.length)]
    };
  }

  return wizards;
};
var renderWizard = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.cloneNode(true);

  wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardTemplate;
};
var pasteWizards = function (array) {
  var elementsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }

  elementsList.appendChild(fragment);
};

var setupWizard = document.querySelector('.setup');
var setupSimilarWizard = document.querySelector('.setup-similar');
var wizards = generateWizards(NUMBER_OF_WIZARDS);

setupWizard.classList.remove('hidden');
setupSimilarWizard.classList.remove('hidden');

pasteWizards(wizards);
