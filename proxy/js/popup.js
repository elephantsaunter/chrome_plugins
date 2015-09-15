// Chrome Proxy helper
// popup.js
// https://raw.github.com/henices/Chrome-proxy-helper/master/javascripts/popup.js

/**
 * @fileoverview
 *
 * @author: zhouzhenster@gmail.com
 */

var proxySetting = JSON.parse(localStorage.proxySetting);
var proxyRule = proxySetting['proxy_rule'];
var bypasslist = proxySetting['bypasslist'];
var httpHost = proxySetting['http_host'];
var httpPort = proxySetting['http_port'];
var httpsHost = proxySetting['https_host'];
var httpsPort = proxySetting['https_port'];
var chinaList = JSON.parse(localStorage.chinaList);

if (proxySetting['internal'] == 'china') {
  bypasslist = chinaList.concat(bypasslist.split(','));
} else
  bypasslist = bypasslist ? bypasslist.split(',') : ['<local>'];


/**
 * set help message for popup page
 *
 */
function add_li_title() {
  var _http, _https;

  if (httpHost && httpPort) {
    _http = 'http://' + httpHost + ':' + httpPort;
    $('#http-proxy').attr('title', _http);
  }
  if (httpsHost && httpsPort) {
    _https = 'https://' + httpsHost + ':' + httpsPort;
    $('#https-proxy').attr('title', _https);
  }
}

/**
 * set popup page item blue color
 *
 */
function color_proxy_item() {
  var mode, rules, proxyRule, scheme;

  chrome.proxy.settings.get({'incognito': false},
    function (config) {
      //console.log(JSON.stringify(config));
      mode = config['value']['mode'];
      rules = config['value']['rules'];
      console.log("config", config);
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

      if (mode == 'direct') {
        $('#direct-proxy').addClass('selected');
      }
      else {
        scheme = rules[proxyRule]['scheme'];

        if (scheme == 'http') {
          $('#http-proxy').addClass('selected');
        }
        else if (scheme == 'https') {
          $('#https-proxy').addClass('selected');
        }
      }
    });
}

/**
 * set the icon on or off
 *
 */
function iconSet(str) {

  var icon = {
    path: 'images/logo_128.png'
  };
  if (str == 'off') {
    icon['path'] = 'images/logo_off_128.png';
  }
  chrome.browserAction.setIcon(icon);
}

function proxySelected(str) {
  var id = '#' + str;
  $('li').removeClass('selected');
  $(id).addClass('selected');
}

/**
 * set http proxy
 *
 */
function setProxy() {
  var protocal = $(this).attr('id');
  console.log(protocal);
  var config = {};
  if (protocal === 'direct-proxy') {
    config = {mode: 'direct'};
  }
  else {
    config = {
      mode : 'fixed_servers',
      rules: {
        bypassList: bypasslist
      }
    };
    config['rules'][proxyRule] = {
      scheme: protocal == 'http-proxy' ? 'http' : 'https',
      host  : httpHost,
      port  : parseInt(httpPort)
    };
  }

  if (!httpHost) return;

  console.log("set Proxy success", proxyRule);
  chrome.proxy.settings.set(
    {value: config, scope: 'regular'},
    function () {
    });

  if (protocal === 'direct-proxy') {
    iconSet('off');
    proxySelected('direct-proxy');
  }
  else {
    iconSet('on');
    proxySelected('http-proxy');
  }
}


chrome.proxy.onProxyError.addListener(function (details) {
  console.error(details.error);
});


document.addEventListener('DOMContentLoaded', function () {
  $('#http-proxy').click(setProxy);
  $('#direct-proxy').click(setProxy);

  $('[data-i18n-content]').each(function () {
    var message = chrome.i18n.getMessage(this.getAttribute('data-i18n-content'));
    if (message)
      $(this).html(message);
  });

});

$(document).ready(function () {
  color_proxy_item();
  add_li_title();
});


