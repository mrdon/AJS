AJS.messages.success({
    title: "Success!",
    body: "Created by JS with default options."
});

AJS.messages.info("#custom-context", {
    title: "Info",
    body: "You can have uncloseable messages.",
    closeable: false
});

AJS.messages.setup()