//ES5 ~ ES6
(function (window) {
    const body = document.body;
    const nav = document.querySelector(".nav");
    const navList = nav.querySelectorAll("li");

    //default ui Interective
    const ui = {
        web: function () {
            console.log("WEB", body);
        },

        animation: function () {
            if (nav) {
                [].forEach.call(navList, function (item, index) {
                    item.classList.add("on");
                });
            }
        },
    };

    //init
    function init() {
        ui.web();
        ui.animation();
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
