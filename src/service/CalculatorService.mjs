import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();
export default class CalculatorService {
  constructor(emitter, operations) {
    [...operations.keys()].forEach((k) => {
      emitter.addListener(k, (operands, response) => {
        const res = operations.get(k)(operands[0], operands[1]);
        response.end(view.getHtml(res, false));
      });
    });
  }
}
