(function () {
    var SHARP_STYLE = '1',
        SQUARE_STYLE = '2',
        PARENTHESES_STYLE = '3',

        //only 1 -8 and last tab has hotkey
        TABS_WITH_HOTKEY = 8,
        LAST_TAB_HOTKEY = 9;

    window.ChromeNumberTabsApi = {
        refreshTabsNumber : function () {
            chrome.tabs.getAllInWindow(null, function (tabs) {

                for (var i = 0, len = tabs.length; i < len; i++) {
                    var t = tabs[i],
                        title = t.title,
                        isShowIndex = t.index < TABS_WITH_HOTKEY || i === (tabs.length - 1),
                        index = i === (tabs.length - 1) && t.index >= TABS_WITH_HOTKEY ? LAST_TAB_HOTKEY : t.index + 1;

                    title = title.replace(/^#\d/, "")
                        .replace(/^\[\d\]/, "")
                        .replace(/^\(\d\)/, "");

                    switch (ChromeNumberTabsApi.getNumberStyle()) {
                        case SHARP_STYLE :
                            title = isShowIndex ? "#" + index + " " + title : title;
                            break;
                        case SQUARE_STYLE:
                            title = isShowIndex ? "[" + index + "] " + title : title;
                            break;
                        case PARENTHESES_STYLE:
                            title = isShowIndex ? "(" + index + ") " + title : title;
                            break;
                    }

                    chrome.tabs.executeScript(t.id, {code:'document.title ="' + title + '";'}, null);
                }
            });
        },

        getNumberStyle:function () {
            return localStorage.getItem('ChromeNumberTabs_style') || SHARP_STYLE;
        },

        setNumberStyle : function (style) {
            return localStorage.setItem('ChromeNumberTabs_style', style);
        }
    };
})();
