(function () {
    var SHARP_STYLE = '1',
        SQUARE_STYLE = '2',
        PARENTHESES_STYLE = '3';

    window.ChromeNumberTabsApi = {
        refreshTabsNumber : function () {
            chrome.tabs.getAllInWindow(null, function (tabs) {

                for (var i = 0; i < tabs.length; i++) {
                    var t = tabs[i],
                        title = t.title,
                        isShowIndex = t.index < 8 || i === (tabs.length - 1),
                        index = i === (tabs.length - 1) && t.index >= 8 ? 9 : t.index + 1;

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