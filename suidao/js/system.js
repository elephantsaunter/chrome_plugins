var proxyip = ["182.92.78.0", "182.92.153.139"],
  thisextensionid = "hfinpallhogllbckokkaefjjcjhjpnln",
  allsecond = "7200";

function log(a) {
  console.log(a)
}

function setStorage(a, b) {
  window.localStorage[a] = JSON.stringify(b)
}

function getStorage(a) {
  b = null;
  if ("undefined" !== typeof window.localStorage[a]) var b = JSON.parse(window.localStorage[a]);
  return b
}

function clearStorage(a) {
  window.localStorage.removeItem(a)
}

function ajaxGetData() {
  var a = getStorage("config"),
    b = getStorage("url");
  if (!b || !a) return !1;
  $.get(b.api + "index/", {
    version: a.version.number,
    useragent: window.navigator.userAgent,
    ajax: 1
  }, function(b) {
    var d = Date.parse(new Date);
    0 == b.status && "\u8bf7\u767b\u5f55" == b.info ? (clearStorage("config"), clearStorage("data"), clearStorage("url")) : 1 == b.status ? (setStorage("data", b), a.lastTime = d, setStorage("config", a), window.location.reload()) : (a.lastTime = d, setStorage("config", a))
  })
}

function ajaxGetConfig(a) {
  var b = getStorage("url");
  if (!b) return !1;
  $.get(b.api + "config/", {
    useragent: window.navigator.userAgent,
    ajax: 1
  }, function(c) {
    Date.parse(new Date);
    1 == c.status && chrome.management.get(thisextensionid, function(d) {
      if (!d) return !1;
      d = d.version;
      var f = c.version.oldest,
        h = c.version.update;
      c.version.number = d;
      setStorage("config", c);
      "1" != h || versionlarger(d, f) || (!0 === a ? chrome.tabs.create({
        url: b.web + "update",
        selected: !0
      }) : window.location.href = b.web + "update")
    })
  })
}

function versionlarger(a, b) {
  var c = [],
    d = [],
    c = a.split("."),
    d = b.split(".");
  for (i = 0; i < d.length; i++)
    if (!c[i] || parseInt(c[i]) < parseInt(d[i])) return !1;
  return !0
}

function setProxy() {
  var a = "dongtaiwang.com aboluowang.com epochtimes.com wujieliulan.com minghui.org bannedbook.org ntdtv.com tiantibooks.org renminbao.com secretchina.com boxun.com 64tianwang.com tibet.net xizang-zhiye.org tiananmenmother.org open.com.hk".split(" "),
    b = getStorage("data"),
    c = getStorage("config");
  if (!c) return !1;
  if (!b) return ajaxGetData(), !1;
  var c = c.open,
    d = b["1"],
    f = b["2"],
    h = b["3"],
    l = b["4"],
    g = b["5"],
    k = b.ph,
    m = b.pv;
  if (null == k || "" == k) k = g;
  if (null == m || "" == m) m = g;
  if ("off" == c) {
    var e = "",
      e = e + "function FindProxyForURL(url, host){",
      e = e + 'if(host == "chrome.google.com"){return "' + k + '";}',
      e = e + 'if(host == "clients.google.com"){return "' + k + '";}',
      e = e + 'if(host == "clients2.google.com"){return "' + k + '";}',
      e = e + 'return "DIRECT";',
      e = e + "}",
      c = {
        mode: "pac_script",
        pacScript: {
          data: e
        }
      };
    chrome.proxy.settings.set({
      value: c,
      scope: "regular"
    }, function() {
      chrome.browserAction.setIcon({
        path: "img/icon_grey.png"
      })
    })
  } else b && (e = "", e += "function FindProxyForURL(url, host){", e += 'if(shExpMatch(host,"10.[0-9]+.[0-9]+.[0-9]+")){return "DIRECT";}', e += 'if(shExpMatch(host,"172.[0-9]+.[0-9]+.[0-9]+")){return "DIRECT";}',
    e += 'if(shExpMatch(host,"192.168.[0-9]+.[0-9]+")){return "DIRECT";}', e += 'if(shExpMatch(host,"127.0.0.1")){return "DIRECT";}', e += 'if(shExpMatch(host,"localhost")){return "DIRECT";}', wsa = h.split(","), $.each(wsa, function(a, b) {
      e = e + 'if(host == "' + b + '" || dnsDomainIs(host,".' + b + '")){return "DIRECT";}'
    }), l && (wca = l.split(","), $.each(wca, function(b, a) {
      e = e + 'if(host == "' + a + '" || dnsDomainIs(host,".' + a + '")){return "DIRECT";}'
    })), $.each(a, function(a, b) {
      e = e + 'if(host == "' + b + '" || dnsDomainIs(host,".' + b + '")){return "DIRECT";}'
    }),
    e = e + 'if(host == "googlevideo.com" || dnsDomainIs(host,".googlevideo.com")){return "' + m + '";}', e = e + 'if(host == "youtube.com" || dnsDomainIs(host,".youtube.com")){return "' + m + '";}', e = e + 'if(host == "xvideos.com" || dnsDomainIs(host,".xvideos.com")){return "' + m + '";}', bsa = d.split(","), $.each(bsa, function(b, a) {
      e = e + 'if(host == "' + a + '" || dnsDomainIs(host,".' + a + '")){return "' + g + '";}'
    }), f && (bca = f.split(","), $.each(bca, function(a, b) {
      e = e + 'if(host == "' + b + '" || dnsDomainIs(host,".' + b + '")){return "' + g + '";}'
    })),
    e += 'return "DIRECT";', e += "}", c = {
      mode: "pac_script",
      pacScript: {
        data: e
      }
    }, chrome.proxy.settings.set({
      value: c,
      scope: "regular"
    }, function() {
      chrome.browserAction.setIcon({
        path: "img/icon.png"
      })
    }))
}

function checkconflict() {
  var a = getStorage("config");
  if (!a) return !1;
  chrome.management.getAll(function(b) {
    var c = [];
    $.each(b, function(b, a) {
      a.enabled && $.each(a.permissions, function(b, d) {
        "proxy" == d && thisextensionid != a.id && c.push(a)
      })
    });
    0 < c.length ? chrome.proxy.settings.set({
      value: {
        mode: "direct"
      },
      scope: "regular"
    }, function() {
      setStorage("conflict", c);
      a.open = "off";
      setStorage("config", a);
      chrome.browserAction.setIcon({
        path: "img/icon_grey.png"
      });
      chrome.browserAction.setPopup({
        popup: "disable.html"
      });
      chrome.browserAction.setBadgeText({
        text: "!"
      });
      chrome.browserAction.setBadgeBackgroundColor({
        color: [250, 46, 0, 200]
      })
    }) : (chrome.browserAction.setPopup({
      popup: "popup.html"
    }), chrome.browserAction.setBadgeText({
      text: ""
    }), clearStorage("conflict"))
  })
}

function getdomain(a) {
  a = a.toLowerCase().split("://")[1].split("/")[0].split(":")[0];
  if (-1 < ["127.0.0.1", "localhost", "accounts.google.com", "google.com", "182.92.153.139"].indexOf(a)) return !1;
  if (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(a)) return 256 > RegExp.$1 && 256 > RegExp.$2 && 256 > RegExp.$3 && 256 > RegExp.$4 ? a : !1;
  "www." == a.substr(0, 4) && (a = a.substr(4));
  var b = "com net org me biz name info cc tv tel".split(" "),
    c = a.split("."),
    d = c.length,
    b = c[d - 1],
    f = c[d - 2] + "." + c[d - 1]; - 1 < "com.cn net.cn org.cn co.kr com.hk com.br co.jp co.uk com.sg edu.au".split(" ").indexOf(f) ?
    a = c[d - 3] + "." + f : -1 < b.indexOf(b) && (a = c[d - 2] + "." + b);
  return a
}

function showerror(a) {
  $("#error").remove();
  $("body").append('<div id="error" class="alert alert-danger" role="alert" style="display:none;z-index:9999;position:fixed;width:220px;">' + a + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
  a = $(window).height() / 2 - 50;
  var b = $(window).width() / 2 - 100;
  $("#error").css({
    top: a,
    left: b
  }).slideDown("slow").delay(2E3).fadeOut("slow", function() {
    $("#error").remove()
  })
}

function showsuccess(a) {
  $("#error").remove();
  $("body").append('<div id="error" class="alert alert-success" role="alert" style="display:none;z-index:9999;position:fixed;width:300px;">' + a + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
  a = $(window).height() / 2 - 50;
  var b = $(window).width() / 2 - 150;
  $("#error").css({
    top: a,
    left: b
  }).slideDown("slow").delay(2E3).fadeOut("slow", function() {
    $("#error").remove()
  })
}

function logout(a) {
  var b = getStorage("url");
  b && $.post(b.api + "logout/", {
    useragent: window.navigator.userAgent,
    ajax: 1
  }, function(b) {
    1 == b.status && (getStorage("shareurl") && window.localStorage.clear(), !0 === a && window.location.replace("login.html#option"))
  });
  clearStorage("data");
  clearStorage("config");
  clearStorage("url");
  chrome.proxy.settings.set({
    value: {
      mode: "direct"
    },
    scope: "regular"
  }, function() {
    chrome.browserAction.setIcon({
      path: "img/icon_grey.png"
    })
  })
}
Date.prototype.Format = function(a) {
  var b = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
  for (var c in b)(new RegExp("(" + c + ")")).test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
  return a
};
var today = (new Date).Format("yyyy-M-d");

function Base64() {
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  this.encode = function(a) {
    var b = "",
      c, d, f, h, l, g, k = 0;
    for (a = _utf8_encode(a); k < a.length;) c = a.charCodeAt(k++), d = a.charCodeAt(k++), f = a.charCodeAt(k++), h = c >> 2, c = (c & 3) << 4 | d >> 4, l = (d & 15) << 2 | f >> 6, g = f & 63, isNaN(d) ? l = g = 64 : isNaN(f) && (g = 64), b = b + _keyStr.charAt(h) + _keyStr.charAt(c) + _keyStr.charAt(l) + _keyStr.charAt(g);
    return b
  };
  this.decode = function(a) {
    var b = "",
      c, d, f, h, l, g = 0;
    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); g < a.length;) c =
      _keyStr.indexOf(a.charAt(g++)), d = _keyStr.indexOf(a.charAt(g++)), h = _keyStr.indexOf(a.charAt(g++)), l = _keyStr.indexOf(a.charAt(g++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | h >> 2, f = (h & 3) << 6 | l, b += String.fromCharCode(c), 64 != h && (b += String.fromCharCode(d)), 64 != l && (b += String.fromCharCode(f));
    return b = _utf8_decode(b)
  };
  _utf8_encode = function(a) {
    a = a.replace(/\r\n/g, "\n");
    for (var b = "", c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >>
        12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
    }
    return b
  };
  _utf8_decode = function(a) {
    for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
    return b
  }
};