import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();
export default class CalculatorService {
  constructor(emitter, operations) {
    operations.forEach((v, k) => {
      emitter.addListener(k, (operands, response) => {
        const res = v(operands[0], operands[1]);
        response.end(view.getHtml(res, false));
      });
    });
  }
}
