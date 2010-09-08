module("Tables Unit Tests");

test("Tables API Test", function() {
       ok(typeof AJS.tables=="object", "Tables object exists!");
       ok(typeof AJS.tables.rowStriping=="function", "Tables.rowStripping funciton exists!");
});
