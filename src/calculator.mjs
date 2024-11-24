import http from "node:http";
import { operations } from "./config/operations.mjs";
import CalculatorView from "./view/CalculatorView.mjs";
import CalculatorService from "./service/CalculatorService.mjs";
const server = http.createServer();
const PORT = 3500;
const wrongOperandsStr = "wrong operands";
const methodUnsupportedStr = "method unsupported";
server.listen(PORT, () =>
  console.log(`server is listening on port ${server.address().port}`)
);
new CalculatorService(server, operations);
const view = new CalculatorView();

server.on("request", (req, resp) => {
  resp.setHeader("content-type", "text/html");
  const urlTokens = req.url.split("/");
  const calcMethod = urlTokens[1];
  if (!operations.get(calcMethod)) {
    errorMessageValidationTokens(`${calcMethod} ${methodUnsupportedStr}`, resp);
  } else {
    const operands = getOperands(urlTokens);
    if (!operands) {
      errorMessageValidationTokens(wrongOperandsStr, resp);
    } else {
      server.emit(calcMethod, operands, resp);
    }
  }
});

function errorMessageValidationTokens(messageStr, resp) {
  const html = view.getHtml(messageStr, true);
  resp.end(html);
}

function getOperands(urlTokens) {
  const op1 = +urlTokens[2];
  const op2 = +urlTokens[3];
  if (!isNaN(op1) && !isNaN(op2)) {
    return [op1, op2];
  }
}
