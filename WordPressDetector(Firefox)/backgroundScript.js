let filesList;
let siteDataList = [];
browser.browserAction.setBadgeText({ text: '' });
function handleRequest(request, sender, sendResponse) {
  console.log(sender);
  if (request.fileCount) {
    let siteData = {
      id: '',
      files: '',
      filesCount: '',
    };
    filesList = request.fileCount;
    let count = request.fileCount.length;
    let countText = count.toString();
    siteData.id = sender.tab.id;
    siteData.files = request.fileCount;
    siteData.filesCount = request.fileCount.length;
    siteDataList.push(siteData);
    browser.storage.local.set({ siteDataList });

    browser.browserAction.setBadgeText({
      text: countText,
      tabId: sender.tab.id,
    });
  }
}

browser.runtime.onMessage.addListener(handleRequest);
