function timeout() {
    return new Promise(resolve => setTimeout(resolve));
}

describe('Select the active menu item when scrolling', function () {
    after(function () {
        $(window).scrollTop($(document).height());
    });
    describe('Without offset', function () {
        it('selects the same menu item when not scrolled enough', async function () {
            curlyFunicular({
                menu: '#menu',
                anchors: ['#header', '#works', '#contacts']
            });

            await timeout($(window).scrollTop($(document).find('[data-cfanchor]').height() - 1));
            chai.assert.equal($(document).find('.cfactive').index(), 0);

            await timeout($(window).scrollTop($(document).find('[data-cfanchor]').height()));
            console.log($(document).find('.cfactive').index());
            chai.assert.equal($(document).find('.cfactive').index(), 1);
        });
        it('selects the next menu item when scrolled enough', function () {
            curlyFunicular({
                menu: '#menu',
                anchors: ['#header', '#works', '#contacts']
            });

            for (let i = 1; i < 3; i++) {
                $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 1);
                setTimeout(() => {
                    chai.assert.equal($(document).find('.cfactive').index(), i - 1);
                });

                $(window).scrollTop($(document).find('[data-cfanchor]').height() * i);
                setTimeout(() => {
                    chai.assert.equal($(document).find('.cfactive').index(), i);
                });
            }
        });
    });
    describe('With offset', function () {
        it('selects the same menu item when not scrolled enough with offset', function () {
            curlyFunicular({
                menu: '#menu',
                anchors: ['#header', '#works', '#contacts'],
                offset: 200
            });

            $(window).scrollTop($(document).find('[data-cfanchor]').height() - 201);
            setTimeout(() => {
                chai.assert.equal($(document).find('.cfactive').index(), 0);
            });

            $(window).scrollTop($(document).find('[data-cfanchor]').height() - 200);
            setTimeout(() => {
                chai.assert.equal($(document).find('.cfactive').index(), 1);
            });
        });
        it('selects the next menu item when scrolled enough with offset', function () {
            curlyFunicular({
                menu: '#menu',
                anchors: ['#header', '#works', '#contacts'],
                offset: 200
            });

            for (let i = 1; i < 3; i++) {
                $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 201);
                setTimeout(() => {
                    chai.assert.equal($(document).find('.cfactive').index(), i - 1);
                });

                $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 200);
                setTimeout(() => {
                    chai.assert.equal($(document).find('.cfactive').index(), i);
                });
            }
        });
    });
});