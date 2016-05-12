/**
 * Created by Urriel.
 */

var translation = require('./translation');
var responses = require('../responses');

function translate (req, res) {
  var params = req.body;
  var number = params.number;
  var re = /^\-?[0-9]+$/;
  var result;

  if (number === undefined) // if the parameter is missing
    return res.status(400).send(responses.errors.missingArgument());

  if (re.exec(number) === null) // if the number given is not full of digits
    return res.status(400).send(responses.errors.invalidNumber());

  try {
    result = translation(number); // translate the number
    res.status(200).send({error:false, data: result});
  } catch (e) {
    if (e.error !== undefined)
      res.status(400).send(e);
    else
      res.status(500).send({error:true, data: {title: 'Internal Error', msg: 'Something went wrong. Try again later...'}})
  }
}

module.exports = {
  translate: translate
};