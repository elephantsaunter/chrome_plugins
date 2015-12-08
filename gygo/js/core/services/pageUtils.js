(function() {
  var r, t;
  r = ["angular", "core/module"], t = function(r) {
    var pageUtils, t;
    return t = function(r) {
      return -1 === r.indexOf("://") ? chrome.runtime.getURL(r) : r
    }, pageUtils = function() {
      return this.makeQueryString = function(r) {
        var t, n;
        return "?" + function() {
          var e;
          e = [];
          for (t in r) n = r[t], e.push("" + t + "=" + n);
          return e
        }().join("&")
      }, this.openUrl = function(r, n) {
        return r = t(r), chrome.tabs.getSelected(null, function() {
          return function(t) {
            return chrome.tabs.create({
              url: r,
              index: t.index + 1
            }), "function" == typeof n ? n() : void 0
          }
        }(this))
      }, this.activateUrl = function(r, n) {
        var e;
        return r = t(r), e = r.split("#")[0], chrome.tabs.query({
          currentWindow: !0,
          url: e + "*"
        }, function(t) {
          return t && t.length > 0 ? void chrome.tabs.update(t[0].id, {
            url: r,
            highlighted: !0
          }, function() {
            return "function" == typeof n ? n() : void 0
          }) : chrome.tabs.getSelected(null, function(t) {
            return chrome.tabs.create({
              url: r,
              index: t.index + 1
            }, function() {
              return "function" == typeof n ? n() : void 0
            })
          })
        })
      }, this.closeUrl = function(r) {
        return r = t(r), chrome.tabs.query({
          url: r + "*"
        }, function() {
          return function(r) {
            var t;
            return chrome.tabs.remove(function() {
              var n, e, u;
              for (u = [], n = 0, e = r.length; e > n; n++) t = r[n], u.push(t.id);
              return u
            }())
          }
        }(this))
      }, this.redirectUrl = function(r) {
        return location.href = t(r)
      }, this.reloadCurrentTab = function(r) {
        return chrome.tabs.query({
          active: !0,
          currentWindow: !0
        }, function(t) {
          var n, e, u, i;
          for (i = [], e = 0, u = t.length; u > e; e++) n = t[e], i.push(chrome.tabs.update(n.id, {
            url: n.url
          }, function() {
            return "function" == typeof r ? r() : void 0
          }));
          return i
        })
      }, window.pageUtils = this, this
    }, r.module("core").service("pageUtils", pageUtils)
  }, define(r, t)
}).call(this);
