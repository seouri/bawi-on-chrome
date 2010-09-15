function updateBadge() {
  setBadge(unreadCount);
  // http://github.com/RobertFischer/JQuery-PeriodicalUpdater
  $.PeriodicalUpdater('http://www.bawi.org/board/unreadcount.cgi', { 
    method: 'get',
    data: '',
    minTimeout: 60000,       // starting value for the timeout in milliseconds
    maxTimeout: 60000,       // maximum length of time between requests
    multiplier: 1,          // if set to 2, timerInterval will double each time the response hasn't changed (up to maxTimeout)
    type: 'text',           // response type - text, xml, json, etc.  See $.ajax config options
    maxCalls: 0,            // maximum number of calls. 0 = no limit.
    autoStop: 0             // automatically stop requests after this many returns of the same data. 0 = disabled.
  }, function(data) {
    eval(data);
    setBadge(unreadCount);
  });
}

function setBadge(count) {
  var badgeCount = count == 0 ? "" : count.toString();
  chrome.browserAction.setBadgeBackgroundColor({color:[192, 0, 0, 255]});
  chrome.browserAction.setBadgeText({text: badgeCount});
}