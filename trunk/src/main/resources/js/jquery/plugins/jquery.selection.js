(function ($) {
    if (document.selection) {
        var fixCaretReturn = function (S) {
            return S.replace(/\u000D/g, "");
        };
        $.fn.selection = function (value) {
            var element = this[0];
            this.focus();
            if (!element) {
                return false;
            }
            if (value == null) {
                return document.selection.createRange().text;
            } else {
                var scroll_top = element.scrollTop;
                var range = document.selection.createRange();
                range.text = value;
                range.select();
                element.focus();
                element.scrollTop = scroll_top;
            }
        };
        $.fn.selectionRange = function (start, end) {
            var element = this[0];
            this.focus();
            var range = document.selection.createRange(),
                dup = range.duplicate();
            dup.moveToElementText(element);
            dup.setEndPoint("EndToEnd", range);
            var duptext = fixCaretReturn(dup.text),
                rangetext = fixCaretReturn(range.text),
                res = {
                    start: duptext.length - rangetext.length,
                    end: duptext.length,
                    text: rangetext
                };
            if (start == null) {
                return res;
            } else {
                range.moveStart("character", start - res.start);
                range.moveEnd("character", end - res.end);
                range.select();
            }
        };
    } else {
        $.fn.selection = function (value) {
            var element = this[0];
            if (!element) {
                return false;
            }
            if (value == null) {
                if (element.setSelectionRange) {
                    return element.value.substring(element.selectionStart, element.selectionEnd);
                } else {
                    return false;
                }
            } else {
                var scroll_top = element.scrollTop;
                if (!!element.setSelectionRange) {
                    var selection_start = element.selectionStart;
                    element.value = element.value.substring(0, selection_start) + value + element.value.substring(element.selectionEnd);
                    element.selectionStart = selection_start;
                    element.selectionEnd = selection_start + value.length;
                }
                element.focus();
                element.scrollTop = scroll_top;
            }
        };
        $.fn.selectionRange = function (start, end) {
            if (start == null) {
                return {
                    start: this[0].selectionStart,
                    end: this[0].selectionEnd,
                    text: this.val().substring(this[0].selectionStart, this[0].selectionEnd)
                };
            } else {
                this[0].selectionStart = start;
                this[0].selectionEnd = end;
            }
        };
    }
    $.fn.wrapSelection = function (before, after) {
        this.selection(before + this.selection() + (after || ""));
    };
})(jQuery);