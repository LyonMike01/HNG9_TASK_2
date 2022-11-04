const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const slackUsername = "TitiMike"
const PORT = process.env.PORT || 3000

app.post("/", (req, res) => {
  let result = "0";
  let operation_type;
  let x;
  let y;
  const { operation_type: op, x: nx, y: ny } = req.body;
  if (op.split(" ").length > 1) {
    if (op.includes("add")) {
      operation_type = "addition";
    } else if (op.includes("sub") || op.includes("minus")) {
      operation_type = "subtraction";
    } else if (op.includes("multiply") || op.includes("times")) {
      operation_type = "multiplication";
    }
    let arr = op.split(" ");
    arr = arr.filter((i) => !isNaN(parseInt(i)));
    if (arr.length === 2) {
      console.log(arr);
      x = arr[0];
      y = arr[1];
    }
  } else {
    operation_type = op;
    x = nx;
    y = ny;
  }

  x = parseInt(x);
  y = parseInt(y);
  switch (operation_type) {
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
  }
  return res
    .status(200)
    .json({ slackUsername: slackUsername, result, operation_type });
});
app.listen(PORT || 8000, () => console.log(`server running on ${PORT}`));