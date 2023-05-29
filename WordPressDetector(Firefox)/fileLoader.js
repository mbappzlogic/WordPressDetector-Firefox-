function handleError(error){
  console.log(error);
}

function getSiteData(tabID){
  let currentTabData;
  let activeTabId = tabID[0].id;
  let sitesData = browser.storage.local.get('siteDataList');
  sitesData.then(function(response){
    let siteList = response.siteDataList;
    siteList.filter(function(obj){
      if(obj.id == activeTabId){
        currentTabData = obj;
      }
    });
    loadFiles(currentTabData.files);
  })
}
//To get a list of files found.


function callFiles() {
  let tabId = browser.tabs.query({currentWindow: true, active: true });
  tabId.then(getSiteData,handleError);
}

function loadFiles(filesFound) {
  //Showing the found files as a list if there are any.
  if(filesFound.length > 0){
    let orderedList = document.createElement('ol');
  for (let i = 0; i < filesFound.length; i++) {
    let listOption = document.createElement('li');
    listOption.innerHTML = filesFound[i];
    orderedList.appendChild(listOption);
  }
  let cont = document.getElementById('cont');
  cont.appendChild(orderedList);
  }
  else{
    let heading = document.getElementById('fileNames');
    heading.innerHTML = "Sorry! No Wordpress files found.";
  }
}

//Calling function 'callFiles'.
callFiles();
