(function(global,$,undefined){
    var API_URLS = {
        "FOLLOWERS_IDS":"http://api.twitter.com/1/followers/ids.json?screen_name=",
        "USERS_LOOKUPS":"http://api.twitter.com/1/users/lookup.json?user_id="
    }
    
    $.twitter_lookup = (function(){
        var twitter_lookup;
        
        twitter_lookup.findFollowersForTwitterHandle = function(twitterHandle){
            
        }
            
        return twitter_lookup;
    })();
})(this, this.jQuery)
