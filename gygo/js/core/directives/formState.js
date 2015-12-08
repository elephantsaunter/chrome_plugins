(function() {
  var r, e;
  r = ["angular", "core/module"], e = function(r) {
    var e;
    return e = function() {
      return {
        restrict: "A",
        link: function(r, e, n) {
          var i, t, s, a, l, o, u, c, d, f, v, $;
          for (v = n.formState.split("."), a = v[0], s = v[1], t = function() {
              return r[a][s]
            }, u = null, i = e.find("div"), c = f = 0, $ = i.length; $ >= 0 ? $ >= f : f >= $; c = $ >= 0 ? ++f : --f)
            if (i.eq(c).hasClass("errors")) {
              u = i.eq(c);
              break
            }
          return d = e.find("input"), d.on("keydown", function() {
            return t() ? (t().$stateVisible = !1, r.$apply()) : void 0
          }).on("blur", function() {
            return t() && t().$dirty ? (t().$stateVisible = !0, r.$apply()) : void 0
          }), l = function(r) {
            return r[a][s].$stateVisible && r[a][s].$invalid
          }, o = function(r) {
            var e;
            return r[a][s].$stateVisible && (null != (e = t()) ? e.$valid : void 0)
          }, r.$watch(l, function(r) {
            return r ? (e.addClass("has-error"), u.removeClass("invisible")) : (e.removeClass("has-error"), u.addClass("invisible"))
          }), r.$watch(o, function(r) {
            return r ? e.addClass("has-success") : e.removeClass("has-success")
          })
        }
      }
    }, r.module("core").directive("formState", e)
  }, define(r, e)
}).call(this);
