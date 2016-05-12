/**
 * Created by Urriel.
 */
(function () {
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['MainService', 'toastr']; // service injection to prevent uglify errors
  /**
   * Main controller
   * @param mainService: Service to send http request for translation.
   * @param $toastr: Show toast message for error handling.
   * @constructor
   */
  function MainController (mainService, $toastr) {
    var self = this;

    self.input  = '';
    self.answer = '';

    this.submit = function submit () { // Fetch the right translation
      self.answer = ''; // empty the previous answer
      if (self.input.indexOf('-') !== -1 && self.input.length < 2) // if th input contain only a '-'.
        return;

      if (self.input.length < 1) // if the input is empty
        return;

      mainService.translate(self.input).then(_success, _error);
    };

    /**
     * Success callback
     * @param response: Http response.
     * @private
     */
    function _success (response) {
      self.answer = response.data.data; // Show the answer
    }

    /**
     * Error callback
     * @param response: Http response.
     * @private
     */
    function _error (response) {
      var title = response.data.data.title;
      var msg   = response.data.data.msg;

      if ($toastr.active() === 0) // if a toast is not already shown.
        $toastr.warning(msg, title); // Show the error.
    }
  }
})();