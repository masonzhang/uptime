/**
 * URL Extension plugin
  */
var ejs  = require('ejs');
var express = require('express');

exports.initWebApp = function(options) {
};

exports.initMonitor = function(options) {
  options.monitor.on('pollerCreated', function(poller, check, details) {
    if (check.type !== 'http' && check.type !== 'https') return;
    var options = check.pollerParams && check.pollerParams.http_options;
    if (!options) return;
    // add the custom options to the poller target
    for (var key in options) {
      poller.target.href = ejs.render(poller.target.href);
    }
    return;
  });

};
