(function() {
  var t, e;
  t = ["angular", "options/module"], e = function(t) {
    var e;
    return e = function($scope, $rootScope, $timeout, $translate) {
      return $scope.initAlertText = $translate.instant("options.change_password.init_alert"), $scope.initAlertStyle = "alert-info", $scope.alertText = $scope.initAlertText, $scope.alertStyle = $scope.initAlertStyle, $scope.alert = function(t) {
        return $scope.alertText = t, $scope.alertStyle = "alert-danger", $timeout(function() {
          return $scope.alertText = $scope.initAlertText, $scope.alertStyle = $scope.initAlertStyle
        }, 2e3)
      }, $scope.closeModal = function() {
        return $rootScope.passwordModal.destroy()
      }
    }, t.module("options").controller("ChangePasswordModalController", e)
  }, define(t, e)
}).call(this);
