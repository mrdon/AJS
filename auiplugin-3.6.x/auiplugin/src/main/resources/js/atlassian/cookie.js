(function () {

    // Cookie handling functions

    var COOKIE_NAME = "AJS.conglomerate.cookie",
        UNESCAPE_COOKIE_REGEX = /(\\|^"|"$)/g,
        CONSECUTIVE_PIPE_CHARS_REGEX = /\|\|+/g,
        ANY_QUOTE_REGEX = /"/g,
        REGEX_SPECIAL_CHARS = /[.*+?|^$()[\]{\\]/g;

    function getValueFromConglomerate(name, cookieValue) {
        // a null cookieValue is just the first time through so create it
        cookieValue = cookieValue || "";
        var reg = new RegExp(regexEscape(name) + "=([^|]+)"),
            res = cookieValue.match(reg);
        return res && res[1];
    }

    //either append or replace the value in the cookie string
    function addOrAppendToValue(name, value, cookieValue) {
        //A cookie name follows after any amount of white space mixed with any amount of '|' characters
        //A cookie value is preceded by '=', then anything except for '|'
        var reg = new RegExp("(\\s|\\|)*\\b" + regexEscape(name) + "=[^|]*[|]*");

        cookieValue = cookieValue || "";
        cookieValue = cookieValue.replace(reg, "|");
        if (value !== "") {
            var pair = name + "=" + value;
            if (cookieValue.length + pair.length < 4020) {
                cookieValue += "|" + pair;
            }
        }
        return cookieValue.replace(CONSECUTIVE_PIPE_CHARS_REGEX, "|");
    }

    function unescapeCookieValue(name) {
        return name.replace(UNESCAPE_COOKIE_REGEX, "");
    }

    function getCookieValue(name) {
        var reg = new RegExp("\\b" + regexEscape(name) + "=((?:[^\\\\;]+|\\\\.)*)(?:;|$)"),
            res = document.cookie.match(reg);
        return res && unescapeCookieValue(res[1]);
    }

    function saveCookie(name, value, days) {
        var ex = "",
            d,
            quotedValue = '"' + value.replace(ANY_QUOTE_REGEX, '\\"') + '"';

        if (days) {
            d = new Date();
            d.setTime(+d + days * 24 * 60 * 60 * 1000);
            ex = "; expires=" + d.toGMTString();
        }
        document.cookie = name + "=" + quotedValue + ex + ";path=/";
    }

    function regexEscape(str) {
        return str.replace(REGEX_SPECIAL_CHARS, "\\$&");
    }

    /**
     * The Atlassian Conglomerate Cookie - to let us use cookies without running out.
     * @class Cookie
     * @namespace AJS
     */
    AJS.Cookie = {
        /**
         * Save a cookie.
         * @param name {String} name of cookie
         * @param value {String} value of cookie
         * @param expires {Number} number of days before cookie expires
         */
        save : function (name, value, expires) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            cookieValue = addOrAppendToValue(name, value, cookieValue);
            saveCookie(COOKIE_NAME, cookieValue, expires || 365);
        },
        /**
         * Get the value of a cookie.
         * @param name {String} name of cookie to read
         * @param defaultValue {String} the default value of the cookie to return if not found
         */
        read : function(name, defaultValue) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            var value = getValueFromConglomerate(name, cookieValue);
            if (value != null) {
                return value;
            }
            return defaultValue;
        },
        /**
         * Remove the given cookie.
         * @param name {String} the name of the cookie to remove
         */
        erase: function (name) {
            this.save(name, "");
        }
    };
    
})();

