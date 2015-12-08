(function() {
  var n, t;
  n = ["angular", "core/services/storage", "core/services/pageUtils", "core/services/timeUtils", "background/module", "background/services/track"], t = function(n) {
    var notificationManager;
    return notificationManager = function($rootScope, $translate, $http, $timeout, storage, server, timeUtils, pageUtils, track, ROLES, SERVER) {
      var n, t, i, e, o;
      return chrome.notifications ? (e = {}, t = function() {
        return server.on("fetch_notification", function(t) {
          return n(null != t ? t.nid : void 0)
        }), $rootScope.$on("checkin-success", function() {
          var t, i;
          return (null != (t = $rootScope.user) && null != (i = t.profile) ? i.sid : void 0) ? $timeout(n, 30 * Math.random() * 1e3) : void 0
        }), chrome.notifications.onClicked.addListener(function(n) {
          var t;
          return (t = e[n]) ? (pageUtils.openUrl("options" === t.url ? "options.html" : t.url), track.event("notification", t.type, "click")) : void 0
        }), chrome.notifications.onButtonClicked.addListener(function(n, t) {
          var i, o;
          return (o = e[n]) ? (i = o.options.buttons[t].title, "Please Renew VIP" === o.type && storage.set("disableNotifyRenewVIP", !0), track.event("notification", o.type, "button-click:" + i)) : void 0
        }), server.on("profile", function() {
          return setTimeout(function() {
            var n, t, e;
            if ((null != (n = $rootScope.user) ? n.role : void 0) === ROLES.USER) {
              if (null != (t = $rootScope.user) && null != (e = t.profile) ? e.until : void 0) {
                if (storage.get("disableNotifyRenewVIP")) return;
                return o()
              }
              return i()
            }
          })
        })
      }, i = function() {
        var n, t, i;
        return n = {
          options: {
            title: $translate.instant("notifications.create_vip.title"),
            message: $translate.instant("notifications.create_vip.message"),
            contextMessage: $translate.instant("notifications.create_vip.contextMessage"),
            type: "basic",
            iconUrl: "img/logo.png"
          },
          type: "Please Create VIP",
          url: "https://" + SERVER + "/pay/index?name=" + (null != (t = $rootScope.user) && null != (i = t.profile) ? i.name : void 0)
        }, chrome.notifications.create("notifyCreateVIP", n.options, function(t) {
          return e[t] = n
        }), track.event("notification", n.type, "show")
      }, o = function() {
        var n, t, i;
        return n = {
          options: {
            title: $translate.instant("notifications.renew_vip.title"),
            message: $translate.instant("notifications.renew_vip.message"),
            contextMessage: $translate.instant("notifications.renew_vip.contextMessage"),
            buttons: [{
              title: $translate.instant("notifications.renew_vip.button_title")
            }],
            type: "basic",
            iconUrl: "img/logo.png"
          },
          type: "Please Renew VIP",
          url: "https://" + SERVER + "/pay/index?name=" + (null != (t = $rootScope.user) && null != (i = t.profile) ? i.name : void 0)
        }, chrome.notifications.create("notifyRenewVIP", n.options, function(t) {
          return e[t] = n
        }), track.event("notification", n.type, "show")
      }, n = function(n) {
        var t, i;
        return null == n && (n = null), $http.get("https://" + SERVER + "/user/notification", {
          params: {
            sid: null != (t = $rootScope.user) && null != (i = t.profile) ? i.sid : void 0,
            nid: n
          }
        }).success(function(n) {
          var t, i, o, r, s;
          if (n.notifications) {
            for (r = n.notifications, s = [], i = 0, o = r.length; o > i; i++) t = r[i], chrome.notifications.create("", t.option, function(n) {
              return e[n] = t
            }), s.push(track.event("notification", t.type, "show"));
            return s
          }
        })
      }, t(), this) : this
    }, n.module("background").service("notificationManager", notificationManager)
  }, define(n, t)
}).call(this);
