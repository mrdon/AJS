AJS = AJS || {};

(function() {
    // don't change this line, they are the target of a search/replace
    var AJS_SUBSTITUTE_CONTEXT_PATH_HERE = false;

    var contextPath = null;
    var paths = [
        AJS_SUBSTITUTE_CONTEXT_PATH_HERE,
        window.contextPath, // JIRA
        window.Confluence && Confluence.getContextPath(), // Confluence
        window.BAMBOO && BAMBOO.contextPath, // Bamboo
        window.FECRU && FECRU.pageContext // FishEye/Crucible
    ];
    for (var i = 0; i < paths.length; i++) {
        if (typeof paths[i] === "string") {
            contextPath = paths[i];
            break;
        }
    }

    /**
     * Gives the context-path for this application. The returned string will never
     * end with a slash, and will either be the empty string, or start with slash.
     *
     * Example values: "", "/jira", "/some/large/context"
     *
     * @return {?string} -- A null return value indicates that no context path
     *                      information was discovered.
     * @since 3.5
     */
    AJS.contextPath = function() {
        return contextPath;
    };

})();
