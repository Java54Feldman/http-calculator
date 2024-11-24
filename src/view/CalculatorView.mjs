export default class CalculatorView {
    getHtml(res, isError) {
        return `<label style="font-size:40px; display:block; text-align:center; color:${isError ? 'red' : 'green'}">${res}</label>`
    }
}