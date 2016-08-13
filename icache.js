var ICache = (function(window) {

  var xhr = null;

  CacheUtility = {

    putFileContents: function(options, fn) {

      var xhr = null;

      if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
            console.log("There's an error to your request.");
          }
        }
      } else if (window.XMLHttpRequest)
        xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        // If it is ready
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              var script = document.createElement('script');
              script.innerText = xhr.responseText;
              document.documentElement.firstChild.appendChild(script);
              options.contents = xhr.responseText;
              window.localStorage[options.name] = JSON.stringify(options);
              fn();
            } catch (err) {
              console.log("There's an error to your request." + err);
            }
          } else {
            console.log("There's an error to your request. Status: " + xhr.statusText);
          }

        }

      }

      try {
        // Open connection
        xhr.open('GET', options.uri, true);
        xhr.send();
      } catch (err) {
        console.log("There's an error to your request. Status: " + err);
      }

    },

    readFileContents: function(name, fn) {

      if (name in window.localStorage) {
        try {
          var script = document.createElement('script');
          var cachedObjects = JSON.parse(window.localStorage[name]);
          script.innerText = cachedObjects.contents;
          document.documentElement.firstChild.appendChild(script);
          fn();
        } catch (err) {
          console.log(err)
        }
      }

    },

    isFound: function(name) {

      return (name in window.localStorage);

    }

  };

  function Cache() {

    this.init = function(options, fn) {

      if (!CacheUtility.isFound(options.name)) {
        try {
          CacheUtility.putFileContents(options, fn);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          CacheUtility.readFileContents(options.name, fn);
        } catch (err) {
          console.log(err);
        }
      }
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

})(this);
