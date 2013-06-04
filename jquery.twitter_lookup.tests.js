/*global module:false, test: false, $:false, expect: false, deepEqual: false, start: false, asyncTest: false, ok: false*/
module("Twitter Lookup tests");

test("follower lookup returns promise", function(){
        var promise = $.twitter_lookup.getTwitterFollowersByHandle("johnkpaul");
        expect(1);
        ok(isAjQueryPromise(promise));
});

asyncTest("follower lookup", function(){
        setupMocksForFollowerLookup();
        var promise = $.twitter_lookup.getTwitterFollowersByHandle("johnkpaul");
        expect(1);
        promise.then(function(followers){
                var expected = [{"screen_name":"logtailer"},{"screen_name":"test_screename"}];
                deepEqual(followers,expected, "followers are expected"); 
                $.mockjaxClear();
                start();
        });
});

asyncTest("follower lookup executes callback as parameter", function(){
        setupMocksForFollowerLookup();
        expect(1);
        var callback = function(followers){
                var expected = [{"screen_name":"logtailer"},{"screen_name":"test_screename"}];
                deepEqual(followers,expected, "followers are expected"); 
                $.mockjaxClear();
                start();
        };
        $.twitter_lookup.getTwitterFollowersByHandle("johnkpaul",callback);
});

module("utility functions");
test("splitBy splits even array by even number", function(){
       var testArray = [1,2,3,4,5,6,7,8,9,10]; 
       var split = $.twitter_lookup.utils.splitBy(testArray,2);
       expect(5);
       deepEqual(split[0],[1,2]);
       deepEqual(split[1],[3,4]);
       deepEqual(split[2],[5,6]);
       deepEqual(split[3],[7,8]);
       deepEqual(split[4],[9,10]);
});

test("splitBy splits odd array by even number", function(){
       var testArray = [1,2,3,4,5,6,7,8,9]; 
       var split = $.twitter_lookup.utils.splitBy(testArray,2);
       expect(5);
       deepEqual(split[0],[1,2]);
       deepEqual(split[1],[3,4]);
       deepEqual(split[2],[5,6]);
       deepEqual(split[3],[7,8]);
       deepEqual(split[4],[9]);
});

test("splitBy splits odd array by odd number", function(){
       var testArray = [1,2,3,4,5,6,7,8,9]; 
       var split = $.twitter_lookup.utils.splitBy(testArray,3);
       expect(3);
       deepEqual(split[0],[1,2,3]);
       deepEqual(split[1],[4,5,6]);
       deepEqual(split[2],[7,8,9]);
});

test("splitBy splits even array by odd number", function(){
       var testArray = [1,2,3,4,5,6,7,8,9,10];
       var split = $.twitter_lookup.utils.splitBy(testArray,3);
       expect(4);
       deepEqual(split[0],[1,2,3]);
       deepEqual(split[1],[4,5,6]);
       deepEqual(split[2],[7,8,9]);
       deepEqual(split[3],[10]);
});

function isAjQueryPromise(promise){
        return typeof(promise.then) === "function";
}

function setupMocksForFollowerLookup(){
        $.mockjax({
                url:"http://api.twitter.com/1/followers/ids.json?screen_name=johnkpaul",
                contentType: 'text/json',
                responseText:{
                        success:true,
                        ids:[1,2]
                }
        });
        $.mockjax({
                url:"http://api.twitter.com/1/users/lookup.json?user_id=1,2",
                responseText:[[{"screen_name":"logtailer"},{"screen_name":"test_screename"}]]
        });
}
