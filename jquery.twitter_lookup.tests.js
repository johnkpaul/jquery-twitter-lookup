$(document).ready(function(){
        module("Twitter Lookup tests");

        test("follower lookup returns promise", function(){
                var promise = $.twitter_lookup.getTwitterFollowersPromise("johnkpaul");
                expect(1);
                ok(isAjQueryPromise(promise));
                
        });


        function isAjQueryPromise(promise){
                return typeof(promise.then) == "function"
        }
});
