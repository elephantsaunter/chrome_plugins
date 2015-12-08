(function() {
  var t, r;
  t = ["angular", "angular_translate", "core/module", "core/services/validate", "core/services/invitationManager"], r = function(t) {
    var r;
    return r = function($rootScope, $http, $timeout, $tooltip, $translate, invitationManager, validate, SERVER) {
      return {
        restrict: "E",
        scope: {
          focusTrigger: "=manualFocus"
        },
        templateUrl: "partials/options/_inviter_input.html",
        link: function(t, r) {
          return t.tooltipText = "", t.tempInviter = "", t.$watch("focusTrigger", function(e) {
            var n;
            return e === !0 ? (n = r.children("form").children("input"), n[0].focus(), n[0].select(), t.focusTrigger = !1) : void 0
          }), t.tooltipAlert = function(e) {
            var n;
            return n = r.children("form").children("input"), t.myTooltip = $tooltip(n, {
              title: e,
              placement: "bottom",
              trigger: "manual"
            }), $timeout(function() {
              return t.myTooltip.show()
            }, 1), $timeout(function() {
              return t.myTooltip.hide()
            }, 3e3)
          }, t.setInviter = function() {
            var r;
            return r = t.tempInviter.trim(), validate.email(r) || validate.phone(r) ? $http({
              method: "POST",
              url: "https://" + SERVER + "/user/set_inviter",
              params: {
                inviter: r,
                sid: $rootScope.user.profile.sid
              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).success(function(e) {
              return e.success ? ($rootScope.user.inviter = r, invitationManager.queryInviter(function(r) {
                return t.$parent.inviter = r
              }), t.$parent.showInviterInput = !1) : t.tooltipAlert(e.error)
            }) : t.tooltipAlert($translate.instant("options.invitation.account_not_correct"))
          }
        }
      }
    }, t.module("core").directive("inviterInput", r)
  }, define(t, r)
}).call(this);
