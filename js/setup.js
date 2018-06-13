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
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onSetupClose();
  }
};
var onSetupOpen = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  setupCloseButton.addEventListener('keydown', onSetupEscPress);
};
var onSetupClose = function () {
  setup.classList.add('hidden');
};
var getNextElement = function (array, element) {
  var currentElement = array.indexOf(element) === -1 ? array[0] : array[array.indexOf(element) + 1];

  if (currentElement === array[array.length - 1]) {
    currentElement = array[0];
  }

  return currentElement;
};
var alternatelyChangeFillColorOfWizardParameterWhenPressed = function (wizardParameter, arrayWithColors, input) {
  wizardParameter.addEventListener('click', function (evt) {
    if (evt.target === wizardParameter) {
      var pastColor = wizardParameter.style.fill;
      var newColor = getNextElement(arrayWithColors, pastColor);

      wizardParameter.style.fill = newColor;
      input.value = newColor;
    }
  });
};
var alternatelyChangeBackgroundColorOfWizardParameterWhenPressed = function (wizardParameter, arrayWithColors, input) {
  wizardParameter.addEventListener('click', function (evt) {
    if (evt.currentTarget === wizardParameter) {
      var pastColor = input.value;
      var newColor = getNextElement(arrayWithColors, pastColor);

      wizardParameter.style.backgroundColor = newColor;
      input.value = newColor;
    }
  });
};

var mockOfWizards = generateWizards(NUMBER_OF_WIZARDS);
var setupSimilarWizard = document.querySelector('.setup-similar');
var setup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var inputOfwizardCoat = document.querySelector('input[name="coat-color"]');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var inputOfwizardEyes = document.querySelector('input[name="eyes-color"]');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var inputOfFireballWrap = document.querySelector('input[name="fireball-color"]');

pasteWizards(mockOfWizards);
setupSimilarWizard.classList.remove('hidden');
setupOpenButton.addEventListener('click', onSetupOpen);
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupOpen();
  }
});
setupCloseButton.addEventListener('click', onSetupClose);
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupClose();
  }
});
alternatelyChangeFillColorOfWizardParameterWhenPressed(wizardCoat, COAT_COLORS, inputOfwizardCoat);
alternatelyChangeFillColorOfWizardParameterWhenPressed(wizardEyes, EYES_COLORS, inputOfwizardEyes);
alternatelyChangeBackgroundColorOfWizardParameterWhenPressed(setupFireballWrap, FIREBALL_COLORS, inputOfFireballWrap);
