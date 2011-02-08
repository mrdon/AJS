/**
 * Support for markup based binder components. Binder components must be objects with the following "interface":
 *
 * <pre>
 * {
 *   selector: "input.foo",
 *   run: function(element) {
 *      //do stuff on given element
 *   }
 * }
 * </pre>
 *
 * @class Binder
 * @namespace AJS
 */
AJS.Binder = function($) {

   var binders = {};

   return {
       /**
        * Runs all the binder components for the given scope, or the document body if none specified.
        *
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
                   if (!$element.data(id) && $element.is(binder.selector)) {
                       AJS.log("Running binder component: " + id + " on element " + element);
                       $element.data(id, true); // so we don't bind to the same element again later
                       binder.run(element);
                   }
               });
           });

       },
       /**
        * Register a binder component with the given id.
        * @method register
        */
       register: function(id, binder) {
           binders[id] = binder;
       },
       /**
        * Unregister a binder component for the given id.
        * @mthod unregister
        */
       unregister: function(id) {
           binders[id] = null;
       }
   };
}(AJS.$);


