// fix nested draggables in IE - http://dev.jqueryui.com/ticket/4333
$.ui.draggable.prototype._mouseCapture = (function (orig) {
    return function (event) {
        var result = orig.call(this, event);
        if (result && $.browser.msie) event.stopPropagation();
        return result;
    };
})($.ui.draggable.prototype._mouseCapture);
