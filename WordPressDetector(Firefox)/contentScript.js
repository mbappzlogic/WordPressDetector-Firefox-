//To get active tab URL.
function getCurrentTab() {
  console.log("content script called!");
  let url = window.location;
  let urlObj = new URL(url);
  let urlOrigin = urlObj.origin;
  identify(urlOrigin);
}

function identify(url) {
  var filesToCheck = [
    'index.php',
    'license.txt',
    'wp-activate.php',
    'xmlrpc.php',
    'wp-content/uploads/',
    'wp-includes/',
    'wp-json/oembed/',
    'wp-admin/login.php',
    'wp-admin/wp-login.php',
    'wp-admin/',
    'login.php',
    'wp-login.php',
  ];
  let file;
  let filesFound = [];
  let filesNotFound = [];

  for (var i = 0; i < filesToCheck.length; i++) {
    file = url + "/" + filesToCheck[i];
    console.log(file);
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', file, false);
    xhr.send();

    // Check if the request was successful
    if (xhr.status == 200) {
      // If the file is available, then push the name to the variable.
      filesFound.push(file);
    } else {
      filesNotFound.push(file);
    }
  }
  //Sending found files list.
  browser.runtime.sendMessage({fileCount: filesFound});
}
//Calling function.
window.onload = getCurrentTab;