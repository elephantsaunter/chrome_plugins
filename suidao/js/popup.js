$(document).ready(function(b) {
  var c = getStorage("data"),
    a = getStorage("config"),
    d = getStorage("url"),
    f = Date.parse(new Date);
  a && c && d && a.mid && a.email && a.pay || chrome.tabs.create({
    url: "login.html#option",
    selected: !0
  });
  if (c) var e = c["6"];
  e && e.email != a.email && logout();
  (null == c || null == a.lastTime || 6E5 < f - a.lastTime) && ajaxGetData();
  a.version.number ? b("span.version").html(a.version.number) : checkconflict();
  togglestatus();
  b("#open").click(function() {
    var a = getStorage("second"),
      b = getStorage("config");
    if (1 == e.level) {
      var c =
        (new Date).Format("yyyy-M-d"),
        d = new Base64;
      if (!a[c]) return !1;
      secondtoday = d.decode(a[c]);
      if (0 == secondtoday || null == secondtoday) return 1 == b.extend.can ? showerror("\u4eca\u65e5\u989d\u5ea6\u7528\u5b8c<br />\u8bd5\u8fd0\u8425\u671f\u95f4\u53ef\u91cd\u590d\u514d\u8d39\u7eed\u65f6") : showerror("\u4eca\u65e5\u989d\u5ea6\u7528\u5b8c<br />\u8bf7\u5347\u7ea7\u6216\u660e\u65e5\u518d\u4f7f\u7528"), !1;
      b.open = "on";
      setStorage("config", b);
      setProxy();
      setInterval(popupshowtime, 1E3)
    } else 1 < e.level && (b.open = "on", setStorage("config",
      b), setProxy());
    togglestatus()
  });
  b("#close").click(function() {
    var a = getStorage("config");
    a.open = "off";
    setStorage("config", a);
    setProxy();
    togglestatus()
  });
  b("#popup .extend").on("click", ".extend", function() {
    var a = getStorage("second"),
      b = getStorage("config"),
      c = new Base64,
      d = (new Date).Format("yyyy-M-d");
    b.enable = "on";
    b.open = "on";
    a[d] = c.encode(allsecond + "");
    setStorage("config", b);
    setStorage("second", a);
    setProxy();
    togglestatus()
  });
  1 == a.qqgroup.show ? b("div.qqqun a").attr("href", a.qqgroup.url).html(a.qqgroup.number) :
    b("div.qqqun").remove()
});

function togglestatus() {
  "off" == getStorage("config").open ? ($(".status").html('<span class="text-danger">\u60a8\u5173\u95ed\u4e86\u96a7\u9053</span>'), $(".logo").addClass("gray"), $(".version").addClass("gray"), $(".timetips .tips").addClass("gray"), $(".timetips .overtime").addClass("gray"), $(".qqqun").addClass("gray")) : ($(".status").html('<span class="text-primary">\u60a8\u542f\u7528\u4e86\u96a7\u9053</span>'), $(".logo").removeClass("gray"), $(".version").removeClass("gray"), $(".timetips .tips").removeClass("gray"),
    $(".timetips .overtime").removeClass("gray"), $(".qqqun").removeClass("gray"), setInterval(popupshowtime, 1E3));
  popupshowtime()
}

function popupshowtime() {
  var b = getStorage("config"),
    c = getStorage("data"),
    a = Date.parse(new Date),
    d = c["6"],
    c = (new Date).Format("yyyy-M-d");
  1 == d.level ? (a = getStorage("second"), null != a && (d = new Base64, isNaN(a[c]) || (a[c] = null), null == a[c] && (a[c] = d.encode(allsecond), b.enable = "on", b.open = "off", setStorage("config", b), setStorage("second", a)), secondtoday = 1 * d.decode(a[c]), 0 < secondtoday ? (b = Math.floor(secondtoday / 3600), c = Math.floor((secondtoday - 3600 * b) / 60), a = Math.floor(secondtoday - 3600 * b - 60 * c), $("span.overtime").html('<span style="font-size:16px;line-height:16px;margin-top:-20px;padding-top:0;">\u4eca\u65e5\u5269\u4f59\u65f6\u95f4</span><br /><span title="\u5c0f\u65f6">' +
      b + '</span>:<span title="\u5206">' + c + '</span>:<span title="\u79d2">' + a + "</span>"), $("span.extend").html("")) : 1 == b.extend.can ? ($("span.overtime").html(""), $("span.extend").html('<span class="btn btn-primary extend" >\u7eed\u65f62\u5c0f\u65f6</span><div style="font-size:12px;margin-top:10px;"><span class="label label-success">\u8bd5\u8fd0\u8425\u671f\u95f4\u53ef\u91cd\u590d\u514d\u8d39\u7eed\u65f6</span></div>')) : ($("span.overtime").html(""), $("span.extend").html('<a href="option.html#userlevel" target="_blank" class="btn btn-primary userlevel" style="margin:30px 0 0px 0;">\u8bf7\u5347\u7ea7</a><div style="font-size:12px;margin:10px 0 20px 0;"><span class="label label-success">\u4eca\u65e5\u989d\u5ea6\u7528\u5b8c\uff0c\u660e\u65e5\u83b7\u8d602\u5c0f\u65f6</span></div>')))) :
    1 < d.level && (b = Math.ceil((d.ended - a / 1E3) / 86400), $("span.overtime").html('<span style="font-size:16px;">\u5269\u4f59</span>' + b + '<span style="font-size:16px;">\u5929</span>').css("line-height", "80px"))
};