AJS.dim = function () {
    if (AJS.dim.dim) {
        AJS.dim.dim.remove();
        AJS.dim.dim = null;
        AJS.$("html, body").css("overflow", "");
        // Safari bug workaround
        if (AJS.$.browser.safari) {
            AJS.$("body").css({height: "200px"});
            setTimeout(function () {
                AJS.$("body").css({height: ""});
            }, 0);
        }
    } else {
        AJS.dim.dim = AJS("div").addClass("blanket");
        if (AJS.$.browser.msie) {
            AJS.dim.dim.css({width: "200%", height: AJS.$(document).height() + "px"});
        }
        AJS.$("body").append(AJS.dim.dim).css("overflow", "hidden");
        AJS.$("html").css("overflow", "hidden");
    }
};
AJS.popup = function (width, height) {
    var shadow = AJS.$('<div class="shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>');
    var popup = AJS("div").addClass("popup").css({
        margin: "-" + Math.round(height / 2) + "px 0 0 -" + Math.round(width / 2) + "px",
        width: width + "px",
        height: height + "px",
        background: "#fff",
        zIndex: 3000
    });
    if (AJS.$.browser.msie) {
        window.msieheight = Math.round(height / 2);
        popup[0].style.marginTop = "";
    }
    AJS.$("body").append(shadow);
    AJS.$(".shadow").css({
        margin: "-" + Math.round(height / 2) + "px 0 0 -" + Math.round(width / 2 + 16) + "px",
        width: width + 32 + "px",
        height: height + 29 + "px",
        zIndex: 2999
    });
    AJS.$(".shadow .b").css("width", width - 26 + "px");
    AJS.$(".shadow .l, .shadow .r").css("height", height - 18 + "px");
    AJS.$("body").append(popup);
    popup.hide();
    shadow.hide();

    return {
        show: function () {
            this.element.show();
            shadow.show();
            AJS.dim();
        },
        hide: function () {
            this.element.hide();
            shadow.hide();
            AJS.dim();
        },
        element: popup,
        remove: function () {
            shadow.remove();
            popup.remove();
            this.element = null;
        }
    };
};

(function () {
    function Button(dialog, label, onclick, className) {
        if (!dialog.buttonpanel) {
            dialog.buttonpanel = AJS("div").addClass("button-panel");
            dialog.popup.element.append(dialog.buttonpanel);
        }
        this.dialog = dialog;
        this.onclick = onclick;
        this._onclick = function () {
            onclick.call(this, dialog);
        };
        this.item = AJS("button").html(label);
        if (className) {
            this.item.addClass(className);
        }
        if (typeof onclick == "function") {
            this.item.click(this._onclick);
        }
        dialog.buttonpanel.append(this.item);
        this.id = dialog.button.length;
        dialog.button[this.id] = this;
    }
    function itemMove (leftOrRight, target) {
        var dir = leftOrRight == "left"? -1 : 1;
        return function (step) {
            var dtarget = this.dialog[target];
            if (this.id != ((dir == 1) ? dtarget.length - 1 : 0)) {
                dir *= (step || 1);
                dtarget[this.id + dir].item[(dir < 0 ? "before" : "after")](this.item);
                dtarget.splice(this.id, 1);
                dtarget.splice(this.id + dir, 0, this);
                for (var i = 0, ii = dtarget.length; i < ii; i++) {
                    if (target == "panel" && this.dialog.curtab == dtarget[i].id) {
                        this.dialog.curtab = i;
                    }
                    dtarget[i].id = i;
                }
            }
            return this;
        };
    };
    function itemRemove(target) {
        return function () {
            this.dialog[target].splice(this.id, 1);
            for (var i = 0, ii = this.dialog[target].length; i < ii; i++) {
                this.dialog[target][i].id = i;
            }
            this.item.remove();
        };
    }
    Button.prototype.moveUp = Button.prototype.moveLeft = itemMove("left", "button");
    Button.prototype.moveDown = Button.prototype.moveRight = itemMove("right", "button");
    Button.prototype.remove = itemRemove("button");

    Button.prototype.label = function (label) {
        return this.button.html(label);
    };
    Button.prototype.onclick = function (onclick) {
        if (typeof onclick == "undefined") {
            return this.onclick;
        } else {
            this.button.unbind("click", this._onclick);
        }
    };

    var Panel = function (dialog, title, reference, className) {
        if (!(reference instanceof AJS.$)) {
            reference = AJS.$(reference);
        }
        this.dialog = dialog;
        this.id = dialog.panel.length;
        this.button = AJS("button").html(title);
        this.item = AJS("li").append(this.button);
        this.body = AJS("div").append(reference);
        if (className) {
            this.body.addClass(className);
        }
        var i = dialog.panel.length,
            tab = this;
        dialog.menu.append(this.item);
        dialog.body.append(this.body);
        dialog.panel[i] = this;
        var onclick = function () {
            if (dialog.curtab + 1) {
                var cur = dialog.panel[dialog.curtab];
                cur.body.hide();
                cur.item.removeClass("selected");
                (typeof cur.onblur == "function") && cur.onblur.call(tab);
            }
            dialog.curtab = tab.id;
            tab.body.show();
            tab.item.addClass("selected");
            (typeof tab.onselect == "function") && tab.onselect.call(tab);
        };
        this.button.click(onclick);
        onclick();
        if (i == 0) {
            dialog.menu.hide();
        } else {
            dialog.menu.show();
        }
    };
    Panel.prototype.select = function () {
        this.button.click();
    };
    Panel.prototype.moveUp = Panel.prototype.moveLeft = itemMove("left", "panel");
    Panel.prototype.moveDown = Panel.prototype.moveRight = itemMove("right", "panel");
    Panel.prototype.remove = itemRemove("panel");
    Panel.prototype.html = function (html) {
        if (html) {
            this.body.html(html);
            return this;
        } else {
            return this.body.html();
        }
    };




    // Dialog
    AJS.Dialog = function (width, height) {
        this.height = height || 480;
        this.width = width || 640;
        this.popup = AJS.popup(this.width, this.height);
        this.menu = AJS("ul").addClass("dialog-menu");
        this.body = AJS("div").addClass("dialog-body");
        this.curtab;

        this.popup.element.addClass("dialog").append(this.menu).append(this.body);
        this.panel = [];
        this.button = [];
    };
    AJS.Dialog.prototype.addHeader = function (title, className) {
        if (this.header) {
            this.header.remove();
        }
        this.header = AJS("h2").html(title);
        className && this.header.addClass(className);
        this.popup.element.prepend(this.header);
        return this;
    };
    AJS.Dialog.prototype.addButton = function (label, onclick, className) {
        new Button(this, label, onclick, className);
        return this;
    };
    AJS.Dialog.prototype.addPanel = function (title, reference, className) {
        new Panel(this, title, reference, className);
        return this;
    };

    AJS.Dialog.prototype.show = function () {
        this.popup.show();
        return this;
    };
    AJS.Dialog.prototype.hide = function () {
        this.popup.hide();
        return this;
    };
    AJS.Dialog.prototype.remove = function () {
        this.popup.hide();
        this.popup.remove();
    };

})();