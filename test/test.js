describe('Select the active menu item when scrolling', function() {
    it('selects the same menu item when not scrolled enough', function() {
        curlyFunicular.init({
            menu: `#menu`,
            anchors: ['#header', '#works', '#contacts'],
        });

        $(window).scrollTop(0);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        $(window).scrollTop($('#header').clientHeight / 2);
        chai.assert.equal($('#menu').find('.active').index(), 0);
    });
    it('selects the next menu item when scrolled enough', function() {
        curlyFunicular.init({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
        });
        $(window).scrollTop(0);
        chai.assert.equal($('#desktop-panel').find('.active').index(), 0);
        for (let i = 1; i < 3; i++) {
            $(window).scrollTop($('#header').clientHeight * i);
            chai.assert.equal($('#desktop-panel').find('.active').index(), i);
        }
    });
    it('selects the same menu item when not scrolled enough with offset', function() {
        curlyFunicular.init({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });
        $(window).scrollTop();
    });
    it('selects the next menu item when scrolled enough with offset', function() {
        curlyFunicular.init({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });
        $(window).scrollTop(0);
        chai.assert.equal($('#desktop-panel').find('.active[data-menuanchor="header"]').index(), 0);
        for (let i = 1; i < 3; i++) {
            $(window).scrollTop();
            chai.assert.equal($('#desktop-panel').find('.active[data-menuanchor=""]').index(), i);
        }
    });
});