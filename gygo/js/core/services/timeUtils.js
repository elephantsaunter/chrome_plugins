(function() {
  var e, t;
  e = ["angular", "core/module"], t = function(e) {
    var timeUtils;
    return timeUtils = function() {
      return this.time = function() {
        return parseInt((new Date).getTime() / 1e3)
      }, this.milliTime = function() {
        return (new Date).getTime()
      }, this
    }, e.module("core").service("timeUtils", timeUtils)
  }, define(e, t)
}).call(this);
