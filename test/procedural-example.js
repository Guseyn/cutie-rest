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

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    response.writeHead(
      200, 'ok',  {
        'Content-Type': 'text/plain' 
      }
    );
    response.write('content');
    response.end(` ... is delivered => ${body}`);

  });
}).listen(4201);