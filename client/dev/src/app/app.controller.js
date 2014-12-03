(function () {
  'use strict';

  angular
    .module('MyApp')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($scope, $state, facebook) {

    $scope.$on('facebookReady', onFacebookReady);

    //////////

    function onFacebookReady() {

      facebook.getLoginStatus()
        .then(function (isLoggedIn) {
          if (!isLoggedIn) {
            $state.go('login');
          }
          console.log('user logged in:', isLoggedIn);
        });
    }
  }
})();
