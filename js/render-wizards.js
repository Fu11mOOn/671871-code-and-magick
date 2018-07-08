'use strict';

(function () {
  window.renderWizards = function (array, number) {
    var elementsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    var renderWizard = function (wizard) {
      var wizardTemplate = document.querySelector('#similar-wizard-template').content.cloneNode(true);

      wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardTemplate;
    };

    for (var i = 0; i < number; i++) {
      fragment.appendChild(renderWizard(array[window.utilits.getRandomIntegerFromInterval(0, array.length)]));
    }

    elementsList.appendChild(fragment);
  };
})();
