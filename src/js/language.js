
var language; // 全局语言

// 更改语言函数
function changeLanguage(lang) {
    if (lang == "auto") { // 设置为自动
        document.cookie = "pageLanguage=" + "auto" + "; max-age=999999999999999; path=/; ";
        return changeLanguage(undefined);
    }
    else if (lang == undefined) { // 视为页面载入时执行的，而不是更改语言。此种情况作判定
        if (!getCookie('pageLanguage') || getCookie('pageLanguage') == "auto") { // 没有设置Cookie或者Cookie为auto，可以按照浏览器判断，但因为懒，现在只写中文
            lang = "zh_CN";
        }
        else {
            // 设置了 Cookie，按Cookie来
            lang = getCookie('pageLanguage');
        }
    }
    else {
        document.cookie = "pageLanguage=" + lang + "; max-age=999999999999999; path=/; ";
    }
    language = lang;
    if(language!="zh_CN"&language!="zh_TW")
    //加宽设置
    headerClickMenu.className=" clickMenu widden";
    else headerClickMenu.className=" clickMenu ";
    i18n.init(
        {
            lng: language,
            // 所有翻译在 /src/locales/ 目录下
            // 注：该目录下的 dev.json 请勿删除
            resGetPath: '/src/locales/__lng__.json'
        },
        function (t) {
            $('html').i18n();
        }
    );
}
changeLanguage();



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}