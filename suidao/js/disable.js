$(document).ready(function(a) {
  var c = getStorage("conflict");
  if (c && 0 < c.length) {
    var d = "";
    a.each(c, function(a, b) {
      d += '<li id="' + b.id + '" class="list-group-item"><img src="' + b.icons[0].url + '" width="24"> ' + b.name + "</li>"
    });
    a(".conflict").html(d);
    a(".logo img").addClass("gray")
  } else window.location.replace("popup.html");
  a("#disableconflict").click(function() {
    a.each(c, function(c, b) {
      chrome.management.setEnabled(b.id, !1, function() {
        a("#" + b.id).remove()
      })
    });
    checkconflict();
    window.location.reload()
  });
  a("#removeconflict").click(function() {
    a.each(c,
      function(c, b) {
        chrome.management.uninstall(b.id, function() {
          a("#" + b.id).remove()
        })
      });
    checkconflict();
    window.location.reload()
  })
});