(function() {
  var e, n;
  e = ["underscore", "angular", "angular_translate", "core/module", "core/services/validate", "core/services/tele"], n = function(e, n) {
    var i;
    return i = function($rootScope, validate, tele, $translate) {
      return {
        restrict: "E",
        scope: {
          model: "="
        },
        templateUrl: "partials/options/_domain.html",
        link: function(n) {
          return n.edition = {
            name: ""
          }, n.update = function() {
            var i, t;
            return i = n.model, t = n.edition.name.trim(), i.name === t ? n.edit(!1) : validate.domain(t) ? e.findWhere($rootScope.domains, {
              name: t
            }) ? alert($translate.instant("options.domain.already_added")) : (tele.run("userDomains.change", i.name, t), n.editing = !1) : alert($translate.instant("options.domain.enter_correct_domain"))
          }, n.remove = function() {
            return tele.run("userDomains.remove", n.model.name)
          }, n.edit = function(e) {
            return null == e && (e = !0), e ? (n.edition.name = n.model.name, n.editing = !0, n.focusInput = !0) : n.editing = !1
          }
        }
      }
    }, n.module("core").directive("domain", i)
  }, define(e, n)
}).call(this);
