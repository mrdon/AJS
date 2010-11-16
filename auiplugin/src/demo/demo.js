//MAIN CODE RUN ON ALL PAGES
AJS.$(document).ready(function(){
    createViewSourceLinks();
    detectPrototype();
});

//HELPER FUNCTIONS

//event handler for viewing html source
function viewHTMLSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".html-source");
    if (parent.children(".html-source:visible").size() == 0) {
        source.fadeIn(200);
    }
    else {
        source.fadeOut(200);
    }
}

//event handler for viewing js source
function viewJSSource(target) {
    var parent = AJS.$(target).parent().parent();
    var source = parent.children(".js-source");
    if (parent.children(".js-source:visible").size() == 0) {
        source.fadeIn(200);
    }
    else {
        source.fadeOut(200);
    }
}

//event binding to run sample code only after original source has been captured
function addSample(sampleCode) {
    AJS.$(document).bind("samples", sampleCode);
}

//detect if demo page is for a prototype component
function detectPrototype(){
    var prototypeText = "This component is still in a prototype stage. It is still being evaluated within Atlassian. plugin developers should avoid using it until it has been approved for generalised prototyping. Plugin developers are advised to avoid using this component also as it's stability had not been confirmed.",
    prototypeStatus = "Prototype!"
    
    if(AJS.$("meta[name='status']").attr("content")=="prototype"){
        if(AJS.$("meta[name='product']").size()>0){
            prototypeText = "This component is still in an initial prototype stage. It is still being evaluated within Atlassian "+AJS.$("meta[name='product']").attr("content")+", all other Atlassian products should avoid using it until it has been approved for generalised prototyping. Plugin developers are advised to avoid using this component also as it's stability had not been confirmed."
            prototypeStatus = "Initial Prototype!"
        }
        
        AJS.messages.warning(".navigation", {
                title: prototypeStatus,
                body: prototypeText,
                closeable: false
            });
    }
}

//adds the view source links as required (does not work with components that add markup and js automatically on load like tabs)
function createViewSourceLinks() {
    
    var HTMLLink = AJS.$("<div class='view-html-source-link'><a href='#'> View/Hide HTML Source </a></div>"),
            JSLink = AJS.$("<div class='view-js-source-link'><a href='#'> View/Hide Javascript Source </a></div>");
    AJS.$(".source-required").append("<p> --------------End of Sample ----------- </p>");
    AJS.$(".source-required").append(HTMLLink);
    AJS.$(".source-required").append(JSLink);

    AJS.$(".source-required").each(function() {
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
        var jscode = parent.children("script").html();
        if (AJS.$.trim(jscode)) {
            if(jscode.indexOf("addSample(function() {") > -1 || jscode.indexOf("addSample(function(){") > -1){
                jscode = jscode.replace("addSample(function() {", "");
                jscode = jscode.replace("addSample(function(){", "");
                jscode = AJS.$.trim(jscode);
                jscode = jscode.substring(0, jscode.length - 3);
            }
            var jssource = AJS.$("<textarea class='js-source'>");
            parent.children(".view-js-source-link").after(jssource);
            jssource.attr({
                cols: 140,
                rows: 20,
                readonly: true
            });
            jssource.val(jscode);
            jssource.hide();
        }
        else {
            parent.children(".view-js-source-link").remove();
            parent.append("No JS");
        }


    });
    AJS.$(document).trigger("samples");
    
    AJS.$(".view-html-source-link").children().click(function(e) {
        e.preventDefault();
        viewHTMLSource(e.target);   //defined in common.js
    });

    AJS.$(".view-js-source-link").children().click(function(e) {
        e.preventDefault();
        viewJSSource(e.target); //defined in common.js
    });
};


