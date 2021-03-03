class CurlyFunicular {
    constructor (config) {
        this.anchors = config.anchors;
        this.offset = config.offset || 0;
        this.previousAnchor = this.anchors[0];

        if (!window.location.hash) {
            window.location.hash = this.anchors[0];
        }

        this.selectMenuItem(window.location.hash);
        this.handleClick();
        this.listenEvent();
    }

    listenEvent() {
        window.addEventListener('scroll', () => {
            let isMenuChanged = false;
            for (let i = 0; i < this.anchors.length - 1; i++) {
                let topElement = `[data-cfanchor="${this.anchors[i].replace('#', '')}"]`;
                let bottomElement = `[data-cfanchor="${this.anchors[i + 1].replace('#', '')}"]`;
                if (
                    window.pageYOffset >= document.querySelector(topElement).offsetTop - this.offset &&
                    window.pageYOffset < document.querySelector(bottomElement).offsetTop - this.offset
                ) {
                    isMenuChanged = true;
                    this.selectMenuItem(this.anchors[i]);
                }
            }

            if (!isMenuChanged) {
                this.selectMenuItem(this.anchors[this.anchors.length - 1]);
            }
        });
    }

    selectMenuItem(anchor) {
        if (anchor === this.previousAnchor) {
            return;
        }

        this.previousAnchor = anchor;
        window.location.hash = anchor;
        
        let menuItems = document.querySelectorAll('[data-cfmenuanchor]');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('cfactive');
            if (menuItems[i].dataset.cfmenuanchor === anchor.replace('#', '')) {
                menuItems[i].classList.add('cfactive');
            }
        }
    }

    handleClick() {
        let menuItems = document.querySelectorAll(`[data-cfmenuanchor]`);
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', () => {
                let target = `[data-cfanchor="${menuItems[i].dataset.cfmenuanchor}"]`;
                window.scrollTo(0, document.querySelector(target).offsetTop);
            });
        }
    }
}