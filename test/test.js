describe('Select the active menu item when scrolling', function() {
    it('selects the same menu item when not scrolled enough', function() {
        let curlyFunicular = new CurlyFunicular({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
        });
        $(window).scrollTop();
    });
    it('selects the next menu item when scrolled enough', function() {
        let curlyFunicular = new CurlyFunicular({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
        });
        $(window).scrollTop(0);
        assert.equal($('#desktop-panel').find('.active[data-menuanchor="header"]').index(), 0);
        for (let i = 1; i < 3; i++) {
            $(window).scrollTop();
            assert.equal($('#desktop-panel').find('.active[data-menuanchor=""]').index(), i);
        }
    });
    it('selects the same menu item when not scrolled enough with offset', function() {
        let curlyFunicular = new CurlyFunicular({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });
        $(window).scrollTop();
    });
    it('selects the next menu item when scrolled enough with offset', function() {
        let curlyFunicular = new CurlyFunicular({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });
        $(window).scrollTop(0);
        assert.equal($('#desktop-panel').find('.active[data-menuanchor="header"]').index(), 0);
        for (let i = 1; i < 3; i++) {
            $(window).scrollTop();
            assert.equal($('#desktop-panel').find('.active[data-menuanchor=""]').index(), i);
        }
    });
});