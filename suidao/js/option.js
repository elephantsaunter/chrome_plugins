$(document).ready(function() {
  var c = getStorage("data"),
    b = getStorage("config");
  getStorage("invite");
  var f = getStorage("url"),
    h = Date.parse(new Date);
  if (!(b && c && f && b.mid && b.email && b.pay)) return logout(!0), !1;
  if (c) var g = c["6"],
    k = g.incode;
  g && g.email != b.email && logout(!0);
  if (null == c || null == b.lastTime || 6E5 < h - b.lastTime) ajaxGetData(), ajaxGetConfig(!1);
  $("span.email").html(b.email);
  b.version.number && $("span.version").html("\u7248\u672c\u53f7\uff1a" + b.version.number);
  showdomainlist();
  showtime();
  $(".head img").attr("src",
    "img/head" + g.level + ".gif");
  window.location.hash && $("#leftmenu ." + window.location.hash.replace("#", "")).click();
  1 == b.pay.can ? ($("#userlevel .payyear").attr("href", b.pay.yearurl + "?email=" + b.email), $("#userlevel .paymonth").attr("href", b.pay.monthurl + "?email=" + b.email)) : ($("#userlevel .payyear,#userlevel .paymonth").attr("href", ""), $("#userlevel .payyear,#userlevel .paymonth").click(function() {
    showerror("\u8bd5\u8fd0\u884c\u9636\u6bb5\uff0c\u53ef\u65e0\u9650\u7eed\u65f6,\u65e0\u9700\u4ed8\u6b3e\u3002\u60a8\u53ef\u4ee5\u9080\u8bf7\u7528\u6237\u83b7\u53d6VIP\u6743\u9650\u3002");
    return !1
  }));
  $("#tableinvite").on("click", ".useinvitevip", function() {
    if (0 == b.pay.can) return showerror("\u8bd5\u8fd0\u884c\u9636\u6bb5\uff0c\u65f6\u7a7a\u96a7\u9053\u53ef\u65e0\u9650\u7eed\u65f6\uff0c\u65e0\u9700\u4f7f\u7528\u9080\u8bf7VIP\u3002"), !1;
    email = $(this).attr("rel");
    $.get(f.api + "usevirifyvip", {
      email: email,
      ajax: 1
    }, function(a) {
      0 == a.status ? showerror(a.info) : 1 == a.status && (alert(a.info), ajaxGetData())
    })
  });
  $(".logout").click(function() {
    logout(!0)
  });
  $('a[href="#invite"]').click(function() {
    var a =
      f.www + "invi/" + k,
      e = "%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7%ef%bc%8c%e4%b8%ba%e7%a7%91%e6%8a%80%e5%b7%a5%e4%bd%9c%e8%80%85%e3%80%81%e6%b5%b7%e5%a4%96%e5%bd%92%e5%9b%bd%e4%ba%ba%e5%91%98%e3%80%81%e4%bc%81%e4%b8%9a%e5%9b%a2%e9%98%9f%e3%80%81%e5%a4%96%e8%b4%b8%e5%b7%a5%e4%bd%9c%e8%80%85%e6%8f%90%e4%be%9b%e6%b5%b7%e5%a4%96%e4%b8%8a%e7%bd%91%e6%9c%8d%e5%8a%a1%ef%bc%8c%e6%b0%b8%e4%b9%85%e5%85%8d%e8%b4%b9%e3%80%82%e5%9b%bd%e5%a4%96%e7%bd%91%e5%9d%80%ef%bc%9ahttps%3a%2f%2fchrome.google.com%2fwebstore%2fdetail%2fhfinpallhogllbckokkaefjjcjhjpnln%e5%9b%bd%e5%86%85%e7%bd%91%e5%9d%80%ef%bc%9a" +
      a + "+%e6%97%b6%e7%a9%ba%e9%9a%a7%e9%81%93%e9%82%80%e8%af%b7%e7%a0%81" + k;
    $("span.incode").html(k);
    $(".sharebutton .bds_qzone").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&desc=" + e);
    $(".sharebutton .bds_tsina").attr("href", "http://service.weibo.com/share/share.php?url=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7");
    $(".sharebutton .bds_sqq").attr("href", "http://connect.qq.com/widget/shareqq/index.html?url=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&desc=" + e);
    $(".sharebutton .bds_tieba").attr("href", "http://tieba.baidu.com/f/commit/share/openShareApi?url=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7");
    $(".sharebutton .bds_renren").attr("href",
      "http://widget.renren.com/dialog/share?resourceUrl=" + a + "&srcUrl=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&description=" + e);
    $(".sharebutton .bds_diandian").attr("href", "http://www.diandian.com/share?lo=" + a + "&ti=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&type=link");
    $(".sharebutton .bds_douban").attr("href", "http://www.douban.com/share/service?href=" +
      a + "&name=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&text=" + e);
    $(".sharebutton .bds_youdao").attr("href", "http://note.youdao.com/memory/?url=" + a + "&title=%e7%bb%99%e4%bd%a0%e6%8e%a8%e8%8d%90%e4%b8%80%e6%ac%be%e6%b5%b7%e5%a4%96%e7%bd%91%e7%ab%99%e5%8a%a0%e9%80%9f%e5%b7%a5%e5%85%b7&sumary=" + e);
    $("#shareurl").attr("href", a).html(a);
    showinvite(1)
  });
  $("#tableinvite").on("click", ".next", function() {
    var a = 1 * $("#tableinvite .current").html() +
      1,
      e = $("#tableinvite .count").html(),
      d = $("#tableinvite .perpage").html();
    if (a > Math.ceil(e / d)) return showerror("\u6ca1\u6709\u4e0b\u4e00\u9875\uff0c\u5df2\u7ecf\u6700\u540e\u4e86"), !1;
    showinvite(a);
    return !1
  });
  $("#tableinvite").on("click", ".previous", function() {
    var a = 1 * $(".current").html() - 1;
    if (1 > a) return showerror("\u6ca1\u6709\u4e0a\u4e00\u9875\uff0c\u5df2\u7ecf\u7b2c\u4e00\u9875\u4e86"), !1;
    showinvite(a);
    return !1
  });
  g && 1 == g.verify && $("span.verify").html("");
  $("#changepassword").submit(function() {
    var a =
      $(this),
      e = a.find('input[name="oldpassword"]').val(),
      d = a.find('input[name="password"]').val(),
      a = a.find('input[name="repassword"]').val();
    if (6 > d.length) return alert("\u5bc6\u7801\u592a\u7b80\u5355"), !1;
    if (d !== a) return alert("\u5bc6\u7801\u4e0d\u4e00\u81f4"), !1;
    if (-1 < "000000 111111 11111111 112233 123123 123321 123456 12345678 654321 666666 888888 abcdef abcabc abc123 a1b2c3 aaa111 123qwe qwerty qweasd admin password p@ssword passwd iloveyou 5201314".split(" ").indexOf(d)) return alert("\u5bc6\u7801\u592a\u7b80\u5355\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"), !1;
    $.post(f.api + "changepassword", {
      oldpassword: e,
      password: d,
      repassword: a,
      ajax: 1
    }, function(a) {
      0 == a.status ? showerror(a.info) : 1 == a.status && ($("#editPassWordModal").modal("hide"), showsuccess(a.info))
    });
    return !1
  });
  $("#feedback").submit(function() {
    var a = $(this);
    chrome.proxy.settings.get({
      incognito: !1
    }, function(e) {
      var d = a.find('input[name="title"]').val(),
        b = a.find('input[name="url"]').val(),
        c = a.find('textarea[name="content"]').val();
      if (!d && !b && !c) return showerror("\u8bf7\u586b\u5199\u53cd\u9988\u5185\u5bb9"), !1;
      var g = $("span.version").html();
      e = JSON.stringify(e);
      $.post(b.api + "feedback", {
        title: d,
        content: c,
        url: b,
        version: g,
        config: e,
        ajax: 1
      }, function(a) {
        0 == a.status ? showerror(a.info) : 1 == a.status && ($("#feedbackModal").modal("hide"), showsuccess(a.info))
      })
    });
    return !1
  });
  $("#verifybutton").click(function() {
    var a = b.email.split("@")[1],
      a = "gmail.com" == a ? "http://www.gmail.com" : "http://mail." + a;
    $(this).attr("href", a)
  });
  $("#resendmail").click(function() {
    var a = getStorage("config"),
      e = Date.parse(new Date);
    if (3E4 > e - a.sendmailTime) return showerror("\u8bf7\u95f4\u969430\u79d2\u540e\u91cd\u53d1"), !1;
    a.sendmailTime = e;
    setStorage("config", a);
    $.post(f.api + "resendmail", {
      ajax: 1
    }, function(a) {
      0 == a.status ? showerror(a.info) : 1 == a.status && ($("#verifyModal").modal("hide"), showsuccess(a.info))
    });
    return !1
  });
  $("#changemail").click(function() {
    showerror("\u6682\u4e0d\u652f\u6301\u66f4\u65b0\u90ae\u7bb1\uff0c\u8bf7\u91cd\u65b0\u6ce8\u518c\u3002");
    return !1
  });
  $(".adddomain input").blur(function() {
    var a = $(this).val(),
      a = a.toLowerCase();
    array = a.split("://");
    a = array[1] ? array[1] : array[0];
    a = a.split("/")[0];
    "www." ==
    a.substr(0, 4) && (a = a.substr(4));
    "*." == a.substr(0, 2) && (a = a.substr(2));
    "***." == a.substr(0, 4) && (a = a.substr(4));
    $(this).val(a)
  });
  $(".adddomain form").submit(function() {
    $(this).find("input").blur();
    $(this).find(".btn").click();
    return !1
  });
  $("#blacklist .adddomain .btn").click(function(a) {
    a = getStorage("data");
    var e = $("#blacklist .adddomain input").val();
    if (!a || !e) return !1;
    var d = 0;
    $.each(a, function(a, b) {
      t = "," + b + ",";
      if (-1 < t.indexOf("," + e + ",")) {
        if (1 == a || 2 == a) d = 1;
        if (3 == a || 4 == a) d = 2
      }
    });
    0 == d ? (a["2"] = a["2"] ? a["2"] +
      "," + e : e, setStorage("data", a), $.post(f.api + "black/", {
        domain: e,
        version: b.version.number,
        useragent: window.navigator.userAgent,
        ajax: 1
      }, function(a) {
        log(a)
      }), showdomainlist(), setProxy(), $("#blacklist .adddomain input").val("").focus()) : domainerror(e, d)
  });
  $("#whitelist .adddomain .btn").click(function() {
    var a = getStorage("data"),
      e = $("#whitelist .adddomain input").val();
    if (!a || !e) return !1;
    var d = 0;
    $.each(a, function(a, b) {
      t = "," + b + ",";
      if (-1 < t.indexOf("," + e + ",")) {
        if (1 == a || 2 == a) d = 1;
        if (3 == a || 4 == a) d = 2
      }
    });
    0 == d ? (a["4"] =
      a["4"] ? a["4"] + "," + e : e, $.post(f.api + "white/", {
        domain: e,
        version: b.version.number,
        useragent: window.navigator.userAgent,
        ajax: 1
      }), setStorage("data", a), showdomainlist(), setProxy(), $("#whitelist .adddomain input").val("").focus()) : domainerror(e, d)
  });
  $("#blacklist .custom").on("click", ".close", function() {
    var a = getStorage("data"),
      e = $(this).parent().attr("href").substr(7),
      d = "," + a["2"] + ",",
      d = d.replace("," + e + ",", ",");
    a["2"] = d.substr(1, d.length - 2);
    setStorage("data", a);
    showdomainlist();
    $.post(f.api + "removeblack/", {
      domain: e,
      version: b.version.number,
      useragent: window.navigator.userAgent,
      ajax: 1
    })
  });
  $("#whitelist .custom").on("click", ".close", function() {
    var a = getStorage("data"),
      e = $(this).parent().attr("href").substr(7),
      d = "," + a["4"] + ",",
      d = d.replace("," + e + ",", ",");
    a["4"] = d.substr(1, d.length - 2);
    setStorage("data", a);
    showdomainlist();
    $.post(f.api + "removewhite/", {
      domain: e,
      version: b.version.number,
      useragent: window.navigator.userAgent,
      ajax: 1
    })
  })
});

function showinvite(c) {
  var b = getStorage("data"),
    f = getStorage("config"),
    h = getStorage("url");
  Date.parse(new Date);
  if (!b || !f) return !1;
  var g = b["6"];
  $.get(h.api + "myinvi/?p=" + c + "&ajax=1", function(b) {
    if (1 == b.status) {
      var a = "";
      null != b.invi ? ($.each(b.invi, function(b, d) {
          vip = 1 < d.level ? "\u662f" : "\u5426";
          day = 1 < d.level ? "7\u5929 VIP" : "1\u5929 VIP";
          myver = 1 == g.verify ? '<span class="glyphicon glyphicon-ok text-success" aria-hidden="true" title="\u90ae\u7bb1\u5df2\u7ecf\u9a8c\u8bc1"></span>' : '<span class="glyphicon glyphicon-remove text-danger" aria-hidden="true" title="\u90ae\u7bb1\u6682\u672a\u9a8c\u8bc1"></span>';
          ver = 1 == d.verify ? '<span class="glyphicon glyphicon-ok text-success" aria-hidden="true" title="\u90ae\u7bb1\u5df2\u7ecf\u9a8c\u8bc1"></span>' : '<span class="glyphicon glyphicon-remove text-danger" aria-hidden="true" title="\u90ae\u7bb1\u6682\u672a\u9a8c\u8bc1"></span>';
          use = 1 == d.codeuse ? '<span class="btn btn-default btn-xs">\u5df2\u4f7f\u7528</span>' : 1 == d.verify ? '<span class="btn btn-primary btn-xs useinvitevip" rel="' + d.email + '">\u4f7f\u7528</span>' : '<span class="btn btn-default btn-xs" title="\u88ab\u9080\u8bf7\u7528\u6237\u6682\u672a\u901a\u8fc7\u90ae\u7bb1\u9a8c\u8bc1\uff0c\u6682\u4e0d\u53ef\u4f7f\u7528\u3002">\u5f85\u6fc0\u6d3b</span>';
          a += "<tr><td>" + f.email + " " + myver + "</td><td>" + d.email + " " + ver + "</td><td>" + vip + '</td><td><span class="blue 16font">' + day + "</span></td><td>" + use + "</td></tr>"
        }), a += '<tr><td colspan="5" class="text-center"><nav><ul class="pagination"><li><a href="" class="previous" aria-label="Previous"><span aria-hidden="true">\u4e0a\u4e00\u9875</span></a></li><li><span aria-hidden="true" style="color:#777;">\u5171<span class="count">' + b.count + '</span>\u4eba \u7b2c<span class="current">' + b.page + '</span>\u9875 <span class="perpage">' +
        b.perpage + '</span>\u4eba/\u9875</span></li><li><a href="" class="next" aria-label="Next"><span aria-hidden="true">\u4e0b\u4e00\u9875</span></a></li></ul></nav></td></tr>') : a = '<tr><td colspan="5" class="text-center">\u6682\u65e0\u9080\u8bf7\u8bb0\u5f55</td></tr>';
      0 < b.count && (a += '<tr><td colspan="5" class="text-center">\u606d\u559c\u4f60\uff0c\u6210\u529f\u9080\u8bf7<span class="count">' + b.count + "</span>\u4eba</td></tr>");
      $("#tableinvite").html(a)
    }
  })
}

function showdomainlist() {
  data = getStorage("data");
  if (!data) return !1;
  var c = data["2"],
    b = data["3"],
    f = data["4"];
  bsa = data["1"].split(",");
  $("#blacklist .system").html("");
  $.each(bsa, function(b, c) {
    $("#blacklist .system").append('<a class="list-group-item" target="_blank" href="http://' + c + '">' + c + "</a>")
  });
  $("#blacklist .custom").html("");
  c && (bca = c.split(","), $.each(bca, function(b, c) {
    $("#blacklist .custom").append('<a class="list-group-item" target="_blank" href="http://' + c + '"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>' +
      c + "</a>")
  }));
  wsa = b.split(",");
  $("#whitelist .system").html("");
  $.each(wsa, function(b, c) {
    "cn" != c ? $("#whitelist .system").append('<a class="list-group-item" target="_blank" href="http://' + c + '">' + c + "</a>") : $("#whitelist .system").append('<a class="list-group-item">*.cn</a>')
  });
  $("#whitelist .custom").html("");
  f && (wca = f.split(","), $.each(wca, function(b, c) {
    $("#whitelist .custom").append('<a class="list-group-item" target="_blank" href="http://' + c + '"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>' +
      c + "</a>")
  }))
}

function showtime() {
  var c = getStorage("data");
  if (!c) return !1;
  c = c["6"];
  if (!c) return !1;
  1 == c.level ? ($("span.level").html("\u6c38\u4e45\u514d\u8d39\u7528\u6237"), $("span.leveltips").html('<span class="label label-default">\u9650\u65f6120\u5206\u949f/\u5929</span> <span class="label label-default">\u9ad8\u901f\u4e0a\u7f51</span> <span class="label label-default">\u9650\u901f\u89c6\u9891</span>')) : 1 < c.level && (Date.parse(new Date), 2 == c.level ? $("span.level").html("VIP\u7528\u6237") : 3 == c.level ? $("span.level").html("\u5e74\u8d39VIP\u7528\u6237") :
    4 == c.level && $("span.level").html("VIP\u7528\u6237"))
}

function domainerror(c, b) {
  1 == b ? c = "\u57df\u540d<b>" + c + "</b>\u5df2\u7ecf\u5b58\u5728\u96a7\u9053\u540d\u5355\u4e2d" : 2 == b && (c = "\u57df\u540d<b>" + c + "</b>\u5df2\u7ecf\u5b58\u5728\u76f4\u8fde\u540d\u5355\u4e2d");
  showerror(c)
};