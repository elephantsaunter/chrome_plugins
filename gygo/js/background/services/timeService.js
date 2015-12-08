(function() {
  var e, t;
  e = ["underscore", "debug", "angular", "background/module"], t = function(e, t, n) {
    var r, timeService;
    return r = t("timeService"), timeService = function($http, $rootScope) {
      var e, t, n, i;
      return $rootScope.deltaTime = 0, n = null, e = null, i = function() {
        return $http.get("http://www.timeapi.org/utc/now").success(function(t) {
          return n = new Date(t.dateString), e = new Date
        }).error(function() {
          return n = null, e = null
        })["finally"](function() {
          return $rootScope.deltaTime = n ? e.getTime() - n.getTime() : 0, r("deltaTime %s", $rootScope.deltaTime)
        })
      }, t = new Date, setInterval(function() {
        var e;
        return e = new Date, Math.abs(e.getTime() - t.getTime()) > 3e4 && ($rootScope.deltaTime = 0, $rootScope.$apply(), i()), t = new Date
      }, 1e3), i(), this
    }, n.module("background").service("timeService", timeService)
  }, define(e, t)
}).call(this);
