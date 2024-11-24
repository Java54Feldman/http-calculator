import viewConfig from "../config/view.json" with {type: 'json'};

export default class CalculatorView {
    getHtml(res, isError) {
        return `
            <label style="
                font-size: ${viewConfig.fontSize};
                display: block;
                text-align: ${viewConfig.textAlign};
                color: ${isError ? viewConfig.errorColor : viewConfig.successColor};
            ">${res}</label>
        `;
    }
}