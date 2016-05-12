/**
 * Created by Urriel.
 */

/**
 * Created by Urriel on 11/05/2016.
 */
var expect = require('chai').expect;

var utils = require('../api/translation/utils');
var trslt = require('../api/translation/controller');

function responseAssert (code, data) {
  var publicMethods = {};

  publicMethods.status = status;
  /**
   * Assert the status code
   * @param statusCode
   */
  function status (statusCode) {
    expect(statusCode).to.be.a('number').equal(code);
    return publicMethods;
  }

  publicMethods.send = send;
  /**
   * Assert the response;
   * @param obj :: {error: Bool, data: {title: String, msg: String}}
   */
  function send (obj) {
    expect(obj.error).to.be.a('boolean').equal(data.error);
    if (data.data)
      expect(obj.data).to.be.a('string').equal(data.data);
    if (data.title)
      expect(obj.data.title).to.be.a('string').equal(data.title);
    if (data.msg)
      expect(obj.data.msg).to.be.a('string').equal(data.msg);
  }

  return publicMethods;
}

var req = { // request representation
  body : {
    number : ''
  }
};

describe('Requests', function () {

  describe('/api/translate', function () {
    it('Should return an error response when the request\'s body is empty', function () {

      trslt.translate({body : {}}, responseAssert(400, {
        error : true,
        title : 'Argument Missing'
      }));
    });

    it('Should return an error response when the number contains letters', function () {

      req.body.number = 'test';
      trslt.translate(req, responseAssert(400, {
                                            error : true,
                                            title : 'Invalid Number'
                                          }
      ));
    });

    it('Should return an error response when the number reach the limit', function () {

      req.body.number = '10000000000000000000000';
      trslt.translate(req, responseAssert(400, {
                                            error : true,
                                            title : 'Size Limit Reached'
                                          }
      ));
    });

    it('Should respond with the right answer :: Zero / Positive / Negative', function () {

      req.body.number = '0'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Zero'
      }));

      req.body.number = '-0'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Zero'
      }));

      req.body.number = '1'; // positive number
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One'
      }));

      req.body.number = '-1'; // negative number
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Negative One'
      }));
    });

    it('Should respond with the right answer :: Hundreds', function () {

      req.body.number = '100'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred'
      }));

      req.body.number = '112'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Twelve'
      }));

      req.body.number = '126'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Twenty-Six'
      }));

      req.body.number = '150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Fifty'
      }));

    });

    it('Should respond with the right answer :: Thousands', function () {

      req.body.number = '1000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Thousand'
      }));

      req.body.number = '10000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Ten Thousand'
      }));

      req.body.number = '100000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred Thousand'
      }));

      req.body.number = '1112'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Thousand, One Hundred and Twelve'
      }));

      req.body.number = '1126'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Thousand, One Hundred and Twenty-Six'
      }));

      req.body.number = '1150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Thousand, One Hundred and Fifty'
      }));

      req.body.number = '10150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Ten Thousand, One Hundred and Fifty'
      }));

      req.body.number = '100150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred Thousand, One Hundred and Fifty'
      }));

      req.body.number = '111150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Eleven Thousand, One Hundred and Fifty'
      }));

      req.body.number = '137150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Thirty-Seven Thousand, One Hundred and Fifty'
      }));

      req.body.number = '180150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and Eighty Thousand, One Hundred and Fifty'
      }));

      req.body.number = '101150'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred and One Thousand, One Hundred and Fifty'
      }));

    });

    it('Should respond with the right answer :: Millions', function () {

      req.body.number = '1000000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million'
      }));

      req.body.number = '10000000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Ten Million'
      }));

      req.body.number = '100000000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Hundred Million'
      }));

      req.body.number = '1000001'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million, One'
      }));

      req.body.number = '1001000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million, One Thousand'
      }));

      req.body.number = '1001001'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million, One Thousand, One'
      }));

      req.body.number = '1521000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million, Five Hundred and Twenty-One Thousand'
      }));

      req.body.number = '1001056'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'One Million, One Thousand, Fifty-Six'
      }));

      req.body.number = '-1001000'; // Zero rule
      trslt.translate(req, responseAssert(200, {
        error : false,
        data  : 'Negative One Million, One Thousand'
      }));
    });
  });
});