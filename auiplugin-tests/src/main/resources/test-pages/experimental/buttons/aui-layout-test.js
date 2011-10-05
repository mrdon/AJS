(function(){

    function setClassToggles(options) {
        var theTarget = jQuery(options.target),
            allClasses = theTarget.attr('class'),
            classes = theTarget.attr('class').split(/\s+/),
            theClass,
            triggerWrap = jQuery(options.triggerWrap),
            triggers = [],
            trigger;

        jQuery.each(classes, function(i) {
            trigger = jQuery("<button></button>").attr("id",classes[i]).text(classes[i]);
            triggerWrap.append(trigger);
            triggers.push(trigger);
        });
        
        triggerWrap.append('<button id="all-on">All On</button> <button id="all-off">All Off</button> ');

        function updateMessage(trigger,target,value) {
            if ( target.hasClass(value) ) {
                trigger.text("Turn " + value + " off");
            } else {
                trigger.text("Turn " + value + " on");
            }
        };
        
        function resetMessages() {
            triggers.each( function(i) {
                updateMessage(jQuery(this), theTarget, jQuery(this).attr("id"));
            });
        };
         
        jQuery.each(triggers, function(i) {
            // set up button text
            updateMessage(jQuery(this), theTarget, jQuery(this).attr("id"));
        
            // toggle class and text on click
            jQuery(this).click( function() {
                theClass = jQuery(this).attr("id");
                theTarget.toggleClass(theClass);
                updateMessage(jQuery(this),theTarget,theClass);
            })
        });
        
        jQuery("#all-on").click( function() {
        	theTarget.attr("class", allClasses);
        	resetMessages();
        })
        jQuery("#all-off").click( function() {
        	theTarget.attr("class", "");
        	resetMessages();
        })
        
    };

    jQuery(document).ready( function() {
        setClassToggles({ "triggerWrap": "#toggles", "target": "body" });
    });

})();