(function(global,$,undefined){
    var API_URLS = {
        "FOLLOWERS_IDS":"http://api.twitter.com/1/followers/ids.json?screen_name=",
        "USERS_LOOKUPS":"http://api.twitter.com/1/users/lookup.json?user_id="
    }
    
    $.twitter_lookup = (function(){
        var twitter_lookup = {};
        
        twitter_lookup.getTwitterFollowersPromise = function(twitterHandle){
             var userRequest = $.ajax({
                url:API_URLS.FOLLOWERS_IDS+twitterHandle,
                dataType:"jsonp"
             });

             userRequest = userRequest.pipe(function(data){
                     data.ids.length = 100;
                     return $.ajax({
                        url:API_URLS.USERS_LOOKUPS+data.ids.join(","),
                        dataType:"jsonp"
                     });
             });

             userRequest.then(function(){
                console.log(arguments);
             });

             return userRequest;
        }
            
        return twitter_lookup;
    })();
})(this, this.jQuery)
