(function() {
  var n, t;
  n = ["angular", "angular_translate", "core/module"], t = function(n) {
    var t;
    return t = function($translate) {
      return function(n) {
        var t, e, r, o, a, i, u;
        return u = function(n, t) {
          var e, r, o;
          return null == t && (t = 2), e = t - String(n).length, 0 >= e ? n : (r = function() {
            var n, t;
            for (t = [], o = n = 0; e >= 0 ? e > n : n > e; o = e >= 0 ? ++n : --n) t.push("0");
            return t
          }(), r.concat(n).join(""))
        }, i = $translate.instant("options.layout.second"), o = $translate.instant("options.layout.minute"), r = $translate.instant("options.layout.hour"), e = $translate.instant("options.layout.day"), a = new Date, t = parseInt(n - a.getTime() / 1e3), 0 >= t ? "" : 60 >= t ? "" + t + i : 3600 >= t ? "" + u(parseInt(t / 60)) + o + u(t % 60) + i : 86400 >= t ? "" + u(parseInt(t / 3600)) + r + u(parseInt(t % 3600 / 60)) + o : (t / 3600 / 24).toFixed(1) + e
      }
    }, n.module("core").filter("renderLeftTime", t)
  }, define(n, t)
}).call(this);
