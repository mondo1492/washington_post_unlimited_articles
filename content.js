(function () {
    "use strict";
    if (window.location.host === 'www.washingtonpost.com') {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }

})();
