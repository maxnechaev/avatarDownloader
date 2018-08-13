
var args = process.argv.slice(2);

var request = require("request");
var secrets = require('./secrets');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
 var options = {
   url: "http://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors", //api.github.com/repos/” + repoOwner + “/” + repoName + “/contributors”,
   headers: {
     "User-Agent": "request",
   }
 };
 request(options, function(err, res, body) {
   cb(err, body);
 });
}

function avatarDownloader(url, filePath) {
  request.get(url)
  .on("error", function (err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
if(err){
  console.log("Errors:", err);
} else {
  var contribList = JSON.parse(result);
  contribList.forEach(function(contributor) {
    return avatarDownloader(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg");
});
  console.log("Download complete");
}
});
