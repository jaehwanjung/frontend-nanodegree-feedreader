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

    // Test suite for RSS feed objects
    describe('RSS Feeds', function () {

        // Tests the RSS feed list is defined and not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            // Check if allFeeds is an array, for robustness of the spec
            expect(allFeeds instanceof Array).toBeTruthy();
        });

        // Tests if each RSS feed object has a URL defined that is not empty
        it('have a non-empty URL defined', function () {
            $.each(allFeeds, function (index, feed) {
                var feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl).not.toBe('');
                // Tests if the URL is of the correct format
                expect(feedUrl).toMatch(/^http(s?)\:\/\//);
            });
        });

        // Tests if each RSS feed object has a name defined that is not empty
        it('have a non-empty name defined', function () {
            $.each(allFeeds, function (index, feed) {
                var feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName).not.toBe('');
                expect(typeof feedName).toBe('string');
            });
        });
    });

    // Test suite for the menu
    describe('The menu', function () {
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        // Tests if the menu is hidden by default
        it('is hidden by default', function () {
            var isHidden = isMenuHidden();

            expect(isHidden).toBe(true);
        });

        // Returns true if the menu is hidden
        function isMenuHidden() {
            return body.hasClass('menu-hidden');
        }

        // Tests if the menu is visible when first clicked, and then hidden when clicked again
        it('\'s visibility is toggled when clicked', function () {
            clickMenu();
            var isHiddenAfterFirstClick = isMenuHidden();
            clickMenu();
            var isHiddenAfterSecondClick = isMenuHidden();

            expect(isHiddenAfterFirstClick).toBe(false);
            expect(isHiddenAfterSecondClick).toBe(true);
        });

        // Triggers the click event on the menu
        function clickMenu() {
            menuIcon.trigger('click');
        }
    });

    // Test suite for the initial RSS feed entries
    describe('Initial Entries', function () {
        // Simulates async operation of loadFeed
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

    // Test suite for new feeds
    describe('New Feed Selection', function () {
        var originalContent;

        // Simulates async operations of loadFeed
        beforeEach(function (done) {
            // Saves the original content of the feed html to detect changes
            originalContent = $('.feed').html();
            loadFeed(1, function () {
                done();
            });
        }, 1000);

        // Tests if the content of the feed html actually changes when a new feed is loaded
        it("the content actually changes when a new feed is loaded", function (done) {
            var newContent = $('.feed').html();
            expect(originalContent).not.toBe(newContent);
            done();
        });
    });
}());
