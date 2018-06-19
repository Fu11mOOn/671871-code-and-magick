'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userPicture = document.querySelector('.setup-user-pic');

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
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          userPicture.removeEventListener('click', onClickPreventDefault);
        };

        userPicture.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  userPicture.addEventListener('mousedown', onUserPictureMouseDown);
})();
