describe('Select the active menu item when scrolling', function() {
    after(function() {
        $(window).scrollTop(0);
    });
    it('selects the same menu item when not scrolled enough', function() {
        curlyFunicular.init({
            menu: `#menu`,
            anchors: ['#header', '#works', '#contacts']
        });

        $(window).scrollTop(0);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        $(window).scrollTop($(document).find('[data-anchor]').height() / 2);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        $(window).scrollTop($(document).find('[data-anchor]').height() / 2);
        chai.assert.equal($('#menu').find('.active').index(), 1);
    });
    it('selects the next menu item when scrolled enough', function() {
        curlyFunicular.init({
            menu: '#menu',
            anchors: ['#header', '#works', '#contacts']
        });

        $(window).scrollTop(0);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        for (let i = 1; i < 3; i++) {
            $(window).scrollTop($(document).find('[data-anchor]').height() * i);
            chai.assert.equal($('#menu').find('.active').index(), i);
        }
    });
    it('selects the same menu item when not scrolled enough with offset', function() {
        curlyFunicular.init({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });
        $(window).scrollTop(0);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        $(window).scrollTop($(document).find('[data-anchor]').height() - 201);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        $(window).scrollTop($(document).find('[data-anchor]').height() - 200);
        chai.assert.equal($('#menu').find('.active').index(), 1);
    });
    it('selects the next menu item when scrolled enough with offset', function() {
        curlyFunicular.init({
            menu: 'menu',
            anchors: ['#header', '#works', '#contacts'],
            offset: 200
        });

        $(window).scrollTop(0);
        chai.assert.equal($('#menu').find('.active').index(), 0);

        for (let i = 1; i < 3; i++) {
            $(window).scrollTop($(document).find('[data-anchor]').height() * i - 201);
            chai.assert.equal($('#menu').find('.active').index(), i - 1);
            $(window).scrollTop($(document).find('[data-anchor]').height() * i - 200);
            chai.assert.equal($('#menu').find('.active').index(), i);
        }
    });
});