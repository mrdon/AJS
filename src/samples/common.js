/**
 * This common javascript file is used to include all javascript modules into the sample html files.
 * Add any new javascript files to this list to ensure they are included in the samples.
 */
(function () {

    var includes = [
        "external/raphael/raphael.js",
        "external/raphael/raphael.shadow.js",
        "external/jquery/jquery.js",
        "external/jquery/jquery-compatibility.js",
        "external/jquery/jquery-ui.js",
        "external/jquery/plugins/jquery.aop.js",
        "external/jquery/plugins/jquery.form.js",

        "atlassian/atlassian.js",
        "atlassian/cookie.js",
        "atlassian/dialog.js",
        "atlassian/dropdown.js",
        "atlassian/event.js",
        "atlassian/icons.js",
        "atlassian/inline-dialog.js",
        "atlassian/firebug.js",
        "atlassian/forms.js",
        "atlassian/messages.js",
        "atlassian/tables.js",
        "atlassian/tabs.js",
        "atlassian/template.js",
        "atlassian/whenitype.js",

        "atlassian/jquery.autocomplete.js",
        "atlassian/jquery.is-dirty.js",
        "atlassian/jquery.progressbar.js",
        "atlassian/jquery.selection.js",
        "atlassian/jquery.os.js",
        "atlassian/jquery.moveto.js",
        "atlassian/jquery.offsetanchors.js",
        "atlassian/jquery.hotkeys.js",
        "atlassian/jquery.getdocheight.js",
        "atlassian/containdropdown.js",
        "atlassian/jquery.stalker.js",
        "atlassian/jquery.throbber.js"
    ];
    
    for (var i = 0, ii = includes.length; i < ii; i++) {
        document.write('<script src="../../main/resources/js/' + includes[i] + '"></scr' + 'ipt>');
    }
})();