// fix nested draggables in IE - http://dev.jqueryui.com/ticket/4333
$.extend($.ui.draggable.prototype, (function (orig) {
    return {
        _mouseCapture: function (event) {
            var result = orig.call(this, event);
            if (result && $.browser.msie) event.stopPropagation();
            return result;
        }
    };
})($.ui.draggable.prototype["_mouseCapture"]));
