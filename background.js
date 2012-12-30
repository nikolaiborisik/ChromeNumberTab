(function(){



    chrome.tabs.onUpdated.addListener(ChromeNumberTabsApi.refreshTabsNumber);
    chrome.tabs.onSelectionChanged.addListener(ChromeNumberTabsApi.refreshTabsNumber);
    chrome.tabs.onMoved.addListener(ChromeNumberTabsApi.refreshTabsNumber);

})();