'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
};
var getRandomNumber = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = Math.floor(getMaxElement(times));

  // Облако
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Текст в облаке
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 2);

  // Гистограмма
  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = ((BAR_HEIGHT * Math.floor(times[i])) / maxTime) - TEXT_GAP;
    var currentColor = 'hsl(240, ' + getRandomNumber() + '%, 50%)';
    var coordinateX = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i;

    // Текс с набранными очками
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), coordinateX, CLOUD_Y + TEXT_GAP * 3 + (BAR_HEIGHT - currentBarHeight));
    // Текст с именем
    ctx.fillText(names[i], coordinateX, CLOUD_Y + (CLOUD_HEIGHT - TEXT_GAP - GAP));

    // Полоска
    if (names[i] === 'Вы') {
      currentColor = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = currentColor;
    ctx.fillRect(coordinateX, CLOUD_Y + TEXT_GAP * 4 + (BAR_HEIGHT - currentBarHeight), BAR_WIDTH, currentBarHeight);
  }
};
