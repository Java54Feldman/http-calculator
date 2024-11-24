import http from "node:http";
import { operations } from "./config/operations.mjs";
import CalculatorView from "./view/CalculatorView.mjs";
import CalculatorService from "./service/CalculatorService.mjs";
const server = http.createServer();
const PORT = 3500;
server.listen(PORT, () =>
  console.log(`server is listening on port ${server.address().port}`)
);
new CalculatorService(server, operations);
const view = new CalculatorView();
server.on("request", (req, resp) => {
  resp.setHeader("content-type", "text/html");
  const urlTokens = req.url.split("/");
  let html;
  if (!operations.get(urlTokens[1])) {
    html = view.getHtml(`method ${urlTokens[1]} unsupported`, true);
    resp.end(html);
  } else {
    const operands = getOperands(urlTokens);
    if (!operands) {
      html = view.getHtml(`wrong operands`, true);
      resp.end(html);
    } else {
      server.emit(urlTokens[1], operands, resp);
    }
  }
});
function getOperands(urlTokens) {
  const op1 = +urlTokens[2];
  const op2 = +urlTokens[3];
  if (!isNaN(op1) && !isNaN(op2)) {
    return [op1, op2];
  }
}
