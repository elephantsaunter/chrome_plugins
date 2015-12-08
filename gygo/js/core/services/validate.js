(function() {
  var n, t;
  n = ["underscore", "angular", "core/module"], t = function(n, t) {
    var validate;
    return validate = function() {
      return this.ip = function(t) {
        var e, r;
        return t ? (r = t.split("."), 4 === r.length && n.every(function() {
          var n, t, i;
          for (i = [], n = 0, t = r.length; t > n; n++) e = r[n], i.push(isNaN(e));
          return i
        }())) : !1
      }, this.email = function(n) {
        return n && n.length >= 6 && /^[\w\-\.]+@[\w\-]+(\.\w+)+$/.test(n)
      }, this.phone = function(n) {
        return n && 11 === n.length && /^1(\d)+$/.test(n)
      }, this.domain = function(n) {
        var t, e;
        return n ? (t = n.trim(), t && 0 < (e = t.indexOf(".")) && e < t.length - 1) : !1
      }, this
    }, t.module("core").service("validate", validate)
  }, define(n, t)
}).call(this);
