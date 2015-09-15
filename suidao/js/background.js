var timesecond;
chrome.extension.onMessage.addListener(function(a, b, c) {
  "checklevel" == a.action && checklevel()
});
checklevel();
chrome.webRequest.onErrorOccurred.addListener(function(a) {
  var b = a.error,
    c = getdomain(a.url);
  if (!1 === c) return !1;
  a = getStorage("data");
  var d = getStorage("config"),
    e = getStorage("url");
  if (null === a || null === d) return !1;
  d = d.open;
  if ("on" == ("off" == d ? "off" : "on"))
    if ("net::ERR_PROXY_CONNECTION_FAILED" == b) $.get(e.api + "index/?errorproxy=" + a["5"] + "&ajax=1", function(a) {
      1 == a.status && setStorage("data", a)
    });
    else if (-1 < "dongtaiwang.com aboluowang.com epochtimes.com wujieliulan.com minghui.org bannedbook.org ntdtv.com tiantibooks.org renminbao.com secretchina.com boxun.com 64tianwang.com tibet.net xizang-zhiye.org tiananmenmother.org open.com.hk".split(" ").indexOf(c)) chrome.notifications.create("refuse", {
    type: "basic",
    title: "\u7f51\u7ad9\u88ab\u7981\u7528",
    message: "\u79d1\u5b66\u4e0a\u7f51\u63d2\u4ef6\u4e0d\u652f\u6301 " + c + " \uff0c\u7f51\u7ad9\u88ab\u7981\u7528\uff0c\u8bf7\u901a\u8fc7\u5176\u4ed6\u65b9\u6cd5\u8bbf\u95ee\u3002",
    iconUrl: "img/icon128.png"
  }, function(a) {});
  else {
    if (-1 < a["1"].indexOf(c) | -1 < a["2"].indexOf(c) | -1 < a["3"].indexOf(c) | -1 < a["4"].indexOf(c)) return !1;
    $.post(e.api + "domain/domain/" + c, function(a) {
      1 == a.status && "close" == a.type && chrome.notifications.create(c, {
        type: "basic",
        title: "\u7f51\u7ad9\u65e0\u6cd5\u8bbf\u95ee",
        message: "\u7f51\u7ad9 " + c + " \u65e0\u6cd5\u8bbf\u95ee\uff0c\u9700\u6dfb\u52a0\u5230\u4e0a\u7f51\u5217\u8868\u3002\u70b9\u51fb\u6dfb\u52a0\u3002",
        iconUrl: "img/icon128.png"
      }, function(a) {})
    })
  }
}, {
  urls: ["<all_urls>"]
});
chrome.notifications.onClicked.addListener(function(a) {
  if ("refuse" == a || "msg" == a) return !1;
  var b = getStorage("url");
  $.post(b.api + "black/domain/" + a, function(b) {
    1 == b.status && (ajaxGetData(), chrome.notifications.create("msg", {
      type: "basic",
      title: "\u64cd\u4f5c\u6210\u529f",
      message: "\u606d\u559c\u4f60\uff0c\u7f51\u7ad9 " + a + " \u6dfb\u52a0\u6210\u529f\u3002",
      iconUrl: "img/icon128.png"
    }, function(a) {
      setProxy()
    }))
  })
});
chrome.management.onInstalled.addListener(checkconflict);
chrome.management.onUninstalled.addListener(checkconflict);
chrome.management.onEnabled.addListener(checkconflict);
chrome.management.onDisabled.addListener(checkconflict);
setInterval(checkconflict, 6E4);
chrome.proxy.onProxyError.addListener(function(a) {});

function checklevel() {
  var a = getStorage("data"),
    b = getStorage("config");
  if (!a || !b) return !1;
  a = a["6"];
  if (!b.mid || !b.email) return !1;
  if (1 == a.level) clearInterval(timesecond), timesecond = setInterval(everysecond, 1E3);
  else if (1 < a.level) {
    var c = Date.parse(new Date);
    0 < Math.ceil((a.ended - c / 1E3) / 86400) ? (b.enable = "on", b.open = "on", setStorage("config", b)) : (b.enable = "off", b.open = "off", setStorage("config", b), chrome.browserAction.setIcon({
      path: "img/icon_grey.png"
    }));
    setProxy()
  }
}

function everysecond() {
  var a = getStorage("config"),
    b = getStorage("second");
  if (!a || !b) return !1;
  if ("on" == a.open) {
    var c = new Base64,
      d = (new Date).Format("yyyy-M-d");
    secondtoday = 1 * c.decode(b[d]);
    0 < secondtoday ? (secondtoday--, secondtoday += "", b[d] = c.encode(secondtoday), setStorage("second", b)) : (a.enable = "off", a.open = "off", setStorage("config", a), chrome.browserAction.setIcon({
      path: "img/icon_grey.png"
    }), setProxy())
  }
};