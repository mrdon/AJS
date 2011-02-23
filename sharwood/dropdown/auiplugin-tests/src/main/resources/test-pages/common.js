/**
 * This common javascript file is used to include all javascript modules into the sample html files.
 * Add any new javascript files to this list to ensure they are included in the samples.
 */
(function () {

    var includes = [
        "external/raphael/raphael.js",
        "external/raphael/raphael.shadow.js",
        "external/jquery/jquery.js",
//        "external/jquery/jquery142.js",
//        "external/jquery/jquery-compatibility.js",
        "external/jquery/jquery-ui.js",
        "external/jquery/plugins/jquery.aop.js",
        "external/jquery/plugins/jquery.form.js",

        "atlassian/atlassian.js",
        "atlassian/cookie.js",
        "atlassian/dialog.js",
        "atlassian/dropdown.js",
//        "atlassian/event.js",
        "atlassian/icons.js",
        "atlassian/inline-dialog.js",
        "atlassian/firebug.js",
        "atlassian/forms.js",
        "atlassian/messages.js",
        "atlassian/tables.js",
        "atlassian/tabs.js",
        "atlassian/template.js",
        "atlassian/whenitype.js",
        "atlassian/containdropdown.js",

        "atlassian/binders/binder.js",
        "atlassian/binders/placeholder.js",

        "atlassian/jquery/jquery.autocomplete.js",
        "atlassian/jquery/jquery.is-dirty.js",
        "atlassian/jquery/jquery.progressbar.js",
        "atlassian/jquery/jquery.selection.js",
        "atlassian/jquery/jquery.os.js",
        "atlassian/jquery/jquery.moveto.js",
        "atlassian/jquery/jquery.offsetanchors.js",
        "atlassian/jquery/jquery.hotkeys.js",
        "atlassian/jquery/jquery.getdocheight.js",
        "atlassian/jquery/jquery.stalker.js",
        "atlassian/jquery/jquery.throbber.js",
        "atlassian/jquery/jquery.hasFixedParent.js",
        "atlassian/jquery/jquery.getOptionsFromAttributes.js",
        "atlassian/jquery/jquery.scrollIntoView.js",


        "atlassian/Class.js",
        "atlassian/const.js",
        "atlassian/copyObject.js",
        "atlassian/ajax/SmartAjax.js",
        "atlassian/control/Control.js",
        "atlassian/input/Keyboard.js",
        "atlassian/input/Mouse.js",
        "atlassian/contentretriever/ContentRetriever.js",
        "atlassian/contentretriever/AjaxContentRetriever.js",
        "atlassian/contentretriever/DOMContentRetriever.js",
        "atlassian/descriptor/Descriptor.js",
        "atlassian/list/List.js",
        "atlassian/dropdown/Dropdown.js",
        "atlassian/dropdown/Dropdown.ListItem.js",
        "atlassian/dropdown/Dropdown.ListItemGroup.js",
        "atlassian/dropdown/Dropdown.OptionsDescriptor.js",
        "atlassian/inlinelayer/InlineLayer.js",
        "atlassian/inlinelayer/InlineLayer.OptionsDescriptor.js",
        "atlassian/inlinelayer/InlineLayer.StandardPositioning.js",
        "atlassian/inlinelayer/InlineLayer.IframePositioning.js"
    ];
    
    for (var i = 0, ii = includes.length; i < ii; i++) {
        document.write('<script type="text/javascript" src="../../../../../../auiplugin/src/main/resources/js/' + includes[i] + '"></script>');
    }
})();