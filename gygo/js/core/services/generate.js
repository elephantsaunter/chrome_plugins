(function() {
  var n, r;
  n = ["angular", "md5", "core/module"], r = function(n, r) {
    var generate;
    return generate = function() {
      return this.uuid = function() {
        var n, r, t, o, e, u;
        for (n = "0123456789abcdef".split(""), e = [], o = Math.random, e[8] = e[13] = e[18] = e[23] = "-", e[14] = "4", r = u = 0; 35 >= u; r = ++u) e[r] || (t = 0 | 16 * o(), e[r] = n[19 === r ? 3 & t | 8 : 15 & t]);
        return e.join("")
      }, this.randomId = function(n) {
        var r, t;
        return r = "01234567890abcdefghijklmnopqrstuvwxyz",
          function() {
            var o, e;
            for (e = [], t = o = 1; n >= 1 ? n >= o : o >= n; t = n >= 1 ? ++o : --o) e.push(r[Math.floor(Math.random() * r.length)]);
            return e
          }().join("")
      }, this.md5 = function(n) {
        return r(n)
      }, this
    }, n.module("core").service("generate", generate)
  }, define(n, r)
}).call(this);
