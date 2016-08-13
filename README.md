# iCacheJS

##To use the library:

* Add script reference to your page.

  ```html
  <!-- add reference to icache library -->
  <script src="icache.js"></script>
  ```

## Sample

```javascript
/*
  Using our ICache library.
 */

// Initialize
ICache.init({

  uri: 'https://code.jquery.com/jquery-3.1.0.min.js',
  name: 'jquery',
  expire: 24

}, function() {

  $(document).ready(function() {

    console.log('Document is ready.');

  });

});
```
