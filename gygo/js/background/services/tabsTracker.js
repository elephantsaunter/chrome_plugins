(function() {
  var r, e;
  r = ["underscore", "debug", "angular", "core/services/timeUtils", "core/services/domainUtils", "background/module", "background/services/userDomains"], e = function(r, e, t) {
    var n, tabsTracker;
    return n = e("tabsTracker"), tabsTracker = function($rootScope, $timeout, timeUtils, domainUtils, userDomains) {
      var e, u, o, i, s, a, c, d, l, f, m, b, h, v, T, p;
      return u = 1e4, e = {
        id: null,
        url: "",
        domains: {},
        requestTimers: {}
      }, v = {}, T = r.throttle(function() {
        return setTimeout(function() {
          return $rootScope.$apply()
        })
      }, 300), i = function() {
        return $rootScope.currentTabId = -1, $rootScope.currentTab = {}, $rootScope.blockedDomains = [], chrome.webRequest.onBeforeRequest.addListener(s, {
          urls: ["<all_urls>"]
        }), chrome.webRequest.onErrorOccurred.addListener(d, {
          urls: ["<all_urls>"]
        }), chrome.webRequest.onCompleted.addListener(c, {
          urls: ["<all_urls>"]
        }), chrome.tabs.onRemoved.addListener(f), chrome.tabs.onActivated.addListener(l), chrome.windows.onFocusChanged.addListener(m), chrome.tabs.query({
          active: !0,
          currentWindow: !0
        }, function(r) {
          return 0 !== (r || []).length ? ($rootScope.currentTabId = r[0].id, T()) : void 0
        }), $rootScope.$watch("currentTabId", function(r) {
          var e;
          return e = o(r), $rootScope.currentTab = e
        }), $rootScope.$watch("currentTab.domains", a, !0)
      }, o = function(r) {
        var n;
        if (!(0 > r)) return n = v[r], n || (n = t.copy(e), n.id = r, setTimeout(function() {
          return n.url ? void 0 : chrome.tabs.get(r, function(r) {
            return r && (n.url = r.url), T()
          })
        }), v[r] = n), n
      }, p = function(r, e, t, u) {
        var i, s, a, c;
        return i = o(r), (s = i.requestTimers[e]) ? (clearTimeout(s), delete i.requestTimers[e], null == (a = i.domains)[t] && (a[t] = {}), null == (c = i.domains[t])[u] && (c[u] = 0), i.domains[t][u] += 1, n("[%s] %s %s", u, t, JSON.stringify(i.domains[t])), i) : void 0
      }, b = function(r) {
        return h(r), delete v[r]
      }, h = function(r) {
        var e, t, n, u;
        if (e = o(r)) {
          n = e.requestTimers;
          for (u in n) t = n[u], clearTimeout(t);
          return e.domains = {}
        }
      }, s = function(r) {
        var e, t, n;
        if (!(r.tabId < 0 || "other" === r.type) && "https://www.googleapis.com/rpc" !== r.url) return e = domainUtils.parseUri(r.url).host, "main_frame" === r.type ? (h(r.tabId), n = o(r.tabId), n.url = r.url) : n = o(r.tabId), t = setTimeout(function() {
          return p(r.tabId, r.requestId, e, "timeout"), T()
        }, u), n.requestTimers[r.requestId] = t, T()
      }, d = function(r) {
        var e, t, n;
        if (!(r.tabId < 0 || "other" === r.type)) return e = domainUtils.parseUri(r.url).host, t = "blocked", ("net::ERR_BLOCKED_BY_CLIENT" === (n = r.error) || "net::ERR_ABORTED" === n) && (t = "ok"), p(r.tabId, r.requestId, e, t), T()
      }, c = function(r) {
        var e, t;
        if (!(r.tabId < 0 || "other" === r.type)) return e = domainUtils.parseUri(r.url).host, t = "ok", 403 === r.status && (t = "blocked"), p(r.tabId, r.requestId, e, t), T()
      }, f = function(r) {
        return b(r), T()
      }, l = function(r) {
        var e;
        return e = o(r.tabId), $rootScope.currentTab = e, T()
      }, m = function(r) {
        return chrome.tabs.query({
          active: !0,
          windowId: r,
          currentWindow: !0
        }, function() {
          return function(r) {
            var e;
            if (r && 0 !== r.length) return e = o(r[0].id), $rootScope.currentTab = e, T()
          }
        }(this))
      }, a = function(r) {
        var e, t, n, u, o, i, s, a, c, d, l, f;
        t = {};
        for (e in r) a = r[e], o = a.ok || 0, n = (a.timeout || 0) + (a.blocked || 0), s = o > n ? "ok" : "error", d = domainUtils.topDomain(e), null == t[d] && (t[d] = {}), t[d][e] = s;
        i = [];
        for (d in t) {
          c = t[d], n = 0, o = 0, u = [];
          for (e in c) s = c[e], "error" === s ? (n += 1, u.push(e)) : o += 1;
          if (!userDomains.match(d))
            if (0 === o) i.push(d);
            else if (n >= o) i.push(d);
          else if (n >= 2) i.push(d);
          else
            for (l = 0, f = u.length; f > l; l++) e = u[l], userDomains.match(e) || i.push(e)
        }
        return $rootScope.blockedDomains = i
      }, i(), window.tabsMap = v, this
    }, t.module("background").service("tabsTracker", tabsTracker)
  }, define(r, e)
}).call(this);
