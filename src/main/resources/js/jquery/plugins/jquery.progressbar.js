/*

Progress Bar
============

Adds a progress bar to your div. The progress bar consists of a two divs; one containing the other. The outer div is
represents the incomplete status, and the inner div is expanded as percentage progress increases.

USAGE:

Set up a <div> with an id:

    <div id="progressBarContainer"></div>

and add the following JS:

    AJS.$("#progressBarContainer").progressBar(50);
    AJS.$("#progressBarContainer").progressBar(50, {height: "12px", showPercentage: false});

STYLING:

You must also set up a style for the 'complete' class.

*/
(function() {

    AJS.$.fn.progressBar = function (percentComplete, options) {

        var $progressBarContainer = this;

        var defaults = {
            height: "1em",
            showPercentage: true
        };

        var opts = AJS.$.extend(defaults, options);

        var incompleteBarId = $progressBarContainer.attr("id") + "-incomplete-bar";
        var completeBarId = $progressBarContainer.attr("id") + "-complete-bar";
        var percentCompleteTextId = $progressBarContainer.attr("id") + "-percent-complete-text";

        if (AJS.$("#" + incompleteBarId).length == 0) {

            var $incompleteBar = AJS.$(document.createElement("div"));
            $incompleteBar.attr("id", incompleteBarId);
            $incompleteBar.css({width: "90%", border: "solid 1px #ccc", float: "left", "margin-right": "0.5em"});
            $incompleteBar.addClass("progress-background-color");

            var $completeBar = AJS.$(document.createElement("div"));
            $completeBar.attr("id", completeBarId);
            $completeBar.addClass("progress-fill-color");
            $completeBar.css({height: opts.height, width: percentComplete + "%"});

            var $percentCompleteText = AJS.$(document.createElement("span"));
            $percentCompleteText.attr("id", percentCompleteTextId);
            $percentCompleteText.addClass("percent-complete-text");
            $percentCompleteText.html(percentComplete + "%");

            $incompleteBar.append($completeBar);
            $progressBarContainer.append($incompleteBar);

            if (opts.showPercentage) {
                $progressBarContainer.append($percentCompleteText);
            }

        } else {
            AJS.$("#" + completeBarId).css("width", percentComplete + "%");
            AJS.$("#" + percentCompleteTextId).html(percentComplete + "%");
        }
    }

})(jQuery);