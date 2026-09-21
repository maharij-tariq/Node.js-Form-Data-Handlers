const fs = require("node:fs");
const http = require("node:http");

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    fs.writeFile;
    if (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("<h1>404 Page Not Found</h1>");
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } else if (req.url === "/submit") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const formdata = new URLSearchParams(body);
        const username = formdata.get('username');
          const password = formdata.get('password');
          console.log(username,password);
          const data = `username: ${username}, \npassword: ${password}`;
          fs.writeFile('message.txt',data,(err)=>{
            if(err){
              res.writeHead(500,{'Content-Type':'text/plain'})
              res.end('Internal server error')
            }
      // fs.writeFile('data.txt',body,(err) =>{
      //   if(err){
      //     res.statusCode = 500;
      //     res.writeHead(500,{'Content-Type':'text/plain'})
      //     res.end("Internal server error")
      //   }
        res.writeHead(200,{'Content-Type': 'text/plain'})
        res.end('Form data saved successfully')
      })
      });    
    } 
  });
});
server.listen(7002, () => {
  console.log("server is running on port 7002");
});
