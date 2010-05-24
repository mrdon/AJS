(function (){
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
                    $icon = AJS.$('<span class="svg-icon close size-16"></span>').click(function () {
                        $this.closeMessage();
                    });
                $this.append($icon);
                $icon.each(AJS.icons.addIcon.init);
            });
        },
        template: '<div class="aui-message {type} {closeable}"><p class="title"><span class="svg-icon {type} size-18"></span><strong>{title}</strong></p>{body}</div><!-- .aui-message -->',
        createMessage: function (type) {
            AJS.messages[type] = function (context, obj) {
                if (!obj) {
                    obj = context;
                    context = "#aui-message-bar";
                }
                AJS.$(context).append(AJS.template(this.template).fill({
                    type: type,
                    closeable: obj.closeable ? "closeable" : "",
                    title: obj.title || "",
                    "body:html": obj.body || ""
                })).find(".svg-icon:empty").each(AJS.icons.addIcon.init);
                obj.closeable && AJS.messages.makeCloseable(AJS.$(context).find("div.aui-message.closeable"));
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
