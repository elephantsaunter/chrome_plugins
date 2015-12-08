(function() {
  var n, t, e = [].slice;
  n = ["underscore", "debug"], t = function(n, t) {
    var r, EasySocket, u, i, o, c, s, l, a, f, h, g, d;
    return g = t("EasySocket"), h = t("EasySocket"), h.log = console.error.bind(console), r = 5e3, u = 8e3, i = 17e3, c = 0, l = 2, s = 3, o = 4, f = function() {
      return function(n, t, e, r) {
        return null == t && (t = ""), null == e && (e = ""), null == r && (r = ""), n === l ? "2" : JSON.stringify([n, t, e, r])
      }
    }(this), a = function() {
      return function(n) {
        if ("2" === n) return [l, "", "", ""];
        try {
          return JSON.parse(n)
        } catch (t) {
          return h = t, [l, "", "", ""]
        }
      }
    }(this), d = function() {
      return (new Date).getTime()
    }, EasySocket = function() {
      var n, t;
      return t = null, this.setUrl = function(n) {
        return t ? h("url is already set: %s", t) : t = n
      }, this.$get = function($rootScope) {
        return new n($rootScope)
      }, n = function($rootScope) {
        var n, y, p, v, m, S, J, N, O, $, w, T, b, k, x;
        return x = null, S = {
          connect: [],
          connecting: [],
          reconnect: [],
          reconnecting: [],
          disconnect: []
        }, n = {}, O = 0, v = -1, w = -1, k = null, J = function() {
          return setInterval(function() {
            return y() && T(f(l)), d() - O > i && w > -1 ? $() : void 0
          }, u)
        }, p = function() {
          return function() {
            return g("~~~ " + t), O = d(), k && (clearTimeout(k), k = null), w > 0 ? N("reconnecting", w) : N("connecting"), $rootScope.$apply(), x && (x.close(), x.onopen = null, x.onmessage = null, x.onclose = null, x = null), x = new WebSocket(t), x.onopen = function() {
              return g("=== %s", t), O = d(), w > 0 ? N("reconnect", w) : N("connect"), $rootScope.$apply(), w = 0
            }, x.onmessage = function(t) {
              var e, r, u, i, f, y, p, v, J;
              switch (O = d(), v = a(t.data), i = v[0], e = v[1], f = v[2], u = v[3], i) {
                case c:
                  return g("--X"), m();
                case l:
                  return null;
                case s:
                  for (g("--< [%s] %s %s", e, f, JSON.stringify(u)), J = S[f] || [], y = 0, p = J.length; p > y; y++) r = J[y], "function" == typeof r ? e ? b(e, r(u)) : r(u) : e && b(e);
                  return $rootScope.$apply();
                case o:
                  return g("<-- [%s] %s", e, JSON.stringify(u)), "function" == typeof n[e] && n[e](u), $rootScope.$apply();
                default:
                  return h("-!< %o", t.data), g("Invalid MessageType: %s", i)
              }
            }, x.onclose = function() {
              return g("xxx %s", t), w > -1 ? $() : (N("disconnect"), $rootScope.$apply())
            }
          }
        }(this), $ = function() {
          var n;
          if (!k) return w += 1, n = Math.min(500 * Math.pow(2, w - 1), 2e4), k = setTimeout(p, n), g("~" + w + "~ " + n + " ms later")
        }, m = function() {
          return w = -1, null != x ? x.close() : void 0
        }, T = function(n) {
          return y() ? x.send(n) : "2" !== n ? g("not alive, cannot send %o, state=%s", n, x.readyState) : void 0
        }, b = function(n, t) {
          var e;
          return e = f(o, n, null, t), g("--> [%s] %s", n, JSON.stringify(t)), T(e)
        }, y = function() {
          return x && 1 === x.readyState
        }, N = function(n, t) {
          var e, r, u, i, o;
          for (i = S[n] || [], o = [], r = 0, u = i.length; u > r; r++) e = i[r], o.push(e(t));
          return o
        }, this.alive = function() {
          return function() {
            return y()
          }
        }(this), this.connect = function() {
          return function() {
            return w = 0, p()
          }
        }(this), this.disconnect = function() {
          return function() {
            return m()
          }
        }(this), this.emit = function() {
          return function() {
            var t, u, i, o, c, l;
            c = arguments[0], l = 2 <= arguments.length ? e.call(arguments, 1) : [];
            try {
              return i = "", u = void 0, l.length >= 2 ? (i = l[0], u = l[1]) : 1 === l.length && ("function" == typeof l[0] ? u = l[0] : i = l[0]), t = v += 2, u && (n[t] = u, setTimeout(function() {
                return delete n[t]
              }, r)), o = f(s, t, c, i), g(">-- [%s] %s %s", t, c, JSON.stringify(i)), T(o)
            } catch (a) {}
          }
        }(this), this.on = function() {
          return function(n, t) {
            return null == S[n] && (S[n] = []), S[n].push(t)
          }
        }(this), J(), this
      }, this
    }
  }, define(n, t)
}).call(this);
