/**
 * Namespace for all the binders to be put in.
 * @class Binder
 * @namespace AJS
 */
AJS.Binder = function($) {

   var binders = {};

   return {
       /**
        * Runs all the binder components for the given scope, or the document body if none specified.
        *
        * @for AJS
        * @method runBinders
        * @param scope {Element} element scope to run the binders in
        */
       runBinders: function(scope) {
           if ($.isEmptyObject(binders)) {
               AJS.log("No binders to run");
               return;
           }

           scope = scope || document.body;

           $("*:not(link, script)", scope).each(function(i, element) {
               var $element = $(element);
               $.each(binders, function(id, binder){
                   if ($element.is(binder.selector) && !$element.data(id)) {
                       AJS.log("Running binder component: " + id + " on element " + element);
                       $element.data(id, "true"); // so we don't bind to the same element again later
                       binder.run(element);
                   }
               });
           });

       },
       register: function(id, binder) {
           binders[id] = binder;
       },
       unregister: function(id) {
           binders[id] = null;
       }
   };
}(AJS.$);


AJS.toInit(function() {
    AJS.Binder.runBinders();
});

