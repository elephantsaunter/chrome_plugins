// Chrome Proxy helper
// by zhouzhenster@gmail.com
// https://raw.github.com/henices/Chrome-proxy-helper/master/javascripts/options.js


function loadProxyData() {

  $(document).ready(function() {

      var proxySetting = JSON.parse(localStorage.proxySetting);

      $('#http-host').val(proxySetting['http_host'] || "");
      $('#http-port').val(proxySetting['http_port'] || "");
      $('#pac-type').val(proxySetting['pac_type'] || "file://");
      $('#bypasslist').val(proxySetting['bypasslist'] || "");
      $('#proxy-rule').val(proxySetting['proxy_rule'] || "singleProxy");
      $('#username').val(proxySetting['auth']['user'] || "");
      $('#password').val(proxySetting['auth']['pass'] || "");

      var type = proxySetting['pac_type'].split(':')[0];
      $('#pac-script-url').val(proxySetting['pac_script_url'][type] || "");

      if (proxySetting['socks_type'] == 'socks5') {
        $('#socks5').attr('checked', true);
      }

      if (proxySetting['internal'] == 'china') {
          $('#use-china-list').attr('checked', true);
      }

  });

}


/**
 * load old proxy info
 */
function loadOldInfo() {
    var mode, url, rules, proxyRule;
    var type, host, port;
    var ret, pacType, pacScriptUrl;

    chrome.proxy.settings.get({'incognito': false},
    function(config) {

        mode = config["value"]["mode"];
        rules = config['value']['rules'];

        if (rules) {
            if (rules.hasOwnProperty('singleProxy')) {
                proxyRule = 'singleProxy';
            } else if (rules.hasOwnProperty('proxyForHttp')) {
                proxyRule = 'proxyForHttp';
            } else if (rules.hasOwnProperty('proxyForHttps')) {
                proxyRule = 'proxyForHttps'
            } else if (rules.hasOwnProperty('proxyForFtp')) {
                proxyRule = 'proxyForFtp';
            }

            $('#proxy-rule').val(proxyRule);
        }

        if (mode == "direct" ||
            mode == "system" ||
            mode == "auto_detect" ) {

            return;

        } else if (mode == "pac_script") {

            // may be need to deal with pac data
            url = config.value.pacScript.url
            if (url) {
                ret = url.split('://');
                pacType = ret[0];
                pacScriptUrl = ret[1];

                $('#pac-type').val(pacType + '://');

                // fix pacScriptUrl on Windows platform
                if (pacType == 'file') {
                    if (pacScriptUrl.substring(0, 1) != '/')
                        pacScriptUrl = '/' + pacScriptUrl;
                }

                $('#pac-script-url').val(pacScriptUrl);
            }

        } else if (mode == "fixed_servers") {

            // we are in manual mode
            type = rules[proxyRule]['scheme'];
            host = rules[proxyRule]['host'];
            port = rules[proxyRule]['port'];
            bypassList = rules.bypassList;

            if (type == 'http') {
                $('#http-host').val(host);
                $('#http-port').val(port);
            } else {
                if (type == 'socks5') {
                    $('#socks5').attr('checked', true);
                }

                $('#socks-host').val(host);
                $('#socks-port').val(port);
            }

            if (bypassList)
                $('#bypasslist').val(bypassList.join(','));
        }
    });

    localStorage.firstime = 1;
}

/**
 * get chrome browser proxy settings 
 * and display on the options page
 *
 */
function getProxyInfo(callback) {

    var proxyInfo;
    var proxySetting = JSON.parse(localStorage.proxySetting);
    var mode, rules, proxyRule;

    chrome.proxy.settings.get({'incognito': false},
    function(config) {
        // console.log(JSON.stringify(config));
        mode = config['value']['mode'];
        rules = config['value']['rules'];

        if (rules) {
            if (rules.hasOwnProperty('singleProxy')) {
                proxyRule = 'singleProxy';
            } else if (rules.hasOwnProperty('proxyForHttp')) {
                proxyRule = 'proxyForHttp';
            } else if (rules.hasOwnProperty('proxyForHttps')) {
                proxyRule = 'proxyForHttps'
            } else if (rules.hasOwnProperty('proxyForFtp')) {
                proxyRule = 'proxyForFtp';
            }

        }

        if (mode == 'direct' ||
            mode == 'system' ||
            mode == 'auto_detect' ) {
            proxyInfo = mode;
        } else if (mode == "pac_script") {
            var url = config['value']['pacScript']['url'];
            if (url)
                proxyInfo = 'pac_url';
            else 
                proxyInfo = 'pac_data';
        } else if (mode == 'fixed_servers')
            proxyInfo = rules[proxyRule]['scheme'];

        localStorage.proxyInfo = proxyInfo;
        callback(proxyInfo);
    });
}

/**
 * get uniq array
 *
 */
function uniqueArray(arr) {
    var hash = {}, result = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
            hash[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * @brief use proxy info to set proxy
 *
 */
function reloadProxy() {

    var type, auto, arrayString;
    var proxy = {type: '', host: '', port: ''};
    var config = {
        mode: '',
        pacScript: {},
        rules: {}
    };

    var proxySetting = JSON.parse(localStorage.proxySetting);

    getProxyInfo(function(info) {

        if (typeof info === 'undefined' ||
           info == 'direct' || info == 'system' ) {
            return;
        }

        if (info == 'pac_url') {
            var pacType = proxySetting['pac_type'];
            var proto = pacType.split(':')[0];

            config.mode = 'pac_script';
            config["pacScript"]["url"] = pacType +
                proxySetting['pac_script_url'][proto];

        } else {

            switch(info) {

                case 'http':
                    proxy.type = 'http';
                    proxy.host = proxySetting['http_host'];
                    proxy.port = parseInt(proxySetting['http_port']);
                    break;
            }

            var rule = proxySetting['proxy_rule'];
            var chinaList = JSON.parse(localStorage.chinaList);
            var bypasslist = proxySetting['bypasslist'];

            if (proxySetting['internal'] == 'china') {
                bypasslist = chinaList.concat(bypasslist.split(','));
            } else {
                bypasslist =  bypasslist ? bypasslist.split(',') : ['<local>'];
            }

            config.mode = "fixed_servers";
            config.rules.bypassList = uniqueArray(bypasslist);
            config["rules"][rule] = {
                scheme: proxy.type,
                host: proxy.host,
                port: parseInt(proxy.port)
            };
        }

        //console.log(JSON.stringify(config));

        chrome.proxy.settings.set({
            value: config,
            scope: 'regular'}, function() {})
    });

}

/**
 * button id save click handler
 *
 */
function save() {

  var proxySetting = JSON.parse(localStorage.proxySetting);
  proxySetting['http_host'] = $('#http-host').val() || "";
  proxySetting['http_port'] = $('#http-port').val() || "";
  proxySetting['pac_type'] = $('#pac-type').val() || "";
  proxySetting['bypasslist'] = $('#bypasslist').val() || "";
  proxySetting['proxy_rule'] = $('#proxy-rule').val() || "";
  proxySetting['auth']['user'] = $('#username').val() || "";
  proxySetting['auth']['pass'] = $('#password').val() || "";

  if ($('#use-pass').is(':checked'))
      proxySetting['auth']['enable'] = 'y';
  else
      proxySetting['auth']['enable'] = '';

  if ($('#use-china-list').is(':checked')) {
      proxySetting['internal'] = "china";
  }
  else {
      proxySetting['internal'] = "";
  }

  var pacType = $('#pac-type').val().split(':')[0];
  var pacScriptUrl = $('#pac-script-url').val() || '';

  // fix pacScriptUrl on windows platform
  if (pacType == 'file' && pacScriptUrl) {
      if (pacScriptUrl.substring(0, 1) != '/')
          pacScriptUrl = '/' + pacScriptUrl;
  }

  proxySetting['pac_script_url'][pacType] = pacScriptUrl;

  var settings = JSON.stringify(proxySetting);
  //console.log(settings);

  localStorage.proxySetting = settings;
  reloadProxy();
  loadProxyData();

  // sync settings to google cloud
  chrome.storage.sync.set({'proxySetting' : settings}, function() {});
}


document.addEventListener('DOMContentLoaded', function () {

    $('#btn-save').click(function() {
        save();
    });

    $('#btn-cancel').click(function() {
        location.reload();
    });

    $('#socks5').change(function() {
        $('#socks4').attr('checked', false);
    });

    $('#diagnosis').click(function() {
        chrome.tabs.create({url: 'chrome://net-internals/#proxy'});
    });

    $('input,textarea,#proxy-rule').change(
        function() { save(); });

    var proxySetting = JSON.parse(localStorage.proxySetting);
    $('#pac-type').change(function() {
        var type = $('#pac-type').val().split(':')[0];
        $('#pac-script-url').val(proxySetting['pac_script_url'][type]);
        save();
    });

});



if (!localStorage.firstime)
    loadOldInfo();
else
    loadProxyData();

getProxyInfo(function(info) {});
