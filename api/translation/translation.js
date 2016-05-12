/**
 * Created by Urriel.
 */
var utils = require('./utils');
var responses = require('../responses');

/**
 * Split the given number into 3 digits strings.
 * @param number {string}
 * @returns {Array<string>}
 * @private
 */
function _splitNumber (number) {
  var regex = /[0-9]{1,3}/g;

  number = utils.strReverse(number);
  return number.match(regex);
}

/**
 * Translate each numbers into a string.
 * @param elements {Array<string>}
 * @returns {Array<string>}
 * @private
 */
function _elementsTranslation (elements) {
  var element;
  var isHundred;

  for (var i = elements.length - 1; i >= 0; i--) {
    isHundred = false;

    element = utils.strReverse(elements[i]); // Reverse the number in its original direction.
    element = parseInt(element); // translate the element into a number.

    elements[i] = '';

    if (isNaN(element))
      throw responses.errors.invalidNumber();

    if (Math.floor(element / 100) > 0) { // Hundred rule.
      elements[i] += utils.numbers.small(element / 100) + ' ' + utils.numbers.scale(0);
      element = element % 100;

      isHundred = true;

      if (element !== 0)
        elements[i] += ' and ';
    }

    if (element != 0) { // from 20 to 99
      if (element >= 20)
        elements[i] += utils.numbers.tens(element);
      else // from 1 to 19
        elements[i] += utils.numbers.small(element);
    }

    if (i !== 0 && (element !== 0 || isHundred)) // is the element scalable.
      elements[i] += ' ' + utils.numbers.scale(i);
  }

  return elements;
}

/**
 * Concat each string elements into a single one.
 * @param elements {Array<string>}
 * @param isNegative {boolean}
 * @returns {string}
 * @private
 */
function _concat (elements, isNegative) {
  var result = '';
  var i;

  for (i = elements.length - 1; i >= 0; i--) {
    if (i !== elements.length -1 && elements[i] !== '') // add the comma when needed.
      result += ', ';
    result += elements[i];
  }

  if (result.length === 0) // Zero rule.
    return 'Zero';

  if (isNegative) // is it Negative ?
    return 'Negative ' + result;
  return result;
}


/**
 * Translate the number into a string.
 * @param number {String}
 * @returns {string}
 */
function translate (number) {
  var isNegative = false;
  var elements;

  if (number.indexOf('-') !== -1) { // if the number is negative
    isNegative = true;
    number = number.replace('-', '');
  }

  elements = _splitNumber(number);

  elements = _elementsTranslation(elements);

  return _concat(elements, isNegative);
}

module.exports = translate;