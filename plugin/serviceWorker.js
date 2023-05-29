let filesList;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  //To get current tab url.
  if(request.request == "url"){
    sendResponse({response: sender.tab.url});
  }
  //To return list of files found
  if(request.request == 'file'){
    sendResponse({response: filesList});
  }
  //To set badge text
  if(request.fileFoundCount){
    filesList = request.fileFoundCount;
    let count = request.fileFoundCount.length;
    let countText = count.toString();
    chrome.action.setBadgeText({ text: countText, tabId: sender.tab.id });
  }
});