'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  var setupSimilarWizard = document.querySelector('.setup-similar');
  var wizards = [];

  var renderWizards = function (array, number) {
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
      fragment.appendChild(renderWizard(array[i]));
    }

    window.utilits.removeAllChildElement(elementsList);
    elementsList.appendChild(fragment);
  };
  var updateWizards = function (colors) {

    var getRank = function (wizard) {
      var rank = 0;

      if (wizard.colorCoat === colors.coatColor) {
        rank += 2;
      }
      if (wizard.colorEyes === colors.eyesColor) {
        rank += 1;
      }

      return rank;
    };

    var namesComparator = function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    };

    wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    });
    renderWizards(wizards, NUMBER_OF_WIZARDS);
  };
  window.similarWizards = function (colors) {
    window.utilits.eliminateBounce(function () {
      updateWizards(colors);
    });
  };
  var onLoad = function (array) {
    renderWizards(array, NUMBER_OF_WIZARDS);
    wizards = array;
    window.utilits.removeErrorText(setupSimilarWizard);
  };
  var onError = function (errorText) {
    window.utilits.addErrorText(errorText, setupSimilarWizard);
  };

  setupSimilarWizard.classList.remove('hidden');
  window.backend.load(onLoad, onError);
})();
