(function() {
  var r, e;
  r = ["angular", "core/module"], e = function(r) {
    var e;
    return e = function() {
      return function(r) {
        return r > .8 ? "progress-bar-success" : r > .5 ? "progress-bar-warning" : "progress-bar-danger"
      }
    }, r.module("core").filter("stabilityStyle", e)
  }, define(r, e)
}).call(this);
