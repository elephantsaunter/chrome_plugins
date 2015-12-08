(function() {
  var e, n;
  e = ["angular", "login/module", "core/module", "core/services/tele", "core/services/pageUtils", "core/services/validate", "core/services/storage", "login/module"], n = function(e) {
    var n;
    return n = function($scope, $rootScope, $location, $http, $timeout, tele, pageUtils, validate, storage, SERVER, LOGIN_EVENT_NAME, ERROR_LOGIN_UNKNOWN, ERROR_LOGIN_TIME) {
      return $scope.name = $location.search().name || storage.get("lastLoginName", ""), $scope.password = "", $scope.resetPasswordUrl = "https://" + SERVER + "/user/password/reset", $scope.focuses = {
        name: !$scope.name,
        password: !!$scope.name
      }, $scope.submitting = !1, $scope.checkingName = !1, $scope.clearFormValidity = function() {
        return $scope.login.name.$setValidity("notExisted", !0), $scope.login.name.$setValidity("server", !0), $scope.login.password.$setValidity("mismatch", !0)
      }, $scope.checkNameExistence = function() {
        return $rootScope.validateNameFormat($scope.name) ? ($scope.checkingName = !0, $http.get("https://" + SERVER + "/user/name", {
          params: {
            name: $scope.name
          }
        }).success(function(e) {
          return e.exists ? void 0 : $scope.login.name.$setValidity("notExisted", !1)
        }).error(function() {
          return $scope.login.name.$setValidity("server", !1), alert($scope.betweenCertInterval() ? ERROR_LOGIN_UNKNOWN : ERROR_LOGIN_TIME)
        })["finally"](function() {
          return $scope.checkingName = !1
        })) : void 0
      }, $scope.doLogin = function() {
        return $scope.login.name.$setValidity("server", !0), $scope.login.name.$stateVisible = !0, $scope.login.password.$stateVisible = !0, $scope.login.$valid ? ($scope.submitting = !0, $http.get("https://" + SERVER + "/user/login", {
          params: {
            name: $scope.name,
            password: $scope.password
          }
        }).success(function(e) {
          return e.error ? "PASSWORD" === e.error ? ($scope.login.password.$setValidity("mismatch", !1), $scope.focuses.password = !0) : "NAME" === e.error ? ($scope.login.name.$setValidity("notExisted", !1), $scope.focuses.name = !0) : alert(e.message) : (tele.run("userManager.load", e).then(function() {
            return tele.run("userManager.checkin").then(function() {
              return pageUtils.redirectUrl("options.html")
            })
          }), tele.run("track.pv", "/chrome-extension/login/success"), $rootScope.isVirgin ? tele.run("track.event", LOGIN_EVENT_NAME, "login-success") : void 0)
        }).error(function() {
          return $scope.login.name.$setValidity("server", !1), alert($scope.betweenCertInterval() ? ERROR_LOGIN_UNKNOWN : ERROR_LOGIN_TIME)
        })["finally"](function() {
          return $scope.submitting = !1
        })) : void 0
      }
    }, e.module("login").controller("LoginController", n)
  }, define(e, n)
}).call(this);
