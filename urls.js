const fs = require("fs");
const axios = require("axios");

if (process.argv.length !== 3) {
  console.error("Usage: node urls.js FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file ${filename}: ${err}`);
    process.exit(1);
  }

  const urls = data.trim().split("\n");

  urls.forEach(fetchAndSaveUrl);
});

async function fetchAndSaveUrl(targetUrl) {
  let content;
  try {
    const response = await axios.get(targetUrl);
    content = response.data;
  } catch (error) {
    console.error(`Couldn't download ${targetUrl}`);
    return;
  }

  const hostname = new URL(targetUrl).hostname;

  fs.writeFile(hostname, content, "utf8", (err) => {
    if (err) {
      console.error(`Couldn't write to ${hostname}: ${err}`);
    } else {
      console.log(`Wrote to ${hostname}`);
    }
  });
}
