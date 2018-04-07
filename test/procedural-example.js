const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body);

    response.on('error', (err) => {
      console.error(err);
    });

    let content = {headers, method, url, body};

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    response.writeHead(
      200, 'ok',  {
        'Content-Type': 'text/plain' 
      }
    );
    response.write('content');
    response.end(` ... is delivered => ${content}`);
     
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  
  });
}).listen(4201);
