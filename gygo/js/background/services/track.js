(function() {
  var n, e;
  n = ["angular", "libs/analytics", "background/module"], e = function(n) {
    var track;
    return track = function($window, GA_ACCOUNT) {
      return $window.ga("create", GA_ACCOUNT, "auto"), this.event = function(n, e, t) {
        return $window.ga("send", "event", n, e, t)
      }, this.pv = function(n) {
        return null == n && (n = void 0), n ? $window.ga("send", "pageview", n) : $window.ga("send", "pageview")
      }, this.tagSession = function(n) {
        return $window.ga("set", "dimension3", n)
      }, this.tagUser = function(n) {
        return $window.ga("set", "dimension4", n)
      }, this
    }, n.module("background").service("track", track)
  }, define(n, e)
}).call(this);
