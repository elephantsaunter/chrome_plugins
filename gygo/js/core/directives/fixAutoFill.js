(function() {
  var r, e;
  r = ["angular", "core/module"], e = function(r) {
    var e;
    return e = function($interval) {
      return {
        restrict: "A",
        require: "ngModel",
        link: function(r, e, n, i) {
          var t;
          return t = "", $interval(function() {
            var r;
            return r = e.val(), t !== r ? (i.$setViewValue(r), t = r) : void 0
          }, 300)
        }
      }
    }, r.module("core").directive("fixAutoFill", e)
  }, define(r, e)
}).call(this);
