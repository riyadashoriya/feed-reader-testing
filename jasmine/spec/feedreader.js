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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has url defined', () => {
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.trim().length).not.toEqual(0);
            }
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has name defined', () => {
            for(feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.trim().length).not.toEqual(0);
            }
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', () => {

        /* Test that ensures the menu element is
         * hidden by default. Uses jasmine-jquery plugin 
         * to check if menu element has class 'menu-hidden'
         */
        it('menu is hidden', () => {
            expect($('body')).toHaveClass('menu-hidden');
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility', () => {
            var spyEvent = spyOnEvent('.menu-icon-link', 'click');
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect($('body')).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect($('body')).toHaveClass('menu-hidden');
        });

    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', () => {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container ('.feed .entry').
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
           loadFeed(0, done);
        });

        it('atleast one entry element is there in feed container', () => {
            expect($('.feed .entry').length).toBeGreaterThan(1);
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous. done is callback function.
         */
         let oldFeedText;

        beforeEach((done) => {
           loadFeed(0, () => {
               oldFeedText = $('.feed').text();
               loadFeed(1, done); 
           });
       });

        it('content actually changes when a new feed is loaded', () => {
            expect($('.feed').text()).not.toBe(oldFeedText);
        });
    });

}());
