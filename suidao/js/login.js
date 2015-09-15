$(document).ready(function() {
  var d = getStorage("url");
  d ? (ajaxGetConfig(!1), $("#loginform").submit(function() {
      var c = $(this),
        b = getStorage("config"),
        a = c.find('input[name="email"]').val(),
        e = c.find('input[name="password"]').val(),
        h = c.find('input[name="repassword"]').val(),
        g = c.find('input[name="fmcode"]').val();
      if (g && 6 != g.length) return showerror("\u9080\u8bf7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e"), c.find('input[name="fmcode"]').val(""), !1;
      if (a && h) {
        var f = a.split("@")[1];
        if (-1 == "qq.com;vip.qq.com;163.com;126.com;gmail.com;hotmail.com;outlook.com;sina.com;sina.cn;yahoo.com;yahoo.com.cn;yahoo.cn;live.com;live.cn;163.net;263.net  ;yeah.net;mail.com;msn.com;aol.com;inbox.com;21cn.com;sohu.com;tom.com;etang.com;eyou.com;56.com;sogou.com;chinaren.com;vip.163.com;139.com;188.com;foxmail.com;icloud.com;aliyun.com;189.cn".split(";").indexOf(f) &&
          !window.confirm("\u8bf7\u786e\u8ba4\u4f60\u7684\u90ae\u7bb1" + a + "\u662f\u5426\u6b63\u786e\uff1f\n" + f + "\u5e76\u975e\u5e38\u89c4\u90ae\u7bb1\u540e\u7f00\uff0c\u53ef\u80fd\u65e0\u6cd5\u63a5\u6536\u6fc0\u6d3b\u90ae\u4ef6\u3002")) return !1
      }
      $("#msg").show().html('<div class="alert alert-success text-center" role="alert">\u8bf7\u7a0d\u540e\u2026\u2026</div>');
      chrome.management.get(thisextensionid, function(f) {
        $.ajax({
          url: d.api + "login",
          data: {
            email: a,
            password: e,
            repassword: h,
            fmcode: g,
            version: f.version,
            useragent: window.navigator.userAgent,
            ajax: 1
          },
          type: "post",
          dataType: "json",
          success: function(a) {
            0 == a.status && "\u7528\u6237\u6682\u672a\u6ce8\u518c" == a.info ? ($(".showlogintips").html("\u6ce8\u518c"), c.find('input[name="repassword"]').attr("placeholder") || c.find('input[name="password"]').parent().after('<div class="input-group mt10"><span class="input-group-addon">\u91cd&nbsp;&nbsp;&nbsp;\u590d</span><input type="password" name="repassword" class="form-control" placeholder="\u8bf7\u91cd\u590d\u5bc6\u7801" required></div>\t\t\t<div class="input-group mt10"><span class="input-group-addon">\u9080\u8bf7\u7801</span><input type="text" name="fmcode" class="form-control" placeholder="\u8bf7\u8f93\u5165\u9080\u8bf7\u7801\u6216\u7559\u7a7a"></div>'),
              $("#msg").html(""), "" !== b.fmcode ? $.get(d.api + "fmcode/?ajax=1", function(a) {
                b.fmcode = a.code;
                setStorage("config", b);
                c.find('input[name="fmcode"]').val(b.fmcode)
              }) : c.find('input[name="fmcode"]').val(b.fmcode)) : 0 == a.status ? $("#msg").html('<div class="alert alert-danger" role="alert"><b>\u9519\u8bef</b> ' + a.info + "</div>").show("slow").delay(1500).fadeOut("slow", function() {
              $("#msg").html("")
            }) : 1 == a.status && (b.mid = a.mid, b.email = a.email, b.open = "on", setStorage("config", b), $.get(d.api + "index/?ajax=1", function(a) {
              if (1 ==
                a.status) {
                setStorage("data", a);
                chrome.browserAction.setIcon({
                  path: "img/icon.png"
                });
                if (1 == a["6"].level) {
                  a = (new Date).Format("yyyy-M-d");
                  var b = getStorage("second");
                  null == b && (b = {});
                  isNaN(b[a]) || (b[a] = null);
                  if (null == b[a]) {
                    var c = new Base64;
                    b[a] = c.encode(allsecond);
                    setStorage("second", b)
                  }
                }
                chrome.extension.sendMessage({
                  action: "checklevel"
                }, function(a) {});
                setProxy();
                a = window.location.hash;
                window.location.href = "#popup" == a ? "popup.html" : "#option" == a ? "option.html" : "option.html#userlevel"
              } else 0 == a.status && logout(!0)
            }))
          },
          error: function(a) {
            clearStorage("data");
            clearStorage("config");
            clearStorage("url");
            window.location.reload()
          }
        })
      });
      return !1
    }), $("#reg").click(function() {
      var c = $("#loginstatus").val(),
        b = $("#loginform");
      "login" == c ? ($(".showlogintips").html("\u6ce8\u518c"), b.find('input[name="repassword"]').attr("placeholder") || (b.find('input[name="password"]').parent().after('<div class="input-group mt10"><span class="input-group-addon">\u91cd&nbsp;&nbsp;&nbsp;\u590d</span><input type="password" name="repassword" class="form-control" placeholder="\u8bf7\u91cd\u590d\u5bc6\u7801" required></div>\t\t\t<div class="input-group mt10"><span class="input-group-addon">\u9080\u8bf7\u7801</span><input type="text" name="fmcode" class="form-control" placeholder="\u8bf7\u8f93\u5165\u9080\u8bf7\u7801\u6216\u7559\u7a7a"></div>'),
        b.find('input[name="email"]').attr("placeholder", "\u8bf7\u8f93\u5165\u771f\u5b9e\u90ae\u7bb1\uff0c\u987b\u9a8c\u8bc1")), $("#reg").html("\u767b\u5f55"), $("#loginstatus").val("reg")) : "reg" == c && ($(".showlogintips").html("\u767b\u5f55"), b = $("#loginform"), b.find('input[name="repassword"]').parent().remove(), b.find('input[name="fmcode"]').parent().remove(), $("#reg").html("\u514d\u8d39\u6ce8\u518c"), $("#loginstatus").val("login"), b.find('input[name="email"]').attr("placeholder", "\u8bf7\u8f93\u5165\u90ae\u7bb1"));
      var a = getStorage("config");
      null === a && (a = {});
      "" !== a.fmcode ? $.get(d.api + "fmcode/?ajax=1", function(c) {
        a.fmcode = c.code;
        setStorage("config", a);
        b.find('input[name="fmcode"]').val(a.fmcode)
      }) : b.find('input[name="fmcode"]').val(a.fmcode);
      return !1
    }),
    $("#getpassword").submit(function() {
      var c = $(this),
        b = c.find('input[name="email"]').val(),
        a = c.find('input[name="code"]').val(),
        e = c.find('input[name="password"]').val(),
        c = c.find('input[name="repassword"]').val();
      if (!a || 4 !== a.length) return alert("\u9a8c\u8bc1\u7801\u4e0d\u6b63\u786e"), !1;
      if (6 > e.length) return alert("\u5bc6\u7801\u592a\u7b80\u5355"), !1;
      if (e !== c) return alert("\u5bc6\u7801\u4e0d\u4e00\u81f4"), !1;
      if (-1 < "000000 111111 11111111 112233 123123 123321 123456 12345678 654321 666666 888888 abcdef abcabc abc123 a1b2c3 aaa111 123qwe qwerty qweasd admin password p@ssword passwd iloveyou 5201314".split(" ").indexOf(e)) return alert("\u5bc6\u7801\u592a\u7b80\u5355\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"), !1;
      $.post(d.api + "getpassword", {
          email: b,
          code: a,
          password: e,
          repassword: c,
          ajax: 1
        },
        function(a) {
          0 == a.status ? showerror(a.info) : 1 == a.status && showsuccess(a.info)
        });
      return !1
    }), $("#getpassword").on("click", ".sendemail", function() {
      var c = $(this).parents("form"),
        b = c.find('input[name="email"]').val();
      if (!b) return alert("\u8bf7\u8f93\u5165\u90ae\u7bb1"), !1;
      $.get(d.api + "getpasscode/?email=" + b + "&ajax=1", function(a) {
        0 == a.status ? alert(a.info) : 1 == a.status && (c.find("a.sendemail").addClass("disabled"), alert(a.info))
      });
      return !1
    }), $('#getpassword input[name="code"]').on("blur", function() {
      $(this).val($.trim($(this).val()))
    })) :
    ($("body").html(""), showsuccess("\u7cfb\u7edf\u914d\u7f6e\u4e2d\uff0c\u8bf7\u7a0d\u540e\u2026\u2026"), $.each(proxyip, function(c, b) {
      $.get("http://" + b + "/config", function(a) {
        a = JSON.parse(a);
        a.serverurl && (d = {}, d.api = a.serverurl, d.www = a.spreadurl, setStorage("url", d), window.location.reload())
      })
    }))
});