(function() {
  var n, t;
  n = ["angular", "core/module"], t = function(n) {
    var t;
    return t = function($translate) {
      return function(n) {
        return "-_mtime" === n ? $translate.instant("options.domain_list.sort_by_time") : "name" === n ? $translate.instant("options.domain_list.sort_by_char") : void 0
      }
    }, n.module("core").filter("rendSorter", t)
  }, define(n, t)
}).call(this);
