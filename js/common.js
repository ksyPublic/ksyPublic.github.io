//ES5 ~ ES6
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

(function (window) {
    //즉시 실행함수
    const nav = document.querySelector(".nav");
    const tabsTitles = document.querySelectorAll(".tabs-title-wrap li");
    const tabsContents = document.querySelectorAll(".tabs-contents-wrap .tabs-content");
    const buttonGroup = document.querySelectorAll(".button-group .button");
    const select = document.querySelectorAll(".select");
    const privacyInfo = document.getElementById("privacyInfo");
    //default ui Interective

    const ui = {
        selectColorRize: function () {
            [].forEach.call(select, function (x) {
                x.addEventListener("change", function (e) {
                    e.target.style.color = "#000";
                });
            });
        },
        buttonSelection: function () {
            [].forEach.call(buttonGroup, function (x) {
                x.addEventListener("click", function (e) {
                    e.preventDefault();
                    const type = e.currentTarget.parentElement.dataset.selection;

                    if (type === "single") {
                        //single

                        [].forEach.call(buttonGroup, function (x) {
                            x.classList.remove("active");
                        });

                        e.target.classList.toggle("active");
                    } else {
                        //multiple
                        e.target.classList.toggle("active");
                    }
                });
            });
        },
        tabs: function () {
            if (tabsTitles) {
                [].forEach.call(tabsTitles, function (tabsTarget) {
                    tabsTarget.addEventListener("click", tabsTitleClied, false);
                });
            }

            function tabsTitleClied(e) {
                [].forEach.call(tabsTitles, function (x, index) {
                    x.classList.remove("active");
                    tabsContents[index].classList.remove("active");

                    if (e.currentTarget.dataset.rel === tabsContents[index].id) {
                        tabsContents[index].classList.add("active");
                    }
                });

                e.currentTarget.classList.add("active");
            }
        },
        gnb: function () {
            if (nav) {
                const navDepth = nav.querySelectorAll("li.nav-depth a");

                [].forEach.call(navDepth, function (x, index) {
                    const getHeight = x.parentElement.scrollHeight;
                    x.addEventListener("click", navBindingFunc(x, getHeight));
                });
            }

            function navBindingFunc(x, getHeight) {
                return function (event) {
                    if (event.currentTarget.parentElement.style.height === "") {
                        event.currentTarget.parentElement.style.height = getHeight + "px";
                    } else {
                        event.currentTarget.parentElement.style.height = "";
                    }
                    event.currentTarget.parentElement.classList.toggle("active");
                };
            }
        },
        //

        iframeInnerPrivayCSS: function () {
            if (privacyInfo) {
                const priv = privacyInfo.contentWindow.document;
                const contents = priv.getElementsByClassName("suv-contents")[0];
                const container = priv.getElementsByClassName("suv-container")[0];
                const title = priv.getElementsByClassName("privacy-title")[0];
                const section2 = priv.getElementsByClassName("suv-section")[1];
                const info = priv.getElementsByClassName("privacy-info")[0];
                contents.style.padding = "20px";
                container.style.minWidth = "auto";
                container.style.overflow = "hidden";
                priv.body.style.minWidth = "auto";
                info.style.paddingBottom = 0;
                title.remove();
                section2.remove();
            }
        },
    };
    //init
    function init() {
        ui.gnb();
        ui.tabs();
        ui.buttonSelection();
        ui.selectColorRize();
    }

    //document load
    function loaded() {
        init();
    }

    //all event
    function eventBindingFunc() {
        document.addEventListener("DOMContentLoaded", loaded);
    }

    window.onload = function () {
        ui.iframeInnerPrivayCSS();
    };

    //first func
    eventBindingFunc();
})(window);

/* HTML에서 재사용할 목록은 여기 밑으로 작성 */
const loadings = document.querySelector(".loading-wrap");
const body = document.body;
const cloud = document.querySelector(".cloud");
const rocket = document.querySelector(".rocket");
const logoAll = document.querySelectorAll(".visual-logo");
const visualText = document.querySelectorAll(".visual");
const pipe = document.querySelector(".pg-pips");
const mainContents = document.querySelector(".main-contents");

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
    scrollingSpeed: 1200,
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

    // lazyLoading: true,

    //events
    onLeave: function (origin, destination, direction) {
        //데이터
        const data = document.querySelector("[data-id='" + destination.index + "']");
        const allData = document.querySelectorAll("[data-id]");

        //로고
        const logoNumber = document.querySelector("[data-logo='" + destination.index + "']");
        const lastLogo = document.querySelector("[data-logo='2']");

        //비쥬얼 텍스트

        [].forEach.call(logoAll, function (l, index) {
            l.classList.add("on");
        });

        //전체 설정
        if (logoNumber) {
            logoNumber.classList.remove("on");
        }

        //개별 설정
        if (direction === "down") {
            //down
            if (destination.index === 1) {
                cloud.classList.add("on");
                //
            } else if (destination.index === 2) {
                //
            } else if (destination.index === 3) {
                if (lastLogo) {
                    lastLogo.classList.remove("on");
                }

                pipe.classList.add("hide");
            } else {
                // index === 0
            }
        } else {
            //up
            if (destination.index === 1) {
                // mainContents.classList.remove("on");
            } else if (destination.index === 2) {
                pipe.classList.remove("hide");
            } else if (destination.index === 3) {
                //
            } else {
                //index === 0
                cloud.classList.remove("on");
                // rocket.classList.remove("on");
            }
        }

        //좌측메뉴

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
    //load 및 이벤트가 완전히 끝난뒤 실행
    afterLoad: function (origin, destination, direction) {
        //로고

        //비쥬얼 텍스트
        const _visualText = document.querySelector("[data-text='" + destination.index + "']");
        const lastText = document.querySelector("[data-text='2']");

        [].forEach.call(visualText, function (x, index) {
            x.classList.add("on");
        });

        //전체 설정
        if (_visualText) {
            _visualText.classList.remove("on");
        }

        //개별 설정
        if (direction === "down") {
            //down
            if (destination.index === 1) {
                rocket.classList.add("on");
                //
            } else if (destination.index === 2) {
                mainContents.classList.add("on");
                rocket.classList.remove("on");
                //
            } else if (destination.index === 3) {
                if (lastText) {
                    lastText.classList.remove("on");
                }
                mainContents.classList.add("on");
            } else {
                // index === 0
            }
        } else {
            //up
            if (destination.index === 1) {
                mainContents.classList.remove("on");
                rocket.classList.add("on");
            } else if (destination.index === 2) {
            } else if (destination.index === 3) {
                //
            } else {
                //index === 0
                rocket.classList.remove("on");
            }
        }
    },

    //랜더링
    afterRender: function () {
        //초기화
        const _logoNumber = document.querySelector("[data-logo='" + this.index + "']");
        const _visualText = document.querySelector("[data-text='" + this.index + "']");

        [].forEach.call(logoAll, function (x, index) {
            x.classList.add("on");
            visualText[index].classList.add("on");
        });

        _logoNumber.classList.remove("on");
        _visualText.classList.remove("on");
    },
    afterResize: function (width, height) {},
    afterReBuild: function () {},
    afterResponsive: function (isResponsive) {},
    afterSlideLoad: function (section, origin, destination, direction) {},
    onSlideLeave: function (section, origin, destination, direction) {},
};

function getFrameDocuments(query) {
    let frame = document.querySelector(query);
    if (frame == null) return;

    let frameDocument = frame.contentWindow || frame.contentDocument;
    return frameDocument;
}

function fullpageLoad() {
    let mercuryFullpage = new fullpage("#fullpage", options);
}

//로딩
function loading() {
    const open = function () {
        loadings.classList.add("on");
    };

    const close = function () {
        loadings.classList.remove("on");
    };

    return { open: open, close: close };
}
