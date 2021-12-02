//ES5 ~ ES6
(function (window) {
    const body = document.body;
    const nav = document.querySelector(".nav");
    const navList = nav.querySelectorAll("li");
    const navDepth = nav.querySelectorAll("li.nav-depth");

    const cloud = document.querySelector(".cloud");
    const cloudChild = document.querySelectorAll(".cd");
    const rocket = document.querySelector(".rocket");
    const logo = document.querySelector(".visual-logo");
    const visualText = document.querySelectorAll(".visual");
    const visualSubTxt = document.querySelector(".visual-text-subline");
    const pipe = document.querySelector(".pg-pips");
    const contentsList = document.querySelectorAll(".main-contents-list");

    function visualTxt() {
        if (!visualText) {
            return;
        }

        const added = function () {
            return [].forEach.call(visualText, function (x) {
                x.classList.add("move");
            });
        };

        const removed = function () {
            return [].forEach.call(visualText, function (x) {
                x.classList.remove("move");
            });
        };

        return {
            added,
            removed,
        };
    }

    function contents() {
        if (!contentsList) {
            return;
        }

        const added = function () {
            return [].forEach.call(contentsList, function (x) {
                x.classList.add("on");
            });
        };

        const removed = function () {
            return [].forEach.call(contentsList, function (x) {
                x.classList.remove("on");
            });
        };

        return {
            added,
            removed,
        };
    }

    let options = {
        //Navigation
        menu: ".pg-pips",
        licenseKey: "B52000B1-025845BC-A12F8052-779ED351", //저작권은 퍼블리셔에게 있습니다.
        lockAnchors: false,
        anchors: ["anchors1", "anchors2", "anchors3", "anchors4"],
        navigation: false,
        navigationPosition: "right",
        // navigationTooltips: ["firstSlide", "secondSlide"],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: "bottom",

        //Scrolling
        css3: true,
        scrollingSpeed: 1500,
        fitToSection: true,
        scrollBar: false,
        easing: "easeInOutCubic",
        easingcss3: "ease",
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        // paddingTop: "3em",
        // paddingBottom: "10px",
        //fixedElements: "#header, .footer",
        // responsiveWidth: 1366,
        // responsiveHeight: 768,

        //Custom selectors
        sectionSelector: ".section",
        //slideSelector: ".slide",

        //lazyLoading: true,

        //events
        onLeave: function (origin, destination, direction) {
            if (destination.index === 1) {
                visualTxt().added();
                logo.classList.add("move");
                visualSubTxt.classList.add("move");
                //add
                cloud.classList.add("on");
                rocket.classList.add("move");
                logo.classList.add("second");
                //remove
                contents().removed();
                logo.classList.remove("third");
                pipe.classList.remove("hide");
            } else if (destination.index === 2) {
                //add
                visualTxt().added();
                contents().added();

                logo.classList.add("move");
                logo.classList.add("third");
                visualSubTxt.classList.add("move");
                cloud.classList.add("on");
                rocket.classList.add("move");
                //remove
                logo.classList.remove("stop");
                logo.classList.remove("second");
                pipe.classList.remove("hide");
            } else if (destination.index === 3) {
                //add
                pipe.classList.add("hide");
                logo.classList.add("stop");
                //remove
                contents().added();
                visualTxt().removed();
                logo.classList.remove("move");
                logo.classList.remove("third");
                visualSubTxt.classList.remove("move");
            } else {
                visualTxt().added();
                contents().added();

                logo.classList.add("move");
                visualSubTxt.classList.add("move");

                //remove
                logo.classList.remove("second");
                logo.classList.remove("third");
                pipe.classList.remove("hide");
            }

            //좌측메뉴
            const data = document.querySelector("[data-id='" + destination.index + "']");
            const allData = document.querySelectorAll("[data-id]");
            [].forEach.call(allData, function (el, i) {
                el.classList.remove("active");
                el.style.height = "";
            });
            if (data) {
                data.classList.add("active");
                const _getHeight = data.querySelector(".nav-list");
                if (_getHeight === null) {
                    return;
                } else {
                    data.style.height = _getHeight.getBoundingClientRect().height + 48 + "px";
                }
            }
        },
        afterLoad: function (origin, destination, direction) {
            if (destination.index === 0) {
                cloud.classList.remove("on");
                rocket.classList.remove("move");
            } else if (destination.index === 1) {
                cloud.classList.add("on");
                rocket.classList.add("move");
            } else if (destination.index === 2) {
                cloud.classList.add("on");
                rocket.classList.add("move");
            }
            logo.classList.remove("move");
            visualSubTxt.classList.remove("move");
            visualTxt().removed();
        },
        afterRender: function () {
            const pluginContainer = this;

            if (pluginContainer.index === 1) {
                logo.classList.add("second");
                logo.classList.remove("third");
            } else if (pluginContainer.index === 2) {
                logo.classList.add("third");
                logo.classList.remove("second");
            } else {
                contents().added();

                logo.classList.remove("second");
                logo.classList.remove("third");
            }
        },
        afterResize: function (width, height) {},
        afterReBuild: function () {},
        afterResponsive: function (isResponsive) {},
        afterSlideLoad: function (section, origin, destination, direction) {},
        onSlideLeave: function (section, origin, destination, direction) {},
    };

    let mercuryFullpage = new fullpage("#fullpage", options);

    //default ui Interective
    const ui = {
        gnb: function () {
            if (nav && navList.length > 0) {
                [].forEach.call(navDepth, function (x, index) {
                    const getHeight = x.scrollHeight;
                    x.addEventListener("click", navBindingFunc(x, getHeight));
                });
            }

            function navBindingFunc(x, getHeight) {
                return function (e) {
                    if (e.currentTarget.style.height === "") {
                        e.currentTarget.style.height = getHeight + "px";
                    } else {
                        e.currentTarget.style.height = "";
                    }
                    this.classList.toggle("active");
                };
            }
        },
        //

        //애니메이션
        animation: function () {
            // if (nav) {
            //     [].forEach.call(navList, function (item, index) {
            //         item.classList.add("on");
            //     });
            // }
        },

        //window resize
        resizeUpdate: function () {
            let winW = window.innerWidth;

            if (winW > 1365) {
                //윈도우 사이즈가 1365보다 클때
            } else {
                //윈도우 사이즈가 1365보다 작을때
            }
        },

        //메인 풀페이지
        fullpages: function () {
            this.resizeUpdate();
        },
    };

    //init
    function init() {
        ui.animation();
        ui.fullpages();
        ui.gnb();
    }

    //document load
    function loaded() {
        init();
    }

    //all event
    function eventBindingFunc() {
        document.addEventListener("DOMContentLoaded", loaded);
        window.addEventListener("resize", ui.resizeUpdate);
    }

    //first func
    eventBindingFunc();
})(window);
