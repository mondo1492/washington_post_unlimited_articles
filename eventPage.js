(() => {
    'use strict';

    const removeWPspecificCookies = () => {
        const removeCookie = cookie => {
            let url = 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
            chrome.cookies.remove({'url': url, 'name': cookie.name});
        };

        chrome.cookies.getAll({domain: '.washingtonpost.com'}, all_cookies => {
            all_cookies.forEach( cookie => {
              removeCookie(cookie);
            })
        });
        return 'COOKIES_CLEARED';

    };

    chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
      if (changeInfo.status == 'complete') {
        removeWPspecificCookies();
      }
     });

    chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
        if (request === 'CLEAR_COOKIES_URL_UPDATE') {
            sendResponse(removeWPspecificCookies());
        }
    });
})();
