(function(window) {
    let anchors;
    let offset;
    let previousAnchor;

    window.curlyFunicular = function (config) {
        ({anchors, offset} = config);
        offset = offset || 0;
        previousAnchor = anchors[0];

        if (!window.location.hash) {
            window.location.hash = anchors[0];
        }

        selectMenuItem(window.location.hash);
        handleClick();
        listenEvent();
    }

    function listenEvent() {
        window.addEventListener('scroll', function() {
            let isMenuChanged = false;
            for (let i = 0; i < anchors.length - 1; i++) {
                let topElement = `[data-cfanchor="${anchors[i].replace('#', '')}"]`;
                let bottomElement = `[data-cfanchor="${anchors[i + 1].replace('#', '')}"]`;
                if (
                    window.pageYOffset >= document.querySelector(topElement).pageYOffset - offset &&
                    window.pageYOffset < document.querySelector(bottomElement).pageYOffset - offset
                ) {
                    isMenuChanged = true;
                    selectMenuItem(anchors[i]);
                }
            }

            if (!isMenuChanged) {
                selectMenuItem(anchors[anchors.length - 1]);
            }
        });
    }

    function selectMenuItem(anchor) {
        if (anchor === previousAnchor) {
            return;
        }

        previousAnchor = anchor;
        window.location.hash = anchor;
        
        let menuItems = document.querySelectorAll('[data-cfmenuanchor]');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('cfactive');
            if (menuItems[i].dataset.cfmenuanchor === anchor.replace('#', '')) {
                menuItems[i].classList.add('cfactive');
            }
        }
    }

    function handleClick() {
        let menuItems = document.querySelectorAll(`[data-cfmenuanchor]`);
        for (let i = 0; i < menuItems.length; i++) {
            let target = `[data-cfanchor="${menuItems[i].dataset.cfmenuanchor}"]`;
            window.scrollTo(document.querySelector(target));
        }
    }
})(window);