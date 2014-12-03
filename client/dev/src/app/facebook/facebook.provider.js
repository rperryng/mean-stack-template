(function () {
  'use strict';

  angular
    .module('facebook')
    .provider('facebook', facebookProvider);

  /* @ngInject */
  function facebookProvider() {

    var facebookAppId;

    var provider = {
      init: init,
      $get: $get
    };

    return provider;

    //////////

    function init(appId) {
      if (typeof appId !== 'string') {
        throw 'Facebook appid must be type string';
      }

      facebookAppId = appId;
    }

    /* @ngInject */
    function $get($q) {

      var service = {
        getAppId: getAppId,
        login: login,
        getLoginStatus: getLoginStatus
      };

      return service;

      function getAppId() {
        return facebookAppId;
      }

      function login() {
        var deferred = $q.defer();

        FB.login(function (response) {
          deferred.resolve(response.status === 'connected');
        });

        return deferred.promise;
      }

      function getLoginStatus() {
        var deferred = $q.defer();

        FB.getLoginStatus(function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response.status === 'connected');
        });

        return deferred.promise;
      }
    }
  }
})();
