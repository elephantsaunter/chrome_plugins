(function() {
  var e, n;
  e = ["angular", "core/module"], n = function(e) {
    var n;
    return n = function($rootScope) {
      return function(e) {
        return e === $rootScope.user.profile.name
      }
    }, e.module("core").filter("isMe", n)
  }, define(e, n)
}).call(this);
