/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            // Check if allFeeds is an array, for robustness of the spec
            expect(allFeeds instanceof Array).toBeTruthy();
        });

        it('have a non-empty URL defined', function () {
            $.each(allFeeds, function (index, feed) {
                var feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl).not.toBe('');
                expect(feedUrl).toMatch(/^http(s?)\:\/\//);
            });
        });

        it('have a non-empty name defined', function () {
            $.each(allFeeds, function (index, feed) {
                var feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName).not.toBe('');
                expect(typeof feedName).toBe('string');
            });
        });
    });


    describe('The menu', function () {
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('is hidden by default', function () {
            var isHidden = isMenuHidden();

            expect(isHidden).toBe(true);
        });

        function isMenuHidden() {
            return body.hasClass('menu-hidden');
        }

        it('\'s visibility is toggled when clicked', function () {
            clickMenu();
            var isHiddenAfterFirstClick = isMenuHidden();
            clickMenu();
            var isHiddenAfterSecondClick = isMenuHidden();

            expect(isHiddenAfterFirstClick).toBe(false);
            expect(isHiddenAfterSecondClick).toBe(true);
        });

        function clickMenu() {
            menuIcon.trigger('click');
        }
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        }, 1000);

        it("at least a single .entry element exists after loadFeed is completed", function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        var originalContent;

        beforeEach(function (done) {
            originalContent = $('.feed').html();
            loadFeed(1, function () {
                done();
            });
        }, 1000);

        it("the content actually changes when a new feed is loaded", function (done) {
            var newContent = $('.feed').html();
            expect(originalContent).not.toBe(newContent);
            done();
        });
    });
}());
