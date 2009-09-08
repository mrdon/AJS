/**
* The Atlassian Conglomerate Cookie - to let us use cookies without running out
*
*   Originally authored by Scott Harwood
*
*   Version: 0.2
*/


(function () {

    // Cookie handling functions

    var COOKIE_NAME = "AJS.conglomerate.cookie";

    function getValueFromConglomerate(name, cookieValue) {
        // a null cookieValue is just the first time through so create it
        if(cookieValue == null) {
            cookieValue = "";
        }
        var eq = name + "=";
        var cookieParts = cookieValue.split('|');
        for(var i = 0; i < cookieParts.length; i++) {
            var cp = cookieParts[i];
            while (cp.charAt(0)==' ') {
                cp = cp.substring(1,cp.length);
            }
            // rebuild the value string exluding the named portion passed in
            if (cp.indexOf(name) == 0) {
                return cp.substring(eq.length, cp.length);
            }
        }
        return null;
    }

    //either append or replace the value in the cookie string
    function addOrAppendToValue(name, value, cookieValue)
    {
        var newCookieValue = "";
        // a null cookieValue is just the first time through so create it
        if(cookieValue == null) {
            cookieValue = "";
        }

        var cookieParts = cookieValue.split('|');
        for(var i = 0; i < cookieParts.length; i++) {
            var cp = cookieParts[i];

            // ignore any empty tokens
            if(cp != "") {
                while (cp.charAt(0)==' ') {
                    cp = cp.substring(1,cp.length);
                }
                // rebuild the value string exluding the named portion passed in
                if (cp.indexOf(name) != 0) {
                    newCookieValue += cp + "|";
                }
            }
        }

        // always append the value passed in if it is not null or empty
        if(value != null && value != '') {
            var pair = name + "=" + value;
            if((newCookieValue.length + pair.length) < 4020) {
                newCookieValue += pair;
            }
        }
        return newCookieValue;
    }

    function getCookieValue(name) {
        var
        eq = name + "=",
        ca = document.cookie.split(';');

        for(var i=0;i<ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(eq) == 0) {
                return c.substring(eq.length,c.length);
            }
        }

        return null;
    }

    function saveCookie(name, value, days) {
      var ex;
      if (days) {
        var d = new Date();
        d.setTime(d.getTime()+(days*24*60*60*1000));
        ex = "; expires="+d.toGMTString();
      } else {
        ex = "";
      }
      document.cookie = name + "=" + value + ex + ";path=/";
    }

    AJS.Cookie = {
        save : function (name, value) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            cookieValue = addOrAppendToValue(name, value, cookieValue);
            saveCookie(COOKIE_NAME, cookieValue, 365);
        },

        read : function(name, defaultValue) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            var value = getValueFromConglomerate(name, cookieValue);
            if(value != null) {
                return value;
            }
            return defaultValue;
        },
        erase: function (name) {
            this.save(name, "");
        }
    };
    
})();

