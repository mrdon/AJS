AJS = AJS || {};

(function() {
    // don't change this line, they are the target of a search/replace
    var AJS_SUBSTITUTE_CONTEXT_PATH_HERE = false;

    /**
     * Gives the context-path for this application. The returned string will never
     * end with a slash, and will either be the empty string, or start with slash.
     *
     * Example values: "", "/jira", "/some/large/context"
     *
     * @since 3.5
     */
    AJS.contextPath = function() {
        var result = AJS_SUBSTITUTE_CONTEXT_PATH_HERE ||
                // fallback to product-specific constants
                window.contextPath || // JIRA
                (window.Confluence && Confluence.getContextPath())|| // confluence
                (window.BAMBOO && BAMBOO.contextPath) || // bamboo
                (window.FECRU && FECRU.pageContext); // fisheye/crucible

        AJS.contextPath = function() { return result; }; // self-replace
        
        return result;
    };

})();
