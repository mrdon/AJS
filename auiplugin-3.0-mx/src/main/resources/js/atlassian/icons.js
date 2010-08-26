(function () {
    AJS.Icons = AJS.Icons || {};
    AJS.Icons.addIcon = function (name, ro) {
        AJS.Icons[name] = function (context, size) {
            return draw(ro, context, size);
        };
    };
    function draw(ro, context, size) {
        size = size || 24;
        var r = Raphael([context, size + 1, size + 1].concat(ro));
        r.scale(size / 24, size / 24, 0, 0);
    }
})();

/* Set up icons automatically based on class names*/
AJS.$(function () {
    AJS.$(".svg-icon").each(function () {
        var classes = this.className.split(" "),
            len = classes.length,
            size = this.className.match(/(^|\s)size-(\d+)(\s|$)/);
        size = size && +size[2];
        while (len--) {
            if (classes[len] != "addIcon" && classes[len] in AJS.Icons) {
                AJS.Icons[classes[len]](this, size);
            }
        }
    });
});

/* -- Icon Descriptions -- */

/* Generic Icon */
AJS.Icons.addIcon("generic", [{
        stroke: "none",
        fill: "#999",
        type: "path",
        path: "M22.465,8.464c1.944,1.944,1.944,5.126,0,7.07l-6.93,6.93c-1.944,1.945-5.126,1.945-7.07,0l-6.929-6.93c-1.945-1.943-1.945-5.125,0-7.07l6.929-6.93c1.944-1.944,5.126-1.944,7.07,0L22.465,8.464z"
    }, {
        type: "path",
        stroke: "none",
        fill: "90-#999996-#a1a19f:20-#b8b8b7:70-#ccc",
        path: "M9.172,2.242L9.172,2.242l-6.929,6.93C1.491,9.923,1.077,10.927,1.077,12c0,1.072,0.414,2.076,1.166,2.828l6.929,6.93c0.751,0.752,1.756,1.166,2.828,1.166s2.076-0.414,2.828-1.166l6.93-6.93c0.751-0.752,1.165-1.756,1.165-2.828c0-1.072-0.414-2.076-1.165-2.828l-6.93-6.93C13.269,0.682,10.731,0.682,9.172,2.242z"
    }, {
        type: "path",
        stroke: "none",
        fill: "270-#999996-#a1a19f:20-#b8b8b7:70-#ccc",
        path: "M7.181,5.869 7.181,17.95 16.974,17.95 16.974,9.205 13.638,5.869"
    }, {
        type: "path",
        stroke: "none",
        fill: "#fff",
        path: "M12.724,9.619v-2.75H8.181V16.95h7.793v-6.832h-2.75C12.946,10.119,12.724,9.894,12.724,9.619zM13.724,7.369c0,0.521,0,1.32,0,1.75c0.428,0,1.229,0,1.75,0L13.724,7.369z"
    }
]);

/* Error Icon */
AJS.Icons.addIcon("error", [{
        type: "path",
        stroke: "none",
        fill: "#c00",
        path: "M7.857,22L2,16.143 2,7.857 7.857,1.999 16.143,1.999 22,7.857 22,16.143 16.143,22z"
    }, {
        type: "path",
        stroke: "none",
        fill: "90-#c00-#d50909-#ed2121-#f33",
        path: "M8.271,2.999C7.771,3.5,3.501,7.77,3,8.271c0,0.708,0,6.748,0,7.457c0.501,0.5,4.771,4.77,5.271,5.271c0.708,0,6.749,0,7.457,0c0.501-0.502,4.771-4.771,5.271-5.271c0-0.709,0-6.749,0-7.457c-0.501-0.501-4.771-4.771-5.271-5.272C15.021,2.999,8.979,2.999,8.271,2.999z"
    }, {
        type: "rect",
        x:5.318,
        y:9.321,
        fill: "270-#c00-#d50909-#ed2121-#f33",
        stroke: "none",
        width:13.363,
        height:5.356
    }, {
        type: "rect",
        x: 6.318,
        y: 10.321,
        fill: "#fff",
        stroke: "none",
        width: 11.363,
        height: 3.356
    }
]);

/* Success Icon */
AJS.Icons.addIcon("success", [{
        type: "path",
        stroke: "none",
        path: "M22,18.801C22,20.559,20.561,22,18.799,22H5.201C3.439,22,2,20.559,2,18.801V5.199C2,3.44,3.439,2,5.201,2h13.598C20.561,2,22,3.44,22,5.199V18.801z",
        fill: "#393"
    }, {
        type: "path",
        path: "M5.201,3C3.987,3,3,3.986,3,5.199v13.602C3,20.014,3.987,21,5.201,21h13.598C20.013,21,21,20.014,21,18.801V5.199C21,3.986,20.013,3,18.799,3H5.201z",
        stroke: "none",
        fill: "90-#393-#33a23c-#3c6"
    }, {
        type: "path",
        path: "M10.675,12.158c-0.503-0.57-1.644-1.862-1.644-1.862l-3.494,2.833l3.663,5.313l4.503,1.205L17.73,4.624l-4.361-0.056C13.369,4.568,11.424,10.047,10.675,12.158z",
        stroke: "none",
        fill: "270-#393-#33a23c-#3c6"
    }, {
        type: "path",
        path: "M14.072,5.577 11.05,14.092 8.917,11.677 6.886,13.324 9.815,17.57 12.997,18.422 16.432,5.607",
        stroke: "none",
        fill: "#fff"
    }
]);

/* Hint Icon */
AJS.Icons.addIcon("hint", [{
        type: "path",
        path:  "M22.465,8.464c1.944,1.944,1.944,5.126,0,7.07l-6.93,6.93c-1.944,1.945-5.126,1.945-7.07,0l-6.929-6.93c-1.945-1.943-1.945-5.125,0-7.07l6.929-6.93c1.944-1.944,5.126-1.944,7.07,0L22.465,8.464z",
        stroke: "none",
        fill: "#009898"
    }, {
        type: "path",
        path: "M9.172,2.242L9.172,2.242l-6.929,6.93C1.491,9.923,1.077,10.927,1.077,12c0,1.072,0.414,2.076,1.166,2.828l6.929,6.93c0.751,0.752,1.756,1.166,2.828,1.166s2.076-0.414,2.828-1.166l6.93-6.93c0.751-0.752,1.165-1.756,1.165-2.828c0-1.072-0.414-2.076-1.165-2.828l-6.93-6.93C13.269,0.682,10.731,0.682,9.172,2.242z",
        stroke: "none",
        fill: "270-#099-#00a2a2-#00baba-#0cc"
    }, {
        type: "path",
        path: "M12,5.077c-2.679,0-4.857,2.179-4.857,4.857c0,1.897,0.741,2.864,1.337,3.639c0.385,0.502,0.662,0.863,0.761,1.443l0.045,0.264v2.25c0,0.854,0.693,1.547,1.546,1.547h2.338c0.852,0,1.545-0.693,1.545-1.547v-2.254l0.044-0.258c0.1-0.582,0.377-0.943,0.762-1.443c0.596-0.777,1.338-1.743,1.338-3.641C16.857,7.255,14.679,5.077,12,5.077z",
        stroke: "none",
        fill: "270-#099-#00a2a2-#00baba-#0cc"
    }, {
        type: "path",
        path: "M10.227,14.849c-0.331-1.936-2.084-2.197-2.084-4.915c0-2.131,1.727-3.857,3.857-3.857c2.13,0,3.857,1.727,3.857,3.857c0,2.717-1.754,2.979-2.085,4.915H10.227z M10.285,15.849v1.682c0,0.301,0.246,0.547,0.546,0.547h2.338c0.3,0,0.545-0.246,0.545-0.547v-1.682H10.285z",
        stroke: "none",
        fill: "#fff"
    }
]);

/* Info Icon */
AJS.Icons.addIcon("info", [{
        type: "circle",
        cx: 12,
        cy: 12,
        r: 10,
        stroke: "none",
        fill: "#06c"
    }, {
        type: "path",
        path: "M3,12c0,4.962,4.037,9,9,9s9-4.038,9-9s-4.037-9-9-9S3,7.037,3,12z",
        stroke: "none",
        fill: "90-#06c-#006FD5-#0087ED-#0099FF"
    }, {
        type: "path",
        path: "M9.409,7.472c0,0.694,0.282,1.319,0.729,1.785c-0.288,0-0.729,0-0.729,0v9.425h5.182V9.257c0,0-0.44,0-0.729,0c0.446-0.466,0.729-1.09,0.729-1.785c0-1.429-1.162-2.591-2.591-2.591S9.409,6.043,9.409,7.472z",
        stroke: "none",
        fill: "270-#06c-#006FD5-#0087ED-#0099FF"
    }, {
        type: "path",
        path: "M13.591,10.257v7.425h-3.182v-7.425H13.591z M12,9.063c0.879,0,1.591-0.712,1.591-1.591S12.879,5.881,12,5.881s-1.591,0.712-1.591,1.591S11.121,9.063,12,9.063z",
        stroke: "none",
        fill: "#fff"
    }
]);

/* Warning Icon */
AJS.Icons.addIcon("warning", [{
        type: "path",
        path: "M8.595,4.368c1.873-3.245,4.938-3.245,6.811,0c1.873,3.245,4.938,8.554,6.812,11.798c1.874,3.244,0.342,5.898-3.405,5.898c-3.746,0-9.876,0-13.624,0c-3.746,0-5.278-2.654-3.405-5.898C3.656,12.922,6.721,7.613,8.595,4.368z",
        stroke: "none",
        fill: "#f90"
    }, {
        type: "path",
        path: "M9.461,4.868L2.649,16.666c-0.72,1.246-0.863,2.371-0.404,3.166s1.504,1.232,2.943,1.232h13.624c1.439,0,2.485-0.438,2.944-1.232s0.315-1.92-0.405-3.166L14.539,4.868C13.82,3.622,12.918,2.935,12,2.935S10.181,3.621,9.461,4.868z",
        stroke: "none",
        fill: "90-#f90-#ffa209-#ffba21-#fc3"
    }, {
        type: "path",
        path: "M9.274,6.187c0,0,0.968,9.68,0.986,9.862c-0.532,0.476-0.881,1.148-0.881,1.916c0,1.433,1.165,2.598,2.597,2.598c1.433,0,2.598-1.165,2.598-2.598c0-0.77-0.351-1.441-0.883-1.918c0.018-0.184,0.988-9.86,0.988-9.86H9.274z",
        stroke: "none",
        fill: "270-#f90-#ffa209-#ffba21-#fc3"
    }, {
        type: "path",
        path: "M11.177,15.171l-0.798-7.984h3.194l-0.8,7.984H11.177z M11.976,16.368c-0.882,0-1.597,0.716-1.597,1.597c0,0.883,0.715,1.598,1.597,1.598c0.881,0,1.598-0.715,1.598-1.598C13.573,17.084,12.856,16.368,11.976,16.368z",
        stroke: "none",
        fill: "#fff"
    }
]);