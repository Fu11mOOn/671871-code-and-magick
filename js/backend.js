'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';

  var checkRequest = function (onLoad, element, method, url, data) {
    var xhr = new XMLHttpRequest();

    var onError = function (errorText) {
      var text = document.createElement('p');

      text.textContent = errorText;
      element.appendChild(text);
    };

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 301:
          onError('Ресурс навсегда переехал на новый сервер');
          break;
        case 307:
          onError('Ресурс временно переехал на новый сервер');
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        case 500:
          onError('Произошла внутренняя ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, element) {
      checkRequest(onLoad, element, 'GET', GET_URL);
    },
    save: function (data, onLoad, element) {
      checkRequest(onLoad, element, 'POST', POST_URL, data);
    }
  };
})();
