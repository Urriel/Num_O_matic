/**
 * Created by Urriel.
 */

/**
 * Create an error response
 * @param title {string}
 * @param msg {string}
 * @returns {{error: boolean, data: {title: string, msg: string}}}
 */
function error (title, msg) {
  return {
    error: true,
    data: {
      title: title,
      msg: msg
    }
  };
}

function invalidNumber () {
  return error('Invalid Number', 'A number must contain digits only and \'-\' for negatives ones');
}

function limitReached (size) {
  return error('Size Limit Reached', 'The limit is set to 10^' + size);
}

function missingArgument () {
  return error('Argument Missing', 'A number is needed for this request');
}

function success (data) {
  return {
    error: false,
    data: data
  }
}

module.exports = {
  error: error,
  errors: {
    invalidNumber: invalidNumber,
    limitReached: limitReached,
    missingArgument: missingArgument
  },
  success: success
};