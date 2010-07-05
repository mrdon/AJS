function componentModule (class, tests) {
        AJS.$(document).ready(function(){
            if(AJS.$("." + class).size()!=0){
               tests();
            }
        });
}
AJS.$(document).ready(function(){
    if(AJS.$(".all-tests").size()!=0){
        var unitTests = [
            "aui-whenIType-test"
        ]; 
        
        AJS.$.each(unitTests, function(index, value){
            AJS.$(".all-tests").addClass(value);
        });
    }
});