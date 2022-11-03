
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const slackUsername = "TitiMike"
const PORT = 3000

const operationTypes = ["addition", "subtraction", "multiplication", "add", "sub", "mul"];

app.post('/', (req, res) => {
    let x = req.body.x;
    let y = req.body.y;
    let operation = req.body.operation_type.toLowerCase();

    if(isNaN(x) || isNaN(y)){
        res.status(400).send("Numbers required for x and y fields");
    } else if(!operationTypes.includes(operation)){
        res.status(400).send("Please select a valid operation");
    } else {
        let result
        switch(operation){
            case "addition":
                result = x + y;
                break;
            case "subtraction":
                result = x - y;
                break;
            case "multiplication":
                result = x * y;
                break;
            case "add":
                result = x + y;
                break;
            case "subt":
                result = x - y;
                break;
            case "mul":
                result = x * y;
                break;
            default:
                result = null; 
        }
        const myResponse = {
            slackUsername: slackUsername,
            result: result,
            operation_type: req.body.operation_type
        }
        res.status(201).json(myResponse);
    }
})


app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
  })