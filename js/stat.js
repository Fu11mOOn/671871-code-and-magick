'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TITLE_GAP_Y = 20;
var POINTS_GAP_Y = 60;
var NAME_GAP_Y = 240;
var BAR_GAP_X = 50;
var BAR_GAP_Y = 80;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

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
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var renderStatistics = function (ctx, names, times) {
  var maxTime = Math.floor(getMaxElement(times));

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_GAP_Y, CLOUD_Y + TITLE_GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_GAP_Y, CLOUD_Y + TITLE_GAP_Y * 2);

  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = ((BAR_HEIGHT * Math.floor(times[i])) / maxTime) - TITLE_GAP_Y;
    var currentBalanceOfTotalBarHeight = BAR_HEIGHT - currentBarHeight;
    var currentColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomInteger(1, 101) + '%, 50%)';
    var coordinateX = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP_X) * i;
    var pointsCoordinateY = CLOUD_Y + POINTS_GAP_Y + currentBalanceOfTotalBarHeight;
    var barCoordinateY = CLOUD_Y + BAR_GAP_Y + currentBalanceOfTotalBarHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), coordinateX, pointsCoordinateY);
    ctx.fillText(names[i], coordinateX, CLOUD_Y + NAME_GAP_Y);

    ctx.fillStyle = currentColor;
    ctx.fillRect(coordinateX, barCoordinateY, BAR_WIDTH, currentBarHeight);
  }
};

renderStatistics();
