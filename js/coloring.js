'use strict';

(function () {
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

  var FILL_PROPERTY = 'fill';
  var BACKGROUND_COLOR_PROPERTY = 'backgroundColor';

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputOfWizardCoat = document.querySelector('input[name="coat-color"]');
  var inputOfWizardEyes = document.querySelector('input[name="eyes-color"]');
  var inputOfWizardFireball = document.querySelector('input[name="fireball-color"]');

  var changeParameterColorWhenPressed = function (element, colors, property, input) {
    var pastColor = input.value;
    var newColor = window.utilits.getNextElement(colors, pastColor);

    element.style[property] = newColor;
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

  window.coloring = {
    add: function () {
      wizardCoat.addEventListener('click', onWizardCoatChangeColor);
      wizardEyes.addEventListener('click', onWizardEyesChangeColor);
      wizardFireball.addEventListener('click', onWizardFireballChangeColor);
    },
    remove: function () {
      wizardCoat.removeEventListener('click', onWizardCoatChangeColor);
      wizardEyes.removeEventListener('click', onWizardEyesChangeColor);
      wizardFireball.removeEventListener('click', onWizardFireballChangeColor);
    }
  };
})();
