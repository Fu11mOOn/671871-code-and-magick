'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  var pasteWizards = function () {
    var mockOfWizards = window.generateWizards(NUMBER_OF_WIZARDS);
    var elementsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    var renderWizard = function (wizard) {
      var wizardTemplate = document.querySelector('#similar-wizard-template').content.cloneNode(true);

      wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
      wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

      return wizardTemplate;
    };

    for (var i = 0; i < mockOfWizards.length; i++) {
      fragment.appendChild(renderWizard(mockOfWizards[i]));
    }

    elementsList.appendChild(fragment);
  };

  pasteWizards();
})();
