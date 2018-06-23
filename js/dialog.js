'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilarWizard = document.querySelector('.setup-similar');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var userPicture = document.querySelector('.upload');

  var onUserPictureMouseDown = function (evt) {
    var dragged = false;
    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoordinate.x - moveEvt.clientX,
        y: startCoordinate.y - moveEvt.clientY
      };

      moveEvt.preventDefault();
      dragged = true;
      startCoordinate = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userPicture.removeEventListener('click', onClickPreventDefault);
        };

        userPicture.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  var onSetupEscPressed = function (evt) {
    window.keyPressed.esc(evt, onSetupClose);
  };
  var onCloseButtonEnterPressed = function (evt) {
    window.keyPressed.enter(evt, onSetupClose);
  };
  var onInputFocus = function () {
    document.removeEventListener('keydown', onSetupEscPressed);
  };
  var onInputBlur = function () {
    document.addEventListener('keydown', onSetupEscPressed);
  };
  var onSetupOpen = function () {
    setup.classList.remove('hidden');
    setupSimilarWizard.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPressed);
    userNameInput.addEventListener('focus', onInputFocus);
    userNameInput.addEventListener('blur', onInputBlur);
    setupCloseButton.addEventListener('click', onSetupClose);
    setupCloseButton.addEventListener('keydown', onCloseButtonEnterPressed);
    window.coloring.add();
    userPicture.addEventListener('mousedown', onUserPictureMouseDown);
  };
  var onSetupClose = function () {
    setup.classList.add('hidden');
    setupSimilarWizard.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPressed);
    userNameInput.removeEventListener('focus', onInputFocus);
    userNameInput.removeEventListener('blur', onInputBlur);
    setupCloseButton.removeEventListener('click', onSetupClose);
    setupCloseButton.removeEventListener('keydown', onCloseButtonEnterPressed);
    window.coloring.remove();
    userPicture.removeEventListener('mousedown', onUserPictureMouseDown);
    setup.style.left = '';
    setup.style.top = '';
  };

  setupOpenButton.addEventListener('click', onSetupOpen);
  setupOpenButton.addEventListener('keydown', function (evt) {
    window.keyPressed.enter(evt, onSetupOpen);
  });
})();
