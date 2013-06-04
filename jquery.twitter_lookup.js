(function(global,$,undefined){
    var API_URLS = {
        "FOLLOWERS_IDS":"http://api.twitter.com/1/followers/ids.json?screen_name=",
        "USERS_LOOKUPS":"http://api.twitter.com/1/users/lookup.json?user_id="
    };
    
    $.twitter_lookup = (function(){
        var twitter_lookup = {};
        
        twitter_lookup.getTwitterFollowersByHandle = function(twitterHandle, /*opt*/ callback){
             var followersRequest = $.ajax({
                url:API_URLS.FOLLOWERS_IDS+twitterHandle,
                dataType:"jsonp"
             });

             var userRequest = followersRequest.pipe(function(data){
                     var ids = twitter_lookup.utils.splitBy(data.ids,100);
                     var deferreds = [];
                     for(var i=0,len=ids.length;i<len;i++){
                         var innerIds = ids[i];
                         var deferred = $.ajax({
                            url:API_URLS.USERS_LOOKUPS+innerIds.join(","),
                            dataType:"jsonp"
                         });
                        deferreds.push(deferred);
                     }
                     return $.when.apply(null, deferreds);
             });

             var finalRequest = userRequest.pipe(function(){
                var followers = Array.prototype.map.call(arguments,function(val){
                    return val[0];
                });

                var flattened = Array.prototype.concat.apply([], followers);
                return flattened;
             });
            
            finalRequest.then(callback);

            return finalRequest;
        };
            
        twitter_lookup.utils = {};
        twitter_lookup.utils.splitBy = function(arr, count){
               var splitBy = [];
               for(var i = 0, times = arr.length/count;i<times;i++){
                splitBy[i] = arr.slice(i*count, (i*count)+count);
               }
               return splitBy;
        };

        return twitter_lookup;
    })();
})(this, this.jQuery);

