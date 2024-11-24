import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();
export default class CalculatorService {
    constructor(emitter, operations) {
        emitter.addListener('add', (operands, response) => {
            const res = operations.get('add')(operands[0], operands[1]);
            response.end(view.getHtml(res, false))
        })

    }
}