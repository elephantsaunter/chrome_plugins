(function() {
  var e, t;
  e = ["angular", "core/module"], t = function(e) {
    var t;
    return t = function() {
      return function(e) {
        var t, n;
        return t = function(e) {
          return e > 9 ? e : "0" + e
        }, n = new Date(1e3 * e), "" + n.getFullYear() + "/" + t(n.getMonth() + 1) + "/" + t(n.getDate()) + " " + ("" + t(n.getHours()) + ":" + t(n.getMinutes()) + ":" + t(n.getSeconds()))
      }
    }, e.module("core").filter("renderDatetime", t)
  }, define(e, t)
}).call(this);
