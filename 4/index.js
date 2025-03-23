const http = require("http");

const server = http.createServer((req, res) => {
  // res.end('Hello World');
  if(req.url === '/home'){
    res.write('<h1>Welcome to Home Page</h1>');
    return res.end();
  } else if(req.url==='/men')
  {
    res.write('<h1>Welcome to mens page</h1>');
    return res.end();
  }
  else if(req.url==='/women')
  {
    res.write('<h1>Welcome to womens page</h1>');
    return res.end();
  }
  else if(req.url==='/kids')
  {
    res.write('<h1>Welcome to kids page</h1>');
    return res.end();
  }
  else if(req.url==='/cart')
  {
    res.write('<h1>Welcome to cart page</h1>');
    return res.end();
  }
//   else{
//     res.write('<h1>404 Page Not Found</h1>');
//     res.end();
//   } 

  res.write(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yogesh</title>
</head>
<body>
    <head>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/cart">Cart</a></li>
        </ul>
    </head>
</body>
</html>`);
return res.end();
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
