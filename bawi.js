function updateBadge() {
  initBadge();
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
  console.log('update badge');  
}

function setBadge(count) {
  if (count == -1) {
    chrome.browserAction.setIcon({path: "icon16-gray.png"})
  } else {
    var badgeCount = count == 0 ? "" : count.toString();
    chrome.browserAction.setIcon({path: "icon16.png"})
    chrome.browserAction.setBadgeBackgroundColor({color:[192, 0, 0, 255]});
    chrome.browserAction.setBadgeText({text: badgeCount});
  }
  console.log('set badge');
}

function initBadge() {
  $.getScript('http://www.bawi.org/board/unreadcount.cgi', function(){
    console.log('init badge: ' + unreadCount.toString());
    setBadge(unreadCount);
  });
}

function post_to_board(info, tab) {
  var board = localStorage["default_board_for_article"];
  if (board) {
    var write = board.replace(/read.cgi/, "write.cgi");
    var option = {url: write + ';title=' + escape(tab.title) + ';url=' + escape(tab.url)}
    chrome.tabs.create(option, function(newtab) {
      chrome.tabs.executeScript(newtab.id, {file: "post.js"});
    });
  }
}

function post_to_article(info, tab) {
  var article = localStorage["default_article_for_comment"];
  if (article) {
    var option = {url: article + ';comment_title=' + escape(tab.title) + ';comment_url=' + escape(tab.url)}
    chrome.tabs.create(option, function(newtab) {
      chrome.tabs.executeScript(newtab.id, {file: "comment.js"});
    });
  } else {
    alert("천년바위 확장 프로그램 아이콘을 마우스 오른쪽 클릭해서 옵션 메뉴에 짧은답글을 올릴 글의 주소를 저장해 주세요.");
  }
}