/*
* AJS.template
* http://confluence.atlassian.com/display/AUI/AJS.template
*/
AJS.template = (function ($) {
    var tokenRegex = /\{([^\}]+)\}/g, // matches "{xxxxx}"
        objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches ".xxxxx" or "["xxxxx"]" to run over object properties
        escapingRegex = /[<>"'&]/g, // matches HTML characters that need to be escaped
        apos = /([^\\])'/g, // matches not escaped apostrophes.
        
        // internal function
        // parses "{xxxxx}" and returns actual value from the given object that matches the expression
        replacer = function (all, key, obj, isHTML) {
            var res = obj;
            key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                name = name || quotedName;
                if (res) {
                    if (name + ":html" in res) {
                        res = res[name + ":html"];
                        isHTML = true;
                    } else if (name in res) {
                        res = res[name];
                    }
                    if (isFunc && typeof res == "function") {
                        res = res();
                    }
                }
            });
            // if not found restore original value
            if (res == null || res == obj) {
                res = all;
            }
            res = String(res);
            if (!isHTML) {
                res = T.escape(res);
            }
            return res;
        },
        // internal function
        // escapes HTML chars
        escaper = function (chr) {
            return "&#" + chr.charCodeAt() + ";";
        },
        // replaces tokens in the template with corresponding values without HTML escaping
        fillHtml = function (obj) {
            this.template = this.template.replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj, true);
            });
            return this;
        },
        // replaces tokens in the template with corresponding values with HTML escaping
        fill = function (obj) {
            this.template = this.template.replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
            return this;
        },
        toString = function () {
            return this.template;
        };

    // internal function
    var T = function (s) {
        function res() {
            return res.template;
        }
        res.template = String(s);
        res.toString = res.valueOf = toString;
        res.fill = fill;
        res.fillHtml = fillHtml;
        return res;
    },
    cache = {},
    count = [];

    // returns template taken form the script tag with given title. Type agnostic, but better put type="text/x-template"
    T.load = function (title) {
        title = String(title);
        if (cache.hasOwnProperty(title)) {
            return cache[title];
        }
        count.length >= 1e3 && delete cache[count.shift()];
        count.push(title);
        return cache[title] = this($("script[title='" + title.replace(apos, "$1\\'") + "']")[0].text);
    };
    // escape HTML dangerous characters
    T.escape = function (s) {
        return String(s).replace(escapingRegex, escaper);
    };
    return T;
})(window.jQuery);
