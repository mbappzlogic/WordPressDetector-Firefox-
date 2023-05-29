//To get a list of files found.
function callFiles() {
  chrome.runtime.sendMessage({request: "file"}, function(response){
    loadFiles(response.response);
  });
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

