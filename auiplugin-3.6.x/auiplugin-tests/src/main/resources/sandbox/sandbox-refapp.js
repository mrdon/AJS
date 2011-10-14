var components = {};
AJS.$(document).ready(function(){
    var helpText,
        theBody = AJS.$("body"),
        pageContainer = AJS.$(".full-width-container"),
        theHTMLeditor = AJS.$("#html-editor"),
        theCSSeditor = AJS.$("#css-editor"),
        theJSeditor = AJS.$("#js-editor"),
        infoDisplay = AJS.$("#info-display"),
        htmlCode = AJS.$("#html-code"),
        cssCode = AJS.$("#css-code"),
        jsCode = AJS.$("#js-code");

    resetElements = function(){
        // keep the context divs but avoid duplicate messages
        AJS.$("#aui-message-bar, #custom-context").empty();
        // avoid spamming the dom with duplicates
        AJS.$("#example-dialog").remove();
    }
    
    refreshHTML = function(){
        htmlCode.html(theHTMLeditor.val()); 
    }
        
    refreshCSS = function(){
        cssCode.html(theCSSeditor.val());  
    }
    
    refreshJS = function(){
        resetElements();
        //refresh
        var script = AJS.$("<script type='text/javascript'></script>");
        script.text(theJSeditor.val());
        jsCode.empty();
        jsCode.append(script);
    }
            
    var refresh = function(){
        refreshHTML();
        refreshCSS();
        refreshJS();
    }

    //only run page javascript once (prevents running code twice because of a re-trigger of dom-ready)
    if (!theBody.hasClass("sandbox-initialised")) {

        var docHeight = AJS.$(document).height(),
            headHeight = AJS.$("#header").height();

        AJS.$("#sandbox-js-warning").hide(); // use AJS to hide the no-AJS error

        if (window.location.protocol != 'file:') {
            AJS.$(".initially-hidden").removeClass("initially-hidden"); // show stuff that only works if AJS available
        }

        AJS.$("#sandbox-page").height(docHeight);
        AJS.$("#work-area").height(docHeight - headHeight);

        if ( jQuery.browser.mozilla ) {
            AJS.$(".display-box").each( function(e){
                // force height in px to save Firefox from itself
                AJS.$(this).height( AJS.$(this).height() );
            });
        }

        AJS.$.ajax({
           url: "aui-components.xml",
           async: false,
           dataType: "text",
           success: function(xml){
               components = xml2json.parser(xml);
           }
           
        });
                     
        AJS.$.ajax({
           url: "sandbox-help.html",
           async: false,
           success: function(data){
               helpText = data;
           } 
        });
        
        infoDisplay.html(helpText);
        
        if(AJS.version!="${project.version}"){
            AJS.$("#version").html("AUI v" + AJS.version);
        } else {
            AJS.$("#version").html("Local AUI Snapshot");
        }
        
        AJS.$.each(components.component, function(index, item){
            var $toolbarlogo = AJS.$("#toolbar-logo"),
                componentsMenu = AJS.$("#components");
            var thisMenuItem = document.createElement('button');
            thisMenuItem.setAttribute("class", "toolbar-button component-button");
            thisMenuItem.setAttribute("id", AJS.$.trim(item.name.toLowerCase()));
            AJS.$(thisMenuItem).text(item.name);
            componentsMenu.append(thisMenuItem);

            var information = "<h3>"+ item.name+"</h3><p>" + item.description;
            if(item.option){
                information = information +  "<p> AUI " + item.name + " has the following options available:</p><ul>"
                AJS.$.each(item.option, function(index, option){
                    information = information + "<li>" + option + "</li>";
                });
                information = information + "</ul>";
            }
            if(item.func){
                information = information + "<p> The AUI " + item.name + " API has the following functions available:</p><ul>"
                AJS.$.each(item.func, function(index, func){
                    information = information + "<li>" + func + "</li>";
                });
                information = information + "</ul>";
            }
            information = information + "</ul><p> For more information on how to use the API please refer to the <a href='http://confluence.atlassian.com/display/AUI/'>AUI Documentation</a></p>"

            AJS.$(thisMenuItem).click(function(e){
                addComponentTemplate(AJS.$(e.target).attr("id"));
                e.preventDefault();
            });
            
            AJS.$(thisMenuItem).hover(function(){
                infoDisplay.html(information);
            });
            
        });

        theBody.addClass("sandbox-initialised");
        
        AJS.drawLogo({containerID: "toolbar-logo", scaleFactor: 0.15});
        
        theJSeditor.focusout(function(e){
            refreshJS(); 
        });

        theHTMLeditor.keypress(function(){
            setTimeout("refreshHTML()", 100);
        });
        
        theCSSeditor.keypress(function(){
            setTimeout("refreshCSS()", 100);
        });
        
        AJS.$("button#refresh").click(function(e){
            e.preventDefault();
            refresh();
        });
        
        AJS.$("button#clear").click(function(){
            AJS.$(".edit-box").val("");
            refresh();
        });
        
        var addComponentTemplate = function(component){
            AJS.$.get("templates/" + component + "-template.html", function(data){
                theHTMLeditor.val(theHTMLeditor.val() + "\n" + data);
                refresh();
            });
            
            AJS.$.get("templates/" + component + "-template.js", function(data){
                theJSeditor.val(theJSeditor.val() + "\n" + data);
                refresh();
            });
            
        }
        
        AJS.$("#help-icon").click(function(){
            infoDisplay.html(helpText);
        });
        
    }
});