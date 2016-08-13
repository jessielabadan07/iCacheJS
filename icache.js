var ICache = (function(window) {

  CacheUtility = {

    readFileContents: function(uri, fn) {

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

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              var script = document.createElement('script');
              script.innerText = xhr.responseText;
              document.documentElement.firstChild.appendChild(script);
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
        xhr.open('GET', uri, true);
        xhr.send();
      } catch (err) {
        console.log("There's an error to your request. Status: " + err);
      }

    },

    isFound: function(name) {

      return (name in window.localStorage);

    }

  };

  function Cache() {

    this.init = function(options, fn) {

      this.name = options.name || "";

      this.uri = options.uri || "";

      this.expire = options.expire || 24;

      if (!CacheUtility.isFound(this.name)) {
        window.localStorage[this.name] = JSON.stringify(options);
      } else {
        try {

          CacheUtility.readFileContents(this.uri, fn);
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
