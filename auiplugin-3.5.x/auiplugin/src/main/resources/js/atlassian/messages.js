/*->
#name>Messages
#javascript>Yes
#css>Yes
#description>Some Standard message types for different purposes used across Atlassian Products
#option>generic
#option>error
#option>warning
#option>success
#option>info
#option>hint
<-*/

(function (){
    /**
     * Utility methods to display different message types to the user.
     * Usage:
     * <pre>
     * AJS.messages.info("#container", {
     *   title: "Info",
     *   body: "You can choose to have messages without Close functionality.",
     *   closeable: false,
     *   shadowed: false
     * });
     * </pre>
     * @class messages
     * @namespace AJS
     */
    AJS.messages = {
        setup: function () {
            AJS.messages.createMessage("generic");
            AJS.messages.createMessage("error");
            AJS.messages.createMessage("warning");
            AJS.messages.createMessage("info");
            AJS.messages.createMessage("success");
            AJS.messages.createMessage("hint");
            AJS.messages.makeCloseable();
        },
        makeCloseable: function (message) {
            AJS.$(message || "div.aui-message.closeable").each(function () {
                var $this = AJS.$(this),
                    $icon = AJS.$('<span class="aui-icon icon-close"></span>').click(function () {
                        $this.closeMessage();
                    });
                $this.append($icon);
                $icon.each(AJS.icons.addIcon.init);
            });
        },
        template: '<div class="aui-message {type} {closeable} {shadowed}"><p class="title"><span class="aui-icon icon-{type}"></span><strong>{title}</strong></p>{body}</div><!-- .aui-message -->',
        createMessage: function (type) {
            AJS.messages[type] = function (context, obj) {
                var template = this.template,
                    $message;

                if (!obj) {
                    obj = context;
                    context = "#aui-message-bar";
                }
               
                // Set up our template options
                obj.closeable = (obj.closeable == false) ? false : true;
                obj.shadowed = (obj.shadowed == false) ? false : true;

                // Append the message using template
                $message = AJS.$(AJS.template(template).fill({
                    type: type,
                    closeable: obj.closeable ? "closeable" : "",
                    shadowed: obj.shadowed ? "shadowed" : "",
                    title: obj.title || "",
                    "body:html": obj.body || ""
                }).toString());
                
                // Add ID if supplied
                if (obj.id) {
                    if ( /[#\'\"\.\s]/g.test(obj.id) ) {
                        // reject IDs that don't comply with style guide (ie. they'll break stuff)
                        AJS.log("AJS.Messages error: ID rejected, must not include spaces, hashes, dots or quotes.");
                    } else {
                        $message.attr('id', obj.id);
                    }
                }
                
                $message.appendTo(context);

                // Attach the optional extra behaviours
                obj.closeable && AJS.messages.makeCloseable($message);
            };
        }
    };

    AJS.$.fn.closeMessage = function () {
        var $message = AJS.$(this);
        if ($message.hasClass("aui-message", "closeable")) {
            $message.trigger("messageClose", [this]).remove();
        }
    };

    AJS.$(function () {AJS.messages.setup();});
})();
