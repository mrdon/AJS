AJS = AJS || {};

(function() {
    // don't change the next 2 lines, they are the target of a search/replace
    var AJS_SUBSTITUE_CONTEXT_PATH_HERE = false;
    var AJS_SUBSTITUE_BASE_URL_HERE = false;

    /**
     * Gives the context-path for this application. The returned string will never
     * end with a slash, and will either be the empty string, or start with slash.
     *
     * Example values: "", "/jira", "/some/large/context"
     *
     * @since 3.5
     */
    AJS.contextPath = function() {
        return AJS_SUBSTITUE_CONTEXT_PATH_HERE ||
                // fallback to product-specific constants
                contextPath || // confluence and JIRA
                AJS.params.contextPath || // confluence
                (BAMBOO && BAMBOO.contextPath) || // bamboo
                fishEyePagecontextContext; // fisheye/crucible
    };

    /**
     * Gives the base URL for this application. The returned string will never
     * end with a slash.
     *
     * Example values: "http://foo.com", "http://foo.com/somecontext"
     *
     * @since 3.5
     */
    AJS.baseURL = function() {
        return AJS_SUBSTITUE_BASE_URL_HERE ||
                // fallback to product-specific constants
                AJS.params.baseURL || // jira
                AJS.getContextPath(); // better than nothing
    };

})();
