(function() {
  var e, n;
  e = ["angular", "core/module"], n = function(e) {
    var n;
    return n = function() {
      return function(e) {
        return e ? parseInt(1e4 * e) / 100 + "%" : "1%"
      }
    }, e.module("core").filter("renderPercent", n)
  }, define(e, n)
}).call(this);
