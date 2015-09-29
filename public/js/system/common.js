if (!String.prototype.fill) {
    String.prototype.fill = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number] : match;
        });
    };
}
function int(val) {
    return parseInt(val);
}
function float(val) {
    return parseFloat(val);
}

var bindlock = 0;
var startlock = 0;