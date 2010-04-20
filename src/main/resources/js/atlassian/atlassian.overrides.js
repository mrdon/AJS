/**
 * Overrides various jquery functions to add AUI-specific behaviour
 */
(function($){

    var HIDDEN_CLASS = "hidden";

    var addOrRemoveHiddenClass = function(add){
        if (add)
            $(this).addClass(HIDDEN_CLASS);
        else
            $(this).removeClass(HIDDEN_CLASS);
    };

    var addOrRemoveBefore = function(fnName, add){
        $.aop.around({target: $, method: fnName}, function(invocation){
            addOrRemoveHiddenClass.call(this, add);
            return invocation.proceed();
        });
    };

    var addOrRemoveInCallback = function(fnName, add){
        $.aop.around({target: $, method: fnName}, function(invocation){
            var originalCallback = invocation.arguments[1];
            invocation.arguments[1] = function(){
                addOrRemoveHiddenClass.call(this, add);
                if (originalCallback)
                    originalCallback();
            };

            return invocation.proceed();
        });
    };

    addOrRemoveBefore("show", false);
    addOrRemoveBefore("hide", true);

    addOrRemoveInCallback("slideDown", false);
    addOrRemoveInCallback("slideUp", true);

    addOrRemoveInCallback("fadeIn", false);
    addOrRemoveInCallback("fadeOut", true);

})(AJS.$);