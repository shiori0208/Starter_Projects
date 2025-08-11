const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

//port 80 and 443 are already used to make web requests
//22 is used for ssh request
const port = 3000;

const server = http.createServer((req, res) => {
    const filepath = path.join(__dirname, req.url === '/' ? "index.html" : req.url ); 
    //absolute path of where files are
    //dirname gives access to current directory

    const extName = path.extname(filepath).toLowerCase();
    //.extname gives extension name

    const mimeTypes = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'text/png'
    }; //comp has to be told which file types are allowed
}); 

const contentType = mimeTypes[path.extname] || 'application/octet-stream'; 

//five types of responses
//informational, successful, redirection, client error, server error // 100,200,300,400,500-599 respc.

fs.readFile(filePath, (err, content) => {
    if(err) {
        if (err.code === "ENOENT") {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("404: File not found BRUH");        
            
        }

    }
    else {
        res.writeHead(200, {'Content-Type': content-type});
        res.end(content, 'utf-8'); 
    }
})

//libuv listens to http, binds req and gives you object 

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
});

