/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('should have defined and not empty URLS', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
         });

         it('should have feed names that are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
         });
    });

    describe('The menu', function() {
         it('should be hidden by default', function() {
            expect( $('body').hasClass('menu-hidden') ).toBe(true);
         });

        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect( $('body').hasClass('menu-hidden') ).toBe(false);

            $('.menu-icon-link').trigger( 'click' );
            expect($('body').hasClass('menu-hidden') ).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('contains at least a single .entry element within the .feed container', function() {
            var length = $('.feed').find('.entry').length;
            expect(length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var htmlAfterFirstFeed = $('.feed').html();
        var htmlAfterSecondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                htmlAfterFirstFeed = $('.feed').html();

                loadFeed(1, function() {
                    htmlAfterSecondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('changes its loaded content', function() {
            expect(htmlAfterFirstFeed).not.toBe(htmlAfterSecondFeed);
        });
    })
}());
