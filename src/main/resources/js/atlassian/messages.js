(function (){
    AJS.Messages = {
        setup: function () {
            AJS.Messages.createMessage("generic");
            AJS.Messages.createMessage("error");
            AJS.Messages.createMessage("warning");
            AJS.Messages.createMessage("info");
            AJS.Messages.createMessage("success");
            AJS.Messages.createMessage("hint");
            AJS.Messages.makeCloseable();
        },
        makeCloseable: function (message) {
            AJS.$(message || "div.aui-message.closeable").each(function () {
                var $this = AJS.$(this),
                    $icon = AJS.$('<span class="svg-icon close size-16"></span>').click(function () {
                        $this.closeMessage();
                    });
                $this.append($icon);
                $icon.each(AJS.Icons.addIcon.init);
            });
        },
        template: '<div class="aui-message {type} {closeable}"><p class="title"><span class="svg-icon {type} size-18"></span><strong>{title}</strong></p>{body}</div><!-- .aui-message -->',
        createMessage: function (type) {
            AJS.Messages[type] = function (context, obj) {
                if (!obj) {
                    obj = context;
                    context = "#aui-message-bar";
                }
                AJS.$(context).append(AJS.template(this.template).fill({
                    type: type,
                    closeable: obj.closeable ? "closeable" : "",
                    title: obj.title || "",
                    "body:html": obj.body || ""
                })).find(".svg-icon:empty").each(AJS.Icons.addIcon.init);
                obj.closeable && AJS.Messages.makeCloseable(AJS.$(context).find("div.aui-message.closeable"));
            };
        }
    };

    AJS.$.fn.closeMessage = function () {
        var $message = AJS.$(this);
        if ($message.hasClass("aui-message", "closeable")) {
            $message.trigger("messageClose", [this]).remove();
        }
    };

    AJS.$(function () {AJS.Messages.setup();});
})();
