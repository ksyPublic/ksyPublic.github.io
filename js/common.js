//ES5 ~ ES6
(function (window) {
    const body = document.body;

    //default ui Interective
    const ui = {
        web: function () {
            console.log("WEB", body);
        },
    };

    //init
    function init() {
        ui.web();
    }

    //document load
    function loaded() {
        init();
    }

    //window resize
    function resizeUpdate() {}

    //all event
    function eventBindingFunc() {
        document.addEventListener("DOMContentLoaded", loaded);
        window.addEventListener("resize", resizeUpdate);
    }

    //first func
    eventBindingFunc();
})(window);
