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
var FILL_PROPERTY = 'fill';
var BACKGROUND_COLOR_PROPERTY = 'backgroundColor';

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var getNextElement = function (array, element) {
  var currentElement = array.indexOf(element) === -1 ? array[0] : array[array.indexOf(element) + 1];

  if (currentElement === array[array.length - 1]) {
    currentElement = array[0];
  }

  return currentElement;
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
var pasteWizards = function (array) {
  var elementsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.cloneNode(true);

    wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardTemplate;
  };

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
var onCloseButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupClose();
  }
};
var onInputFocus = function () {
  document.removeEventListener('keydown', onSetupEscPress);
};
var onInputBlur = function () {
  document.addEventListener('keydown', onSetupEscPress);
};
var onSetupOpen = function () {
  setup.classList.remove('hidden');
  setupSimilarWizard.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  userNameInput.addEventListener('focus', onInputFocus);
  userNameInput.addEventListener('blur', onInputBlur);
  setupCloseButton.addEventListener('click', onSetupClose);
  setupCloseButton.addEventListener('keydown', onCloseButtonEnterPress);
  wizardCoat.addEventListener('click', onWizardCoatChangeColor);
  wizardEyes.addEventListener('click', onWizardEyesChangeColor);
  wizardFireball.addEventListener('click', onWizardFireballChangeColor);
};
var onSetupClose = function () {
  setup.classList.add('hidden');
  setupSimilarWizard.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  userNameInput.removeEventListener('focus', onInputFocus);
  userNameInput.removeEventListener('blur', onInputBlur);
  setupCloseButton.removeEventListener('click', onSetupClose);
  setupCloseButton.removeEventListener('keydown', onCloseButtonEnterPress);
  wizardCoat.removeEventListener('click', onWizardCoatChangeColor);
  wizardEyes.removeEventListener('click', onWizardEyesChangeColor);
  wizardFireball.removeEventListener('click', onWizardFireballChangeColor);
};
var changeParameterColorWhenPressed = function (parameter, colors, property, input) {
  var pastColor = input.value;
  var newColor = getNextElement(colors, pastColor);

  parameter.style[property] = newColor;
  input.value = newColor;
};
var onWizardCoatChangeColor = function () {
  changeParameterColorWhenPressed(wizardCoat, COAT_COLORS, FILL_PROPERTY, inputOfWizardCoat);
};
var onWizardEyesChangeColor = function () {
  changeParameterColorWhenPressed(wizardEyes, EYES_COLORS, FILL_PROPERTY, inputOfWizardEyes);
};
var onWizardFireballChangeColor = function () {
  changeParameterColorWhenPressed(wizardFireball, FIREBALL_COLORS, BACKGROUND_COLOR_PROPERTY, inputOfWizardFireball);
};

var mockOfWizards = generateWizards(NUMBER_OF_WIZARDS);
var setup = document.querySelector('.setup');
var setupSimilarWizard = document.querySelector('.setup-similar');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputOfWizardCoat = document.querySelector('input[name="coat-color"]');
var inputOfWizardEyes = document.querySelector('input[name="eyes-color"]');
var inputOfWizardFireball = document.querySelector('input[name="fireball-color"]');

pasteWizards(mockOfWizards);
setupOpenButton.addEventListener('click', onSetupOpen);
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupOpen();
  }
});
