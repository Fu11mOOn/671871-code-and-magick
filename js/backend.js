'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';

  var checkRequest = function (onLoad, element) {
    var xhr = new XMLHttpRequest();
    var lastElement = element.lastElementChild;
    var errorClass = 'error-message';

    var addErrorText = function (errorText) {
      if (!lastElement.classList.contains(errorClass)) {
        var text = document.createElement('p');

        text.textContent = errorText;
        text.classList.add(errorClass);
        element.appendChild(text);
      }
    };
    var removeErrorText = function () {
      if (lastElement.classList.contains(errorClass)) {
        lastElement.remove();
      }
    };

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          removeErrorText();
          break;
        case 301:
          addErrorText('Ресурс навсегда переехал на новый сервер');
          break;
        case 307:
          addErrorText('Ресурс временно переехал на новый сервер');
          break;
        case 400:
          addErrorText('Неверный запрос');
          break;
        case 401:
          addErrorText('Пользователь не авторизован');
          break;
        case 404:
          addErrorText('Ничего не найдено');
          break;
        case 500:
          addErrorText('Произошла внутренняя ошибка сервера');
          break;
        default:
          addErrorText('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      addErrorText('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      addErrorText('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, element) {
      var xhr = checkRequest(onLoad, element);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (data, onLoad, element) {
      var xhr = checkRequest(onLoad, element);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
