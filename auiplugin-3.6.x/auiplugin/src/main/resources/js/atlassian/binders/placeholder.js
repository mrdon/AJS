(function(){
    // browser supports placeholder, no need to do anything
    var temp = document.createElement('input');
    if('placeholder' in temp)
        return;

    /**
     * Displays default text in the input field when its value is empty.
     * If the browser supports placeholder input attributes (HTML5), then
     * we skip this component.
     *
     * Usage:
     * <pre>
     * &lt;input placeholder="Some default text"&gt;
     * </pre>
     *
     * Events thrown: reset.placeholder
     */
    AJS.Binder.register("placeholder", {
        selector: "input[placeholder]",
        run: function(element) {
            var $ = AJS.$,
                $this = $(element),
                applyDefaultText = function() {
                    if(!$.trim($this.val()).length) {
                        $this.val($this.attr("placeholder"))
                             .addClass("placeholder-shown")
                             .trigger("reset.placeholder");
                    }
                };

            applyDefaultText();
            $this.blur(applyDefaultText).focus(function() {
                if($this.hasClass("placeholder-shown")) {
                    $this.val("").removeClass("placeholder-shown");
                }
            });
        }
    });

})();