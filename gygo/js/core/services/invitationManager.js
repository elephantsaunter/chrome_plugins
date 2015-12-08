(function() {
  var i, t;
  i = ["angular", "core/module"], t = function(i) {
    var invitationManager;
    return invitationManager = function($window, $rootScope, $http, $timeout, SERVER) {
      var i;
      return this.queryInvitationList = function() {
        return $http.get("https://" + SERVER + "/user/invitation_list?sid=" + $rootScope.user.profile.sid).success(function(i) {
          return i.invitation_list ? $rootScope.invitationList = i.invitation_list : void 0
        })
      }, i = "", this.queryInviter = function(t) {
        var n;
        return i ? $timeout(function() {
          return t(i)
        }) : (n = "https://" + SERVER + "/user/get_inviter?sid=" + $rootScope.user.profile.sid, $http.get(n).success(function(n) {
          return i = n.inviter, t(i)
        }))
      }, this
    }, i.module("core").service("invitationManager", invitationManager)
  }, define(i, t)
}).call(this);
