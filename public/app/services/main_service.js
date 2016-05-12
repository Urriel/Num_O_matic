/**
 * Created by Urriel.
 */
(function () {
  angular.module('app')
    .factory('MainService', MainService);

  MainService.$inject = ['$http']; // Service injection to prevent uglify errors.
  /**
   * Main Service
   * @param $http: Http request constructor service.
   * @returns {{}}
   * @constructor
   */
  function MainService ($http) {
    var publicMethods = {}; // Methods to return;

    publicMethods.translate = translate;
    /**
     * Send a request to translate a number.
     * @param number: Number to translate.
     * @returns {*}: Response promise.
     */
    function translate (number) {
      return $http({
                     method  : 'POST',
                     url     : 'http://localhost:3000/api/translate',
                     headers : {
                       'Content-Type' : 'application/json'
                     },
                     data    : {
                       'number' : number
                     }
                   });
    }

    return publicMethods;
  }
})();