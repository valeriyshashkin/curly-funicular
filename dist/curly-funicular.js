/*!
 * curly-funicular 1.0.0
 *
 * https://github.com/valeriyshashkin/curly-funiculars
 * @license MIT licensed
 *
 * Copyright (c) 2021 valeriyshashkin
 */
(function (global) {
    let menu;
    let anchors;
    let offset;
    let previousAnchor;

    global.curlyFunicular = (config) => {
        menu = config.menu;
        anchors = config.anchors;
        offset = config.offset || 0;
        previousAnchor = anchors[0];

        if (!window.location.hash) {
            window.location.hash = anchors[0];
        }

        selectMenuItem(window.location.hash);
        handleMenuItemClicks();
        listenScroll();
    };

    const listenScroll = () => {
        window.addEventListener('scroll', () => {
            let isMenuChanged = false;
            for (let i = 0; i < anchors.length - 1; i++) {
                let topElement = `[data-cfanchor="${anchors[i].replace('#', '')}"]`;
                let bottomElement = `[data-cfanchor="${anchors[i + 1].replace('#', '')}"]`;
                if (
                    window.pageYOffset >= document.querySelector(topElement).offsetTop - offset &&
                    window.pageYOffset < document.querySelector(bottomElement).offsetTop - offset
                ) {
                    isMenuChanged = true;
                    selectMenuItem(anchors[i]);
                }
            }

            if (!isMenuChanged) {
                selectMenuItem(anchors[anchors.length - 1]);
            }
        });
    };

    const selectMenuItem = (anchor) => {
        if (anchor === previousAnchor) {
            return;
        }

        previousAnchor = anchor;
        window.location.hash = anchor;

        let menuItems = document.querySelectorAll(`${menu} > [data-cfmenuanchor]`);
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('cfactive');
            if (menuItems[i].dataset.cfmenuanchor === anchor.replace('#', '')) {
                menuItems[i].classList.add('cfactive');
            }
        }
    };

    const handleMenuItemClicks = () => {
        let menuItems = document.querySelectorAll(`${menu} > [data-cfmenuanchor]`);
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click touchstart', () => {
                let target = `[data-cfanchor="${menuItems[i].dataset.cfmenuanchor}"]`;
                window.scrollTo(0, document.querySelector(target).offsetTop);
            });
        }
    };
})(window);