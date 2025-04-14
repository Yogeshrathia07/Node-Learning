// const sum_req = (req, res) => {
//     res.write(`<h1>Hello this page is for calculation</h1>`); // Add this line
//     const body = [];
//     req.on("data", (chunk) => {
//         body.push(chunk);
//     });
//     console.log(body);
//     req.on("end", () => {
//         const bodyStr = Buffer.concat(body).toString();
//         const paras=new URLSearchParams(bodyStr);
//         const bodyObj=Object.fromEntries(paras);
//         // const result=Number(bodyObj.first)+Number(bodyObj.second);
//         const result=bodyObj.first+bodyObj.second;
//         console.log(result);
//         // res.write(`<h1>Result: ${result}</h1>
//         //         <a href="/">Home</a><br>`);
//         return res.end();
//     });
//     return res.end(); // Add this line
// };

// module.exports = sum_req;


const sum_req = (req, res) => { 
    let body = [];
    
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString();
        console.log("Raw Body String:", bodyStr); // Debugging step

        const params = new URLSearchParams(bodyStr);
        console.log("Parsed Params:", params.toString()); // Debugging step

        const num1 = Number(params.get("num1"));
        const num2 = Number(params.get("num2"));

        console.log("num1:", num1, "num2:", num2); // Debugging step

        if (isNaN(num1) || isNaN(num2)) {
            res.write(`<h1>Error: Invalid Input</h1>
                       <a href="/">Home</a><br>`);
        } else {
            const result = num1 + num2;
            res.write(`<h1>Result: ${result}</h1>
                       <a href="/">Home</a><br>`);
        }
        res.end();
    });
};

module.exports = sum_req;
