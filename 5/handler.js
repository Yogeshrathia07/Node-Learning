const sum_req=require('./calculate-result');
const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.write(`<h1>Calculator</h1>
            <a href="/calculator">Calculator</a><br>`);
    return res.end();
  } else if (req.url === "/calculator") {
    res.write(`<h1>Calculator</h1>
            <form action="/calculate" method="POST">
                <input type="text" name="num1" placeholder="First number">
                <input type="text" name="num2" placeholder="Second number">
                <button type="submit">Calculate</button>
            </form>
            <a href="/">Home</a><br>`);
    return res.end();
  }else if(req.url==="/calculate" && req.method==="POST"){
    return sum_req(req,res);
  }else{
    res.write(`<h1>404 Not Found</h1>
            <a href="/">Home</a><br>`);
    return res.end();
  }
};

module.exports = requestHandler;
