var ICache = (function() {

  var cacheList = [];

  CacheUtility = {

    readFileContents: function(uri) {

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var script = document.createElement('script');
            script.innerText = xhr.responseText;
            document.documentElement.firstChild.appendChild(script);
          }
        }
      }

      xhr.open('GET', uri, true);
      xhr.send();

    },

    isFound: function () {

    	//console.log(cacheList, cacheList.length);
    	if(cacheList.length > 0) {

    		for(var cache in cacheList) {

    			//console.log(cacheList[cache].key, cacheList[cache].cachedObjects);

    		}
    	}    	

    }

  };

  function Cache() {

    this.init = function(options) {

      this.name = options.name || "";

      this.uri = options.uri || "";

      this.expire = options.expire || 24;

      //CacheUtility.readFileContents(this.uri);
            
      cacheList.push({

        key: this.name,
        cachedObjects: [this.uri, this.expire]

      });

      CacheUtility.isFound();

      //console.log(cacheList);

    };

  };

  Cache.prototype = {

    __proto__: {

      constructor: function() {

        return new Cache();

      }

    },


  };

  return {

    __proto__: Cache.prototype.constructor()

  };

})();
