/**
 * Overrides various jquery functions to add AUI-specific behaviour
 */
(function($){

    var HIDDEN_CLASS = "hidden";

    var addHiddenClass = function(){
        $(this).addClass(HIDDEN_CLASS);
    };

    var removeHiddenClass = function(){
        $(this).removeClass(HIDDEN_CLASS);
    };
    
    var runBefore = function(fnName, fnToRun){
        $.aop.around({target: $, method: fnName}, function(invocation){
            fnToRun.call(this);
            return invocation.proceed();
        });
    };

    var runInCallback = function(fnName, fnToRun){
        $.aop.around({target: $, method: fnName}, function(invocation){
            var originalCallback = invocation.arguments[1];
            invocation.arguments[1] = function(){
                fnToRun.call(this);
                if (originalCallback)
                    originalCallback();
            };

            return invocation.proceed();
        });
    };

    runBefore("show", removeHiddenClass);
    runBefore("hide", addHiddenClass);

    runInCallback("slideDown", removeHiddenClass);
    runInCallback("slideUp", addHiddenClass);

    runInCallback("fadeIn", removeHiddenClass);
    runInCallback("fadeOut", addHiddenClass);

})(AJS.$);