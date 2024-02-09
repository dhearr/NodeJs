const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error: File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  const url = req.url;
  if (url === "/about") {
    renderHTML("./about.html", res);
  } else if (url === "/contact") {
    renderHTML("./contact.html", res);
  } else {
    renderHTML("./index.html", res);
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
