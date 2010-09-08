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
        "atlassian/jquery/jquery.throbber.js"
    ];
    
    for (var i = 0, ii = includes.length; i < ii; i++) {
        document.write('<script src="../../../../../../auiplugin/src/main/resources/js/' + includes[i] + '"></script>');
    }
})();

function viewHTMLSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".sources .html-source");
    if(parent.children(".html-source:visible").size()==0){
        source.fadeIn(200);
    } else {
        source.fadeOut(200);
    }
}

function viewJSSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".sources .js-source");
    if(parent.children(".js-source:visible").size()==0){
        source.fadeIn(200);
    } else {
        source.fadeOut(200);
    }
}

function addSample(sampleCode){
    AJS.$(document).bind("samples", sampleCode);
}

function createViewSourceLinksAndShimTests() {
    
    // Add shim testing to the required test cases
    AJS.$("[class*=shims-required]").append("<div class='shim-test'></div>");
    AJS.$(".shim-test").append("<p> For Shim Testing, the below flash object should appear below the aui-blanket: </p>");
    AJS.$(".shim-test").append("<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/AFVlJAi3Cso&amp;hl=en&amp;fs=1&amp;'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/AFVlJAi3Cso&amp;hl=en&amp;fs=1&amp;' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>")
    
    //Add HTML and JS source links to those that require it
    var HTMLLink = AJS.$("<div class='view-html-source-link'><a href='#'> View/Hide HTML Source </a></div>"),
        JSLink = AJS.$("<div class='view-js-source-link'><a href='#'> View/Hide Javascript Source </a></div>");
    AJS.$(".source-required").append(AJS.$("<div class=sources></div>"));
    AJS.$(".source-required .sources").append("<p>--------------End of Sample -----------</p>");
    AJS.$(".source-required .sources").append(HTMLLink);
    AJS.$(".source-required .sources").append(JSLink);
    
    //Add JS and HTML source code
    AJS.$(".source-required").each(function(){

        //add HTML source
        var parent = AJS.$(this);
        var htmlcode = parent.children(".html-code").html();
                      
        var htmlsource = AJS.$("<textarea class='html-source'>"); 
        parent.children(".sources").children(".view-html-source-link").after(htmlsource);
        
        htmlsource.attr({
           cols: 140,
           rows: 20,
           readonly: true 
        });

        htmlsource.val(htmlcode);
        htmlsource.hide();
        //add JS source
        var jscode = parent.children(".js-code").html();
        if (AJS.$.trim(jscode)) {
            jscode = jscode.replace("addSample(function() {", "");
            jscode = AJS.$.trim(jscode);  
            jscode = jscode.substring(0, jscode.length-3);
            var jssource = AJS.$("<textarea class='js-source'>");
           parent.children(".sources").children(".view-js-source-link").after(jssource);
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
    //Execute sample javascript code
    AJS.$(document).trigger("samples");
    
    //Assign click events to HTML and JS links
    AJS.$(".view-html-source-link").children().click(function(e){
        e.preventDefault();
        viewHTMLSource(e.target);   //defined in common.js
    });

    AJS.$(".view-js-source-link").children().click(function(e){
        e.preventDefault();
        viewJSSource(e.target); //defined in common.js
    });
};