(function() {
  var n, r;
  n = ["angular", "angular_translate", "core/module"], r = function(n) {
    var r;
    return r = function($rootScope, $translate) {
      return function(n) {
        return n === $rootScope.user.profile.name ? $translate.instant("options.invitation.me") : n
      }
    }, n.module("core").filter("renderAccount", r)
  }, define(n, r)
}).call(this);
