var components = {};
AJS.$(document).ready(function(){
    var helpText;

    refreshHTML = function(){
        AJS.$("#display #html-code").html(AJS.$("#html-editor").val()); 
    }
        
    refreshCSS = function(){
        AJS.$("#display #css-code").html(AJS.$("#css-editor").val());  
    }
    
    refreshJS = function(){
        //refresh
        var script = AJS.$("<script type='text/javascript'>");
        script.append(AJS.$("#js-editor").val());
        AJS.$("#display").append(script);
    }
            
    var refresh = function(){
        //refresh html
        refreshHTML();
        //referesh css
        refreshCSS();
        //refresh js
        refreshJS();
    }
              
    //only run page javascript if the full-width-container he been added (prevents running code twice because of a re-trigger of dom-ready)
    if(AJS.$(".full-width-container").size()==0){
        AJS.$.ajax({
           url: "aui-components.xml",
           async: false,
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
        
        AJS.$("#info-display").html(helpText);
        
        if(AJS.version!="${project.version}"){
            AJS.$("#version").html("AUI v" + AJS.version);
        } else {
            AJS.$("#version").html("latest AUI Snapshot");
        }
        
        AJS.$.each(components.component, function(index, item){
            var $toolbarlogo = AJS.$("#toolbar-logo");
            var thisMenuItem = document.createElement('button');
            thisMenuItem.setAttribute("class", "toolbar-button component-button");
            thisMenuItem.setAttribute("id", AJS.$.trim(item.name.toLowerCase()));
            AJS.$(thisMenuItem).text(item.name);
            $toolbarlogo.after(thisMenuItem);
            var information = "<h3>"+ item.name+"</h3><p>" + item.description;
            if(item.option){
                information = information +  "<p> AUI " + item.name + " has the following options available: <br><ul>"
                AJS.$.each(item.option, function(index, option){
                    information = information + "<li>" + option + "</li>";
                });
                information = information + "</ul>";
            }
            if(item.func){
                information = information + "<p> The AUI " + item.name + " API has the following functions available: <br><ul>"
                AJS.$.each(item.func, function(index, func){
                    information = information + "<li>" + func + "</li>";
                });
                information = information + "</ul>";
            }
            information = information + "</ul><p> For more information on how to use the API please refer to the <a href='http://confluence.atlassian.com/display/AUI/AUI+Components'> AUI Documentation </a>"
            AJS.$(thisMenuItem).click(function(e){
                addComponentTemplate(AJS.$(e.target).attr("id"));
            });
            
            AJS.$(thisMenuItem).hover(function(){
                AJS.$("#info-display").html(information);
            });
            
        });
        
        var focused = null;
        
        AJS.$(".edit-box").mouseover(function(e){
            var target = AJS.$(e.target).siblings(".heading-span");
            if(focused!=e.target && !AJS.$(e.target).val()){
                target.stop();
                target.fadeTo(300, 0.4);  
            }
        });
        
        AJS.$(".edit-box").mouseout(function(e){
            var target = AJS.$(e.target).siblings(".heading-span");
            if(focused!=e.target && !AJS.$(e.target).val()){
                target.stop();
                target.fadeTo(300, 0.8);
            }
        });
        AJS.$(".edit-box").focusin(function(e){
            focused = this;
            AJS.$(e.target).siblings(".heading-span").stop();
            AJS.$(e.target).siblings(".heading-span").fadeOut(300);
        });
        
        AJS.$(".edit-box").focusout(function(e){
            focused = null;
            if(!AJS.$(e.target).val()){
                AJS.$(e.target).siblings(".heading-span").stop();
                AJS.$(e.target).siblings(".heading-span").fadeTo(300, 0.8);
            }
        });
        
        AJS.$("#js-editor").focusout(function(e){
           refreshJS(); 
        });
        
        AJS.$("body").children().wrapAll("<div class='full-width-container'/>");
        AJS.drawLogo({containerID: "toolbar-logo", scaleFactor: 0.2});
        AJS.$(".full-width-container").hide();
        AJS.$(".full-width-container").fadeIn(500);
        AJS.$("#html-editor").keypress(function(){
            setTimeout("refreshHTML()", 100);
        });
        
        AJS.$("#css-editor").keypress(function(){
            setTimeout("refreshCSS()", 100);
        });
        
        AJS.$("button#refresh").click(function(e){
            e.preventDefault();
            refresh();
        });
        
        AJS.$("button#clear").click(function(){
            AJS.$("#html-editor").val("");
            AJS.$("#css-editor").val("");
            AJS.$("#js-editor").val("");
            refresh();
        });
        
        var addComponentTemplate = function(component){
            AJS.$.get("templates/" + component + "-template.html", function(data){
                AJS.$("#html-editor").val(AJS.$("#html-editor").val() + "\n" + data);
                refresh();
            });
            
            AJS.$.get("templates/" + component + "-template.js", function(data){
                AJS.$("#js-editor").val(AJS.$("#js-editor").val() + "\n" + data);
                refresh();
            });
            
        }
        
        AJS.$("#help-icon").click(function(){
            AJS.$("#info-display").html(helpText);
        });
        
    }
});