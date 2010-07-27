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
        "atlassian/containdropdown.js",

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
        "atlassian/jquery/jquery.throbber.js"
    ];
    
    for (var i = 0, ii = includes.length; i < ii; i++) {
        document.write('<script src="../../../auiplugin/src/main/resources/js/' + includes[i] + '"></scr' + 'ipt>');
    }
})();

function viewHTMLSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".html-source");
    if(parent.children(".html-source:visible").size()==0){
        source.fadeIn(200);
    } else {
        source.fadeOut(200);
    }
}

function viewJSSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".js-source");
    if(parent.children(".js-source:visible").size()==0){
        source.fadeIn(200);
    } else {
        source.fadeOut(200);
    }
}

function addSample(sampleCode){
    AJS.$(document).bind("samples", sampleCode);
}

function createViewSourceLinks() {
     
    var HTMLLink = AJS.$("<div class='view-html-source-link'><a href='#'> View/Hide HTML Source </a></div>"),
        JSLink = AJS.$("<div class='view-js-source-link'><a href='#'> View/Hide Javascript Source </a></div>");
    AJS.$(".source-required").append(HTMLLink);
    AJS.$(".source-required").append(JSLink);
            
    AJS.$(".source-required").each(function(){
        //add HTML source
        var parent = AJS.$(this);
        var htmlcode = parent.children(".html-code").html();
                      
        var htmlsource = AJS.$("<textarea class='html-source'>");
            
        AJS.$(this).children(".view-html-source-link").after(htmlsource);
      
        htmlsource.attr({
           cols: 140,
           rows: 20,
           readonly: true 
        });

        htmlsource.val(htmlcode);
        htmlsource.hide();
        
        //add JS source
        var jscode = parent.children(".js-code").html();
        console.log();
        if (AJS.$.trim(jscode)) {
            jscode = jscode.replace("addSample(function() {", "");
            jscode = AJS.$.trim(jscode);  
            jscode = jscode.substring(0, jscode.length-3);
            var jssource = AJS.$("<textarea class='js-source'>");
            parent.children(".view-js-source-link").after(jssource);
            jssource.attr({
               cols: 140,
               rows: 20,
               readonly: true 
            });
            jssource.val(jscode);   
            jssource.hide();
        } else {
            parent.children(".view-js-source-link").remove();
            parent.append("No JS");
        }

        
    });
    
    AJS.$(document).trigger("samples");
    AJS.$(".view-html-source-link").children().click(function(e){
        e.preventDefault();
        viewHTMLSource(e.target);   //defined in common.js
    });

    AJS.$(".view-js-source-link").children().click(function(e){
        e.preventDefault();
        viewJSSource(e.target); //defined in common.js
    });
};