const fs = require("fs");

fs.appendFile("dist/_redirects", "/*    /index.html   200", function(err) {
  if (err) throw err;
  console.log("Saved!");
});
