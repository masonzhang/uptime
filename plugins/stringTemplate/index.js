/**
 * URL Extension plugin
  */
var ejs  = require('ejs');
var express = require('express');
// var querystring = require('querystring'); dont use querystring, bugs there
var url = require('url')

exports.initWebApp = function(options) {
};

exports.initMonitor = function(options) {
  options.monitor.on('pollerCreated', function(poller, check, details) {
    if (check.type !== 'http' && check.type !== 'https') return;
    poller.target = url.parse(ejs.render(unescape(poller.target.href)));

    var pattern = check.pollerParams && check.pollerParams.match;
    if (pattern) {
        check.pollerParams.match = ejs.render(check.pollerParams.match);
    }
  });

};
