/**
 * Created by Urriel.
 */

var responses = require('../responses');

/**
 * Reverse the given string
 * @param str {string}
 * @returns {string}
 */
function strReverse (str) {
  return str.split('').reverse().join('');
}

/**
 * Remove empty strings from 'array'
 * @param array {Array<string>}
 * @returns {*}
 */
function arrayCleaner (array) {
  var i = 0;

  for(; i < array.length; i++) {
    if (array[i] === '') {
      array.splice(i, 1);
      i--;
    }
  }

  return array;
}

var _smallNumbers = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

var _tensNumbers = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

var _scaleNumbers = ['Hundred', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];

function tensNumber (number) {
  var small;
  var tens = Math.floor(number / 10);

  if (number % 10 === 0)
    return _tensNumbers[tens];

  small = smallNumber(number % 10);

  return _tensNumbers[tens] + '-' + small;
}

function smallNumber (number) {
  number = Math.floor(number);
  return _smallNumbers[number];
}

function scaleNumber (index) {
  if (_scaleNumbers[index] === undefined)
    throw responses.errors.limitReached((_scaleNumbers.length - 1) * 3);
  return _scaleNumbers[index];
}

module.exports = {
  strReverse: strReverse,
  arrayCleaner: arrayCleaner,
  numbers: {
    scale: scaleNumber,
    tens: tensNumber,
    small: smallNumber
  }
};