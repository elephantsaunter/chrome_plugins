(function() {
  var e, r;
  e = ["angular", "background/module", "background/services/server"], r = function(e) {
    var upgradeManager;
    return upgradeManager = function($rootScope, server) {
      return $rootScope.expired = !1, server.on("ver_expire", function() {
        return $rootScope.expired = !0
      }), this
    }, e.module("background").service("upgradeManager", upgradeManager)
  }, define(e, r)
}).call(this);
