(function() {
  var n, e;
  n = ["angular", "core/services/pageUtils", "popup/module"], e = function(n) {
    var e;
    return e = function($scope, $rootScope, pageUtils) {
      return $scope.extensions = function() {
        return $rootScope.conflicts
      }, $scope.openExtensionPage = function() {
        return function(n) {
          var e;
          return e = "chrome://extensions", n && (e += "/?id=" + n), pageUtils.openUrl(e, window.close)
        }
      }(this)
    }, n.module("popup").controller("ConflictController", e)
  }, define(n, e)
}).call(this);
