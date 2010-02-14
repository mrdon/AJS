// Tests for dropdown.js

testAjs.addTest("testAJSdropdownExists", function () {
    return (typeof AJS.dropDown != "undefined" && AJS.dropDown != null);
});

testAjs.addTest("testAJSdropdownShows", function () {
	var ddParent = AJS.$(".aui-dd-parent"),
        trigger = AJS.$(".aui-dd-trigger:first"),
        res;
		
	ddParent.dropDown();
	trigger.click(function () {
		ddParent.show();
	}).trigger("click");

	res = (AJS.$(".aui-dropdown:visible").length != 0);
	return res;
});
