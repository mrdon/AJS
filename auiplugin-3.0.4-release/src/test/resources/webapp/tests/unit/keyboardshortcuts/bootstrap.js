
QUnit.testStart = function () {
    jQuery(document).unbind("keyup");
    emacsTestResults = [];
};