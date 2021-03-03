(function(window) {
    let menu;
    let anchors;
    let offset = 0;

    window.curlyFunicular = {
        init(config) {
            Object.assign({menu, anchors, offset}, config);

            this.listenEvent();
        },

        listenEvent() {
            
        }
    }

})(window);