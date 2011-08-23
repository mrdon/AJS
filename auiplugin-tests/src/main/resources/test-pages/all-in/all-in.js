AJS.$(document).ready(function(){

    var nav = jQuery("#all-in-nav"),
        navMenu = jQuery("<ul></ul>"),
        headings = jQuery("#content > h2");
    
    headings.each( function(index,value) {
        // quick and dirty. smashing this out, y'all.
        navMenu.append("<li><a href=\"#" + jQuery(this).attr("id") + "\">" + jQuery(this).text() + "</a></li>");
    });
    nav.append(navMenu);

});