var fs = require("fs");
var path = require("path");

var android = process.argv.includes("android")
var ios = process.argv.includes("ios")


var bundleFile = "bundle.js";
if (android) {
    bundleFile = "bundle.android.js";
} else if (ios) {
    bundleFile = "bundle.ios.js";
} else {
    throw new Error("FAIL: android/ios parameter required.");
}

function checkFile() {
    var filePath = path.join(__dirname, "..", "app", bundleFile)
    if (fs.existsSync(filePath)) {
        return true;
    } else {
        return false;
    }
}

var maxTries = 60;
var currentTry = 0;

setInterval(function() {
    if (currentTry > maxTries) {
        console.log("Timeout waiting for bundle JS file. Giving up.");
        process.exit(1);
    }

    if (checkFile()) {
        process.exit(0);
    }

    currentTry++;
}, 1000);
