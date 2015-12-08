(function() {
  var e, r, t = [].indexOf || function(e) {
    for (var r = 0, t = this.length; t > r; r++)
      if (r in this && this[r] === e) return r;
    return -1
  };
  e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "background/module", "background/services/server", "background/services/userDomains", "background/services/userManager"], r = function(e, r, n) {
    var o, proxyManager;
    return o = r("proxyManager"), proxyManager = function($rootScope, storage, timeUtils, server, userDomains, userManager, MODES, ROLES, VER, WHITE_LIST_DOMAINS) {
      var r, i, s, u, a, l, p, h, c, f, d, g, m, x;
      return p = timeUtils.time(), a = function() {
        return $rootScope.proxies = x(storage.get("proxies", [])), $rootScope.mode = storage.get("mode", MODES.AUTO), $rootScope.urlRules = {}, $rootScope.freeDomains = [], $rootScope.averageStability = 1, $rootScope.blocked = l(), s(), server.on("proxies", function(e) {
          return e && !e.error && (null != e ? e.length : void 0) > 0 && h(e), $rootScope.proxies
        }), server.on("free_domains", function(r) {
          return e.isArray(r) && !r.error && ($rootScope.freeDomains = r), !0
        }), $rootScope.$watch("user.role", function() {
          return s()
        }), $rootScope.$watch("mode", function(e) {
          return s(), storage.set("mode", e)
        }), $rootScope.$watch("domains", function() {
          return s()
        }, !0), $rootScope.$watch("freeDomains", function() {
          return s()
        }, !0), $rootScope.$watch("urlRules", function(e) {
          return o("[changed] urlRules, %s", JSON.stringify(e)), s()
        }, !0), $rootScope.$watch("proxies", f, !0), chrome.proxy.onProxyError.addListener(d), o("ready")
      }, g = function(e) {
        return {
          host: e.host,
          port: e.port
        }
      }, f = function(i, u) {
        var a, h, f, d, x, v;
        return $rootScope.blocked = l(), $rootScope.averageStability = r(), d = e.map(u, g), m(), f = e.map($rootScope.proxies, g), o(d, f), n.equals(d, f) ? (a = t.call(e.pluck($rootScope.proxies, "stability"), -1) < 0, a && (h = e.min(function() {
          var e, r, t, n;
          for (t = $rootScope.proxies, n = [], e = 0, r = t.length; r > e; e++) x = t[e], n.push(Math.abs(x.fail));
          return n
        }()), v = Math.min(300, 10 + 300 * Math.pow(h / 5, 2)), p + v < timeUtils.time() && (server.emit("pxs", c()), p = timeUtils.time()))) : (o("generate script"), s(), server.emit("pxs", c()), p = timeUtils.time()), storage.set("proxies", n.copy($rootScope.proxies))
      }, d = function(e) {
        var r, t;
        if ("net::ERR_PROXY_CONNECTION_FAILED" !== (t = e.error) && "net::ERR_TUNNEL_CONNECTION_FAILED" !== t) return r = $rootScope.proxies[0], chrome.proxy.settings.get({}, function(t) {
          return chrome.management.getAll(function(n) {
            var o, i, s, u, a, l, p;
            for (i = [], u = 0, a = n.length; a > u; u++) o = n[u], o.enabled && o.id !== chrome.runtime.id && "extension" === o.type && i.push(o.name);
            return s = null != (l = t.value) && null != (p = l.pacScript) ? p.data.slice(-1e3) : void 0, Raven.captureMessage("" + e.error, {
              extra: {
                details: e.details,
                level: t.levelOfControl,
                extensions: i,
                script: s
              },
              tags: {
                fatal: e.fatal,
                ver: VER,
                proxy: null != r ? r.name : void 0
              }
            })
          })
        })
      }, x = function(r) {
        var t, n, o, i, s, u, a, l, p, h, c, f, d;
        for (o = 0, a = r.length; a > o; o++) {
          for (n = r[o], c = ["name", "group", "scheme", "host"], i = 0, l = c.length; l > i; i++) t = c[i], e.isString(n[t]) || (n[t] = "");
          for (f = ["port", "fail"], s = 0, p = f.length; p > s; s++) t = f[s], e.isNumber(n[t]) || (n[t] = 0);
          for (d = ["latency", "speed", "stability"], u = 0, h = d.length; h > u; u++) t = d[u], e.isNumber(n[t]) || (n[t] = -1)
        }
        return r
      }, h = function(r) {
        var t, n, o, i, s, u, a, l, p;
        for (i = x(r), s = 0, a = i.length; a > s; s++)
          if (o = i[s], n = e.findWhere($rootScope.proxies, {
              name: o.name
            }))
            for (p = ["latency", "fail", "stability", "speed"], u = 0, l = p.length; l > u; u++) t = p[u], o[t] = n[t];
        return $rootScope.proxies = i, setTimeout(function() {
          return $rootScope.$apply()
        })
      }, r = function() {
        var r;
        return r = e.map(e.pluck($rootScope.proxies, "stability"), function(e) {
          return -1 === e ? 1 : e
        }), r.length ? e.reduce(r, function(e, r) {
          return e + r
        }) / r.length : 1
      }, i = function(e) {
        var r, t, n, o, i;
        return i = Math.pow(e.stability, 2), n = e.speed, r = e.latency, o = n > 0 ? n > 500 ? 1 : 1 - Math.pow(1 - n / 500, 2) : .5, t = r > 0 ? 1e3 >= r ? 1 - Math.pow(r / 1e3, 2) / 3 : 3e3 > r ? 2 * Math.pow((3e3 - r) / 2e3, 2) / 3 : 0 : .5, parseFloat(((.6 * o + .4 * t) * i).toFixed(2))
      }, m = function() {
        return $rootScope.proxies = e.sortBy($rootScope.proxies, function(e) {
          return -i(e)
        })
      }, c = function() {
        var e, r;
        return o("make pxs info, last report time: %s s ago", timeUtils.time() - p), r = $rootScope.proxies, [function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.name);
          return o
        }(), function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(parseFloat(e.stability.toFixed(2)));
          return o
        }(), function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.fail);
          return o
        }(), function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.latency);
          return o
        }(), function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(parseFloat(e.speed.toFixed(2)));
          return o
        }(), function() {
          var t, n, o;
          for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(i(e));
          return o
        }()]
      }, l = function() {
        return e.all($rootScope.proxies, function(e) {
          return e.stability < .5
        }) || 0 === $rootScope.proxies.length
      }, s = e.throttle(function() {
        var e, r;
        return $rootScope.user.role === ROLES.VIP && $rootScope.mode !== MODES.NEVER || (null != (r = $rootScope.freeDomains) ? r.length : void 0) > 0 || "{}" !== JSON.stringify($rootScope.urlRules) ? (e = {
          mode: "pac_script",
          pacScript: {
            data: u(),
            mandatory: !0
          }
        }, chrome.proxy.settings.set({
          value: e,
          scope: "regular"
        }, function() {
          return function() {
            return null
          }
        }(this))) : chrome.proxy.settings.clear({}), o("_generateAndApplyConfig")
      }, 500), u = function() {
        var e, r, t, n, o, i, s, u, a, l, p, h, c, f, d, g, m, x, v, y, b, D, O, w, N;
        for (o = $rootScope.mode, o !== MODES.AUTO && o !== MODES.ALWAYS && (o = MODES.AUTO), p = [], D = ($rootScope.proxies || []).slice(0, 2), d = 0, v = D.length; v > d; d++) s = D[d], p.push("" + s.scheme + " " + s.host + ":" + s.port);
        l = p.join(";"), n = [], n.push(["function Find", "roxyForURL(url, host) {\n"].join("P")), n.push('var D = "DIRECT";'), n.push("var p='" + l + "';\n"), n.push("if (shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return D;"), O = $rootScope.urlRules || {};
        for (f in O) s = O[f], n.push("if (url == '" + f + "') return '" + s.scheme + " " + s.host + ":" + s.port + "';");
        for (n.push("if (url.indexOf('https://www.google.com/complete/search?client=chrome-omni') == 0)"), n.push(" return D;"), n.push("if (url.indexOf('http://clients1.google.com/generate_204') == 0)"), n.push(" return D;"), n.push("if (url.indexOf('http://chart.apis.google.com/') == 0)"), n.push(" return D;"), n.push("if (url.indexOf('http://toolbarqueries.google.com') == 0)"), n.push("  return D;\n"), n.push("var i = url.indexOf('_HXPROXY=');"), n.push("if (i >= 0) return url.substr(i+9).replace('+', ' ');\n"), g = 0, y = WHITE_LIST_DOMAINS.length; y > g; g++) e = WHITE_LIST_DOMAINS[g], n.push("if (dnsDomainIs(host, '" + e + "')) return D;");
        if (n.push("\n"), r = [], r = r.concat(o === MODES.AUTO && (null != $rootScope && null != (w = $rootScope.user) ? w.role : void 0) === ROLES.VIP ? userDomains.names() : $rootScope.freeDomains), o !== MODES.ALWAYS) {
          for (h = {}, m = 0, b = r.length; b > m; m++)
            for (e = r[m], i = h, a = e.toLowerCase().split(".").reverse(), t = x = 0, N = a.length - 1; N >= 0 ? N >= x : x >= N; t = N >= 0 ? ++x : --x)
              if (u = a[t], t === a.length - 1) i[u] = 1;
              else {
                if (1 === i[u]) break;
                null == i[u] && (i[u] = {}), i = i[u]
              }
          n.push("var node = " + JSON.stringify(h) + ";"), n.push("var hostParts = host.toLowerCase().split('.');"), n.push("for (var i=hostParts.length - 1; i >= 0; i --) {"), n.push("    var part = hostParts[i];"), n.push("    node = node[part];"), n.push("    if (node == undefined || node == 1) break;"), n.push("}"), n.push("if (node == 1)"), n.push("    return p;\n")
        } else n.push("return p;");
        return n.push("return D;"), n.push("}"), c = n.join("\n")
      }, this.updateSpeed = function(e, r) {
        return -1 === e.speed && (e.speed = r), e.speed = parseInt(.75 * e.speed + .25 * r)
      }, this.updateLatency = function(e, r) {
        return -1 === e.latency && (e.latency = r), e.latency = parseInt(.75 * e.latency + .25 * r)
      }, this.updateStability = function(e, r) {
        return -1 === e.stability && (e.stability = r), e.stability = parseFloat((.75 * e.stability + .25 * r).toFixed(3))
      }, this.getProxyByName = function(r) {
        return e.findWhere($rootScope.proxies, {
          name: r
        })
      }, a(), window.showProxies = function() {
        var r, t;
        return t = function() {
          var t, n, o, i;
          for (o = $rootScope.proxies, i = [], t = 0, n = o.length; n > t; t++) r = o[t], i.push(e.omit(r, "host", "port"));
          return i
        }(), console.table(t)
      }, this
    }, n.module("background").service("proxyManager", proxyManager)
  }, define(e, r)
}).call(this);
