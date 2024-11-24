import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const viewConfig = require('../config/view.json');

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