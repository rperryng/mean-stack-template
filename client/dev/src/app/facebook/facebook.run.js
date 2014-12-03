(function () {
  'use strict';

  angular
    .module('facebook')
    .run(run);

  /* @ngInject */
  function run($window, $document, $rootScope, facebook) {

    $window.fbAsyncInit = function () {
      var fbParams = {
        appId: facebook.getAppId(),
        xbfml: false,
        version: 'v2.1'
      };

      if (facebook.getAppId()) {
        FB.init(fbParams);
        $rootScope.$broadcast('facebookReady');
      }
    };

    (function insertFbRoot() {
      var fbroot = $document[0].createElement('div');
      fbroot.id = 'fb-root';
      $document[0].body.insertBefore(fbroot, $document[0].body.childNodes[0]);
    })();

    (function loadSdk() {
      var script = $document[0].createElement('script');
      script.src = '//connect.facebook.net/en_US/sdk.js';
      script.id = 'facebook-jssdk';
      script.async = true;

      $document[0].getElementsByTagName('head')[0].appendChild(script);
    })();
  }
})();
