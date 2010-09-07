module("Dropdown Unit Tests");

test("Dropdown Creation", function() {
    var testDropdown = AJS.dropDown("test","standard");
    ok(typeof testDropdown == "object", "dropdown object was created successfully!");
});
  
