'use strict';

(function () {
  var setupSimilarWizard = document.querySelector('.setup-similar');
  var NUMBER_OF_WIZARDS = 4;

  var pasteWizards = function (array) {
    var elementsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    var renderWizard = function (wizard) {
      var wizardTemplate = document.querySelector('#similar-wizard-template').content.cloneNode(true);

      wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardTemplate;
    };

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(array[window.utilits.getRandomIntegerFromInterval(0, array.length)]));
    }

    elementsList.appendChild(fragment);
  };

  setupSimilarWizard.classList.remove('hidden');
  window.backend.load(pasteWizards, setupSimilarWizard);
})();
