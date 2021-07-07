logURL = "https://accounts.nmteam.ml";
apiURL = "https://api-nmteam.agou.im";
thisIsEnglish = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./?<>-=+_:;'`\"\\[]{}()*&^%$#@!~ ";
thisIsNumber = "1234567890";
transHeadA = "https://translate.google.cn/?sl=auto&tl=auto&text=";
transHeadB = "&op=translate";

// 初始设置
if (localStorage.getItem("started") == null) {
    document.getElementsByTagName("body")[0].setAttribute("firstTime", "true");
    loadingCover.setAttribute("hidden", "false");
    headerClickMenu.setAttribute("firstTime", "true");
    header.setAttribute("firstTime", "true");
    // 默认选项
    localStorage.setItem("theme", "auto");
    setTheme();
    localStorage.setItem("search", "true");
    setSearch();
    localStorage.setItem("quickAccess", "true");
    setQuickAccess();
    localStorage.setItem("bgImage", "bing");
    localStorage.setItem("imgZdyLink", "");
    setBgImg();
    localStorage.setItem("bg", "true");
    setBg();
    localStorage.setItem("shide", "true");
    setSh();
    localStorage.setItem("searchE", "baidu");
    setSearchE();
    localStorage.setItem("searchH", "true");
    setSearchH();
    localStorage.setItem("siteMap", "true");
    setMap();
    localStorage.setItem("news", "true");
    setNews();
    localStorage.setItem("sh", "true");
    setSh();
    localStorage.setItem("time", "false");
    setTime();
    localStorage.setItem("wea", "LTB");
    setWea();
}

startUsing.onclick = function () {
    localStorage.setItem("started", "true");
    loadingCover.setAttribute("hidden", "true");
    headerClickMenu.setAttribute("firstTime", "false");
    header.setAttribute("firstTime", "false");
    document.getElementsByTagName("body")[0].setAttribute("firstTime", "false");
}

// Header 动画
maindiv.onscroll = function () {
    if (maindiv.scrollTop < 90) {
        scrollPercent = 1 - (90 - maindiv.scrollTop) / 180;
        headerlogotexth.setAttribute("hidden", "true");
        leftTime.setAttribute("hidden", "true");
        headerlogo.setAttribute("left", "false");
    }
    else {
        headerlogotexth.setAttribute("hidden", "false");
        leftTime.setAttribute("hidden", "false");
        headerlogo.setAttribute("left", "true");
        scrollPercent = 1;
    }
    header.style.height = (240 - 180 * scrollPercent) + "px"; // 变更总高度
    headerlogo.style.top = (5 + 3 * scrollPercent) + "%"; // Logo top 由5变8
    headerlogo.style.bottom = (28 - 20 * scrollPercent) + "%"; // Logo bottom 由28变8
    // if (maindiv.scrollTop <= 0) { //高度小于80时Logotext第一阶段调整
    headerlogotext.style.top = (57 + 9 * 2 * scrollPercent) + "%"; // Logot top 由57变66
    headerlogotext.style.bottom = (-10 - 9 * 2 * scrollPercent) + "%"; // Logot bottom 由-10变-19
    // }
    // else { //Logotext第二阶段，保持Logotext绝对位置不变
    // headerlogotext.style.transform="scale("+(5*(1.5-scrollPercent)-4)+")";
    headerlogotext.style.opacity = 3 - 4 * scrollPercent;
    // headerlogotext.style.top = (66 + 95 * (scrollPercent - 0.5)) + "%"; // Logot top 由66变161
    // headerlogotext.style.bottom = (-19 - 173 * (scrollPercent - 0.5)) + "%"; // Logot bottom 由-19变-192
    // }
    searchScrollPercent = -(window.innerHeight / 2 - maindiv.scrollTop - 190) / 80;
    // 搜索框动画
    if (searchScrollPercent < 0) searchScrollPercent = 0;
    // 这种方案对移动设备不友好
    // searchScrollPercent 大于1时首先让搜索框能够悬停
    // searchBox.style.transform = "translate(0," + 80 * searchScrollPercent + "px)";
    // searchBox.style.top = "" + 80 * searchScrollPercent + "px";
    // if (searchScrollPercent > 1) searchScrollPercent = 1;
    if (searchScrollPercent > 0) {
        // searchBox.setAttribute("fixed", "true");
    }
}


// 点击Header，自动回到顶部
header.onclick = function () {
    // while (maindiv.scrollTop != "0") {
    //     setTimeout(function () { maindiv.scrollTop--; }, 530);
    // }
}

// 搜索
function search() {
    if (IsURL(searchInput.value))
        window.location.href = searchInput.value;
    else {
        try {
            searchIsEnglish && hasDot && !hasSpace;
        }
        catch (err) {
            searchIsEnglish = hasDot = hasSpace = false;
        }
        if (searchIsEnglish && hasDot && !hasSpace)
            window.location.href = "http://" + searchInput.value;
        else
            window.location.href = searchHead + searchInput.value;

    }
}
searchInput.onfocus = function () {
    if (localStorage.getItem("shide") == "true")
        bodybg.setAttribute("blur", "true");
}
searchHelper.getElementsByTagName("div").onmouseover = function () {
    if (localStorage.getItem("shide") == "true")
        bodybg.setAttribute("blur", "true");
}
// searchBox.onmouseout = function () {
//     bodybg.setAttribute("blur", "false");
// }
searchInput.onblur = function () {
    bodybg.setAttribute("blur", "false");
}

// 搜索预测
/* 预测逻辑：
 * 如果直接是URL：跳转、搜索、搜索预测
 * 如果输入有小数点，同时纯英文没有中文、无空格：跳转网址、搜索、翻译、搜索预测
 * 如果输入无小数但纯英文没有中文：翻译、跳转网址、搜索、搜索预测
 * 如果输入有中文：搜索、搜索预测
 * 
 * 注：翻译仅在语言为简体中文、繁体中文、日文开启，页面语言为英语则不提供翻译
 */

// 搜索预测主进程

searchBox.oninput = function () {
    searchHelperMain();
}

function searchHelperMain() {
    newSearchHelperHTML = "";
    typedWord = searchInput.value;
    typedLength = typedWord.length;
    // 如果搜索框为空什么都不做
    if (typedWord) noShowHelper = false;
    else noShowHelper = true;
    // 判断是不是URL
    if (IsURL(typedWord)) {
        isURL = true;
        console.log("Search words must be an URL");
    }
    else {
        isURL = false;
        // 判断是不是纯英文
        searchIsEnglish = true;
        for (searchEnglish = 0; searchEnglish < typedLength; searchEnglish++) {
            for (searchEngSB = 0; searchEngSB < thisIsEnglish.length; searchEngSB++) {
                if (typedWord[searchEnglish] == thisIsEnglish[searchEngSB])
                    break;
                else if (searchEngSB == thisIsEnglish.length - 1) {
                    searchIsEnglish = false;
                    console.log("The words contains something that doesn't belong to English");
                }
            }
            if (!searchIsEnglish) break;
        }
        // 判断有没有小数点儿
        if (typedWord.match(/\./g)) {
            hasDot = true;
            console.log("There're dot(s) in search words");
        }
        else hasDot = false;
        // 判断有没有空格
        if (typedWord.match(/ /g)) {
            hasSpace = true;
            console.log("There're space(s) in search words");
        }
        else hasSpace = false;
    }
    // 执行操作选取部分
    // 设置新数据暂存
    // 如果非URL不可：跳转、搜索、搜索预测
    if (!noShowHelper) {
        if (isURL) {
            newSearchHelperHTML = shNB("jump") + shNB("search") + shNB("sp");
        }
        // 如果不一定是URL但是既有小数点又是纯英文还没有空格：跳转网址、搜索、翻译、搜索预测
        else if (searchIsEnglish && hasDot && !hasSpace) {
            newSearchHelperHTML = shNB("jump") + shNB("search") + shNB("trans") + shNB("sp");
        }
        // 如果不一定是URL但是既有小数点又是纯英文但是有空格：搜索、翻译、搜索预测
        else if (searchIsEnglish && hasDot && hasSpace) {
            newSearchHelperHTML = shNB("search") + shNB("trans") + shNB("sp");
        }
        // 如果输入无小数但纯英文没有中文：翻译、跳转网址、搜索、搜索预测
        else if (searchIsEnglish) {
            newSearchHelperHTML = shNB("trans") + shNB("jump") + shNB("search") + shNB("sp");
        }
        // 如果输入有中文：搜索、搜索预测
        else if (!searchIsEnglish) {
            newSearchHelperHTML = shNB("search") + shNB("trans") + shNB("sp");
        }
    }
    searchHelper.innerHTML = newSearchHelperHTML;
    // 设置searchHelper的大小
    helperTotalLength = searchHelper.getElementsByTagName("div").length;
    if (helperTotalLength != 0)
        helperPlus = 6;
    else helperPlus = 0;
    changeLanguage();
    searchHelper.style.height = (helperTotalLength * 36 + helperPlus) + "px";
}

// 放置一个搜索预测块
function shNB(type, value = searchInput.value) {
    switch (type) {
        case "jump":
            shNBGoTip = '<l> </l>' + i18n.t('searchTip.go') + '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M849.740351 565.894737c-17.066667 0-31.438596 14.37193-31.438597 31.438596v208.392983h-589.249122V233.54386h222.764912c17.066667 0 31.438596-14.37193 31.438596-31.438597s-14.37193-31.438596-31.438596-31.438596H206.596491c-22.45614 0-41.319298 17.964912-41.319298 41.319298v615.298246c0 22.45614 17.964912 41.319298 41.319298 41.319298H839.859649c22.45614 0 40.421053-17.964912 40.421053-41.319298v-229.950878c0.898246-17.066667-13.473684-31.438596-30.540351-31.438596z" p-id="5314"></path><path d="M532.659649 540.74386c8.084211 0 16.168421-2.694737 21.557895-8.982456l257.796491-249.712281v193.122807c0 17.066667 14.37193 31.438596 31.438597 31.438596s31.438596-14.37193 31.438596-31.438596v-263.185965c0-22.45614-17.964912-40.421053-40.421053-40.421053h-267.677193c-17.066667 0-31.438596 14.37193-31.438596 31.438597s14.37193 31.438596 31.438596 31.438596h203.901755l-260.491228 252.407018c-12.575439 11.677193-12.575439 32.336842-0.898246 44.014035 7.185965 6.287719 15.270175 9.880702 23.354386 9.880702z" p-id="5315"></path></svg>';
            // 如果输入框的网址没有协议头，咱给他加一个http
            if (!isURL)
                shNBGoURL = 'http://' + typedWord;
            else shNBGoURL = typedWord;
            break;
        case "search":
            shNBGoTip = '<l> </l>' + i18n.t('searchTip.search') + '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M400.696889 801.393778A400.668444 400.668444 0 1 1 400.696889 0a400.668444 400.668444 0 0 1 0 801.393778z m0-89.031111a311.637333 311.637333 0 1 0 0-623.331556 311.637333 311.637333 0 0 0 0 623.331556z"></path><path d="M667.904 601.998222l314.766222 314.823111-62.919111 62.976-314.823111-314.823111z"></path></svg>';
            shNBGoURL = searchHead + typedWord;
            break;
        case "trans":
            shNBGoTip = '<l> </l>' + i18n.t('searchTip.trans') + '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M549.12 642.986667l-108.373333-107.093334 1.28-1.28A747.52 747.52 0 0 0 600.32 256H725.333333V170.666667h-298.666666V85.333333H341.333333v85.333334H42.666667v84.906666h476.586666C490.666667 337.92 445.44 416 384 484.266667 344.32 440.32 311.466667 392.106667 285.44 341.333333h-85.333333c31.146667 69.546667 73.813333 135.253333 127.146666 194.56l-217.173333 214.186667L170.666667 810.666667l213.333333-213.333334 132.693333 132.693334 32.426667-87.04zM789.333333 426.666667h-85.333333L512 938.666667h85.333333l47.786667-128h202.666667L896 938.666667h85.333333l-192-512z m-111.786666 298.666666l69.12-184.746666L815.786667 725.333333h-138.24z" p-id="2400"></path></svg>';
            shNBGoURL = transHeadA + typedWord + transHeadB;
            break;
        case "sp":
            return "";
    }
    return `<div tabindex="2"onclick="window.location.href='` + shNBGoURL + `'">` + value + `<goTip>` + shNBGoTip + `</goTip></div>`;
}

//上下键事件



// 监听键盘
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e && e.keyCode == 38) {//上
        helperMove("up");
    }

    if (e && e.keyCode == 40) {//下
        helperMove("down");
    }
};

// 顶部按钮
function openHeaderMenu() {
    headerClickMenu = document.getElementById("headerClickMenu");
    if (headerClickMenu.getAttribute("open") == "true") {
        headerClickMenu.setAttribute("open", "false");
    } else {
        headerClickMenu.setAttribute("open", "true");
        noSuchCover.className = "opened";
    }
}

// 设置
lightThemeB.onclick = function () {
    localStorage.setItem("theme", "light");
    setTheme();
}
darkThemeB.onclick = function () {
    localStorage.setItem("theme", "dark");
    setTheme();
}
autoThemeB.onclick = function () {
    localStorage.setItem("theme", "auto");
    setTheme();
}
imgThemeB.onclick = function () {
    alert("This feature will come soon.");
}
searchB.onclick = function () {
    localStorage.setItem("search", "true");
    setSearch();
}
noSearchB.onclick = function () {
    localStorage.setItem("search", "false");
    setSearch();
}
searchHB.onclick = function () {
    localStorage.setItem("searchH", "true");
    setSearchH();
}
bSearchHB.onclick = function () {
    localStorage.setItem("searchH", "url");
    setSearchH();
}
noSearchHB.onclick = function () {
    localStorage.setItem("searchH", "false");
    setSearchH();
}
linkOpenB.onclick = function () {
    localStorage.setItem("quickAccess", "true");
    setQuickAccess();
}
linkCloseB.onclick = function () {
    localStorage.setItem("quickAccess", "false");
    setQuickAccess();
}
bgOpenB.onclick = function () {
    localStorage.setItem("bg", "true");
    setBg();
}
bgCloseB.onclick = function () {
    localStorage.setItem("bg", "false");
    setBg();
}
imgBingB.onclick = function () {
    localStorage.setItem("bgImage", "bing");
    setBgImg();
}
img2cyB.onclick = function () {
    localStorage.setItem("bgImage", "2cy");
    setBgImg();
}
imgZdyB.onclick = function () {
    localStorage.setItem("bgImage", "zdy");
    setBgImg(true);
}
sBaiduB.onclick = function () {
    localStorage.setItem("searchE", "baidu");
    setSearchE();
}
sBingB.onclick = function () {
    localStorage.setItem("searchE", "bing");
    setSearchE();
}
sGoogleB.onclick = function () {
    localStorage.setItem("searchE", "google");
    setSearchE();
}
mapOpenB.onclick = function () {
    localStorage.setItem("siteMap", "true");
    setMap();
}
mapCloseB.onclick = function () {
    localStorage.setItem("siteMap", "false");
    setMap();
}
newsOpenB.onclick = function () {
    localStorage.setItem("news", "true");
    setNews();
}
newsCloseB.onclick = function () {
    localStorage.setItem("news", "false");
    setNews();
}
shOpenB.onclick = function () {
    localStorage.setItem("shide", "true");
    setSh();
}
shCloseB.onclick = function () {
    localStorage.setItem("shide", "false");
    setSh();
}
timeOpenB.onclick = function () {
    localStorage.setItem("time", "true");
    setTime();
}
timeCloseB.onclick = function () {
    localStorage.setItem("time", "false");
    setTime();
}
weaLTB.onclick = function () {
    localStorage.setItem("wea", "LTB");
    setWea();
}
weaRTB.onclick = function () {
    localStorage.setItem("wea", "RTB");
    setWea();
}
weaCloseB.onclick = function () {
    localStorage.setItem("wea", "false");
    setWea();
}
aboutC.onclick = function () {
    aboutBox.setAttribute("open", "true");
    msgBoxCover.className = "open";
}
aboutClose.onclick = function () {
    aboutBox.setAttribute("open", "false");
    msgBoxCover.className = "";
}
function resetButton(id) {
    FEle = document.getElementById(id);
    CEle = FEle.getElementsByClassName("value")[0].getElementsByTagName("button");
    for (reset = 0; reset < CEle.length; reset++) {
        CEle[reset].className = "";
    }
}
// 设置主题
setTheme();
function setTheme() {
    resetButton("themeC");
    toSet = localStorage.getItem("theme");
    if (toSet == "light") {
        lightThemeB.className = "on";
    }
    if (toSet == "dark") {
        darkThemeB.className = "on";
    }
    if (toSet == "auto") {
        autoThemeB.className = "on";
        if (window.matchMedia('(prefers-color-scheme)').media != 'not all' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toSet = "dark";
        }
        else toSet = "light";
    }
    console.log("Set theme to " + toSet);
    // new_element = document.createElement('link');
    // new_element.setAttribute('rel', 'stylesheet');
    if (toSet == "dark")
        // new_element.setAttribute('href', '/src/css/dark.css');
        // else new_element.setAttribute('href', '/src/css/common.css');
        // document.body.appendChild(new_element);
        document.getElementsByTagName("body")[0].className = "dark";
    else document.getElementsByTagName("body")[0].className = "";
}
setSearch();
function setSearch() {
    resetButton("searchC");
    toSet = localStorage.getItem("search");
    if (toSet == "true") {
        searchB.className = "on";
        searchBox.className = "open";

    }
    if (toSet == "false") {
        noSearchB.className = "on";
        searchBox.className = "closed";
    }
    console.log("Set search to " + toSet);
}
setSearchH();
function setSearchH() {
    resetButton("searchHC");
    toSet = localStorage.getItem("searchH");
    if (toSet == "true") {
        searchHB.className = "on";
    }
    if (toSet == "false") {
        noSearchHB.className = "on";
    }
    if (toSet == "url") {
        bSearchHB.className = "on";
    }
    console.log("Set searchH to " + toSet);
}
setSh();
function setSh() {
    resetButton("shideC");
    toSet = localStorage.getItem("shide");
    if (toSet == "true") {
        shOpenB.className = "on";
    }
    if (toSet == "false") {
        shCloseB.className = "on";
    }
    console.log("Set shide to " + toSet);
}
setSearchE();
function setSearchE() {
    resetButton("searchEC");
    toSet = localStorage.getItem("searchE");
    if (toSet == "baidu") {
        sBaiduB.className = "on";
        searchHead = "https://baidu.com/s?wd=";
    }
    if (toSet == "bing") {
        sBingB.className = "on";
        searchHead = "https://www.bing.com/search?q=";
    } if (toSet == "google") {
        sGoogleB.className = "on";
        searchHead = "https://www.google.com/search?q=";
    }
    console.log("Set search engine to " + toSet);
}
setQuickAccess();
function setQuickAccess() {
    resetButton("quickAccessC");
    toSet = localStorage.getItem("quickAccess");
    if (toSet == "true") {
        linkOpenB.className = "on";
        myLoves.className = "open";
    }
    if (toSet == "false") {
        linkCloseB.className = "on";
        myLoves.className = "closed";
    }
    console.log("Set quick access to " + toSet);
    // 加载页面时输出
    if (localStorage.getItem("quickAccess") != "false") {
        links = JSON.parse(localStorage.getItem("fastLinks"));
        if (links) {
            myLoves.innerHTML = "";
            for (lLinkCache = 0; lLinkCache < Object.keys(links).length; lLinkCache++) {
                nowLinkInfo = links[lLinkCache];
                if (nowLinkInfo.img)
                    linkImgSrc = nowLinkInfo.img;
                else
                    linkImgSrc = `https://www.google.cn/s2/favicons?domain=` + nowLinkInfo.add;
                myLoves.innerHTML += `<a href="` + nowLinkInfo.add + `" class="myLove" oncontextmenu=" fastMenu(` + lLinkCache + `);return false; ">
                <img src="`+ linkImgSrc + `"onerror='this.src="data:image/png;base64,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";' />
                <p>` + nowLinkInfo.name + `</p><object><a href="javascript:" onclick="fastMenu(` + lLinkCache + `);"></a></object></a> `;
            }
            if (lLinkCache < 8) {
                myLoves.innerHTML += `
                    <a href="javascript:addInPage();" class="myLove">
                <img src="/src/img/add.png"; />
                <p></p></a> `;
            }
        }
    }
}
setMap();
function setMap() {
    resetButton("siteMapC");
    toSet = localStorage.getItem("siteMap");
    if (toSet == "true") {
        mapOpenB.className = "on";
        mapContainer.className = "open";
    }
    if (toSet == "false") {
        mapCloseB.className = "on";
        mapContainer.className = "closed";
    }
    console.log("Set map to " + toSet);
}
setNews();
function setNews() {
    resetButton("newsC");
    toSet = localStorage.getItem("news");
    if (toSet == "true") {
        newsOpenB.className = "on";
        newsContainer.className = "open";
    }
    if (toSet == "false") {
        newsCloseB.className = "on";
        newsContainer.className = "closed";
    }
    console.log("Set news to " + toSet);
}
setTime();
function setTime() {
    resetButton("timeC");
    toSet = localStorage.getItem("time");
    if (toSet == "true") {
        timeOpenB.className = "on";
        headerlogotext.setAttribute("time", "true");
    }
    if (toSet == "false") {
        timeCloseB.className = "on";
        headerlogotext.setAttribute("time", "false");
    }
    console.log("Set time to " + toSet);
}
setBgImg();
function setBgImg(openBox = false) {
    resetButton("bgImageOriC");
    toSet = localStorage.getItem("bgImage");
    if (toSet == "bing") {
        imgBingB.className = "on";
        imgOri = "https://api.mfstudio.cc/bing/";
    }
    if (toSet == "2cy") {
        img2cyB.className = "on";
        imgOri = "https://api.ixiaowai.cn/api/api.php";
    }
    if (toSet == "zdy") {
        imgZdyB.className = "on";
        imgOri = localStorage.getItem("imgZdyLink");
        if (imgOri == undefined || openBox == true) {
            console.warn("Set photo");
            // alert("This feature will come soon.");
            //对话框
            imgPicker.setAttribute("open", "true");
            msgBoxCover.className = "open";
            urlInput.value = imgOri;
        }
    }
    if (localStorage.getItem("bg") == "true")
        bodybg.style.backgroundImage = "url(" + imgOri + ")";
    console.log("Set background photo URL to " + toSet);
}
imgSelect.onclick = function () {
    if (urlInput.value) {
        localStorage.setItem("imgZdyLink", urlInput.value);
        imgPicker.setAttribute("open", "false");
        msgBoxCover.className = "";
    }
    else {
        console.error("没有提供图片地址");
        alert("Please fill the blank.");
    }
}
setBg();
function setBg() {
    resetButton("bgImageC");
    toSet = localStorage.getItem("bg");
    if (toSet == "true") {
        bgOpenB.className = "on";
        bodybg.className = "";
        document.getElementsByTagName("body")[0].setAttribute("halfDark", "false");
    }
    if (toSet == "false") {
        bgCloseB.className = "on";
        bodybg.className = "hidden";
        document.getElementsByTagName("body")[0].setAttribute("halfDark", "true");
    }
    setBgImg();
    console.log("Set background photo to " + toSet);
}
setWea();
function setWea() {
    resetButton("weaC");
    toSet = localStorage.getItem("wea");
    if (toSet == "LTB") {
        weaLTB.className = "on";
        weaContainer.className = "left";
    }
    if (toSet == "RTB") {
        weaRTB.className = "on";
        weaContainer.className = "right";
    } if (toSet == "false") {
        weaCloseB.className = "on";
        weaContainer.className = "hidden";
    }
    console.log("Set weather to " + toSet);
    if (toSet != "false") {
        (function (a, h, g, f, e, d, c, b) { b = function () { d = h.createElement(g); c = h.getElementsByTagName(g)[0]; d.src = e; d.charset = "utf-8"; d.async = 1; c.parentNode.insertBefore(d, c) }; a["SeniverseWeatherWidgetObject"] = f; a[f] || (a[f] = function () { (a[f].q = a[f].q || []).push(arguments) }); a[f].l = +new Date(); if (a.attachEvent) { a.attachEvent("onload", b) } else { a.addEventListener("load", b, false) } }(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10)));
        window.SeniverseWeatherWidget('show', {
            flavor: "bubble",
            location: "WX4FBXXFKE4F",
            geolocation: true,
            language: "zh-Hans",
            unit: "c",
            theme: "auto",
            token: "00d16a54-7153-4de3-b831-1a62a3d08080",
            hover: "enabled",
            container: "tp-weather-widget"
        })
    }
}

window.onload = function () {
    // 加载天气
    if (localStorage.getItem("wea") != "false")
        userPositionJSON = getJSON("https://api.live.bilibili.com/client/v1/Ip/getInfoNew");
}

// 链接管理器

linkManageB.onclick = function () {
    linkEdit.setAttribute("open", "true");
    msgBoxCover.className = "open";
    links = JSON.parse(localStorage.getItem("fastLinks"));
    linkEditBlock.innerHTML = "";
    for (linkCache = 0; linkCache < Object.keys(links).length; linkCache++) {
        nowLinkInfo = links[linkCache];
        linkEditBlock.innerHTML += `<div class="singleLink" id="link` + linkCache + `"><input name="name" placeholder="Friendly Name" value="` + nowLinkInfo.name + `"> <input name="address" placeholder="Address" value="` + nowLinkInfo.add + `"> <input name="img" placeholder="Image" style="display: none" value="` + nowLinkInfo.img + `"> <button onclick="upLink(` + linkCache + `)" title="Up">↑</button> <button onclick="downLink(` + linkCache + `)" title="Down">↓</button> <button onclick="delLink(` + linkCache + `)" title="Delete">×</button></div>`;
    }
}
function delLink(id) {
    document.getElementById("link" + id).outerHTML = "";
}
function addLink() {
    if (linkEditBlock.getElementsByClassName("singleLink").length >= 8) {
        return alert("You have already created 8 links. ");
    }
    linkCache++;
    linkFC = linkEditBlock.innerHTML;
    linkEditBlock.innerHTML = linkFC + `<div class="singleLink" id="link` + linkCache + `"><input name="name" placeholder="Friendly Name"> <input name="address" placeholder="Address"> <input name="img" placeholder="Image" style="display: none"> <button onclick="upLink(` + linkCache + `)" title="Up">↑</button> <button onclick="downLink(` + linkCache + `)" title="Down">↓</button><button onclick="delLink(` + linkCache + `)" title="Delete">×</button></div>`;
}
function upLink(id) {
    linkPlace = whereIsLink(id);
    if (linkPlace == 0 || linkPlace == -1)
        return -1;
    placeHTMLCache = linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML = "";
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace - 1].outerHTML = placeHTMLCache + linkEditBlock.getElementsByClassName("singleLink")[linkPlace - 1].outerHTML;
}
function downLink(id) {
    linkPlace = whereIsLink(id);
    if (linkPlace == linkEditBlock.getElementsByClassName("singleLink").length || linkPlace == -1)
        return -1;
    placeHTMLCache = linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace + 1].outerHTML = linkEditBlock.getElementsByClassName("singleLink")[linkPlace + 1].outerHTML + placeHTMLCache;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML = "";
}
function whereIsLink(id) {
    for (whereIsCache = 0; whereIsCache < linkEditBlock.getElementsByClassName("singleLink").length; whereIsCache++) {
        if (linkEditBlock.getElementsByClassName("singleLink")[whereIsCache] == document.getElementById("link" + id)) {
            return whereIsCache;
        }
    }
    return -1;
}
outLinks.onclick = function () {
    saveLinks.click();
    copy(localStorage.getItem("fastLinks"));
    alert("Copied. ");
}
inLinks.onclick = function () {
    inLinksStr = prompt("Paste the item to import: ", "");
    try {
        JSON.parse(inLinksStr);
        localStorage.setItem("fastLinks", inLinksStr);
    }
    catch (err) {
        alert("The JSON has been destroyed. <br />Detail: " + err);
    }
    linkManageB.click();
}
saveLinks.onclick = function () {
    var saveJSON = {};
    for (saveCache = 0; saveCache < linkEditBlock.getElementsByClassName("singleLink").length; saveCache++) {
        nowSaving = linkEditBlock.getElementsByClassName("singleLink")[saveCache];
        saveName = nowSaving.getElementsByTagName("input")[0].value;
        saveAdd = nowSaving.getElementsByTagName("input")[1].value;
        saveImg = nowSaving.getElementsByTagName("input")[2].value;
        saveJSON[saveCache] = {};
        saveJSON[saveCache].name = saveName;
        saveJSON[saveCache].add = saveAdd;
        saveJSON[saveCache].img = saveImg;
    }
    localStorage.setItem("fastLinks", JSON.stringify(saveJSON));
    linkEdit.setAttribute("open", "false");
    msgBoxCover.className = "";
    setQuickAccess();
}
cancelLinks.onclick = function () {
    linkEdit.setAttribute("open", "false");
    msgBoxCover.className = "";
}
closeSynchronizeBox.onclick = function () {
    synchronizeBox.setAttribute("open", "false");
    msgBoxCover.className = "";
}
// 右键快速链接的菜单
function fastMenu(id) {
    new_element = document.createElement('div');
    new_element.setAttribute('id', 'fastMenu' + id);
    new_element.setAttribute('class', 'clickMenu fastMenu ');
    new_element.setAttribute('open', 'true');
    new_element.setAttribute('linkId', id);
    document.body.appendChild(new_element);
    menu = document.getElementById('fastMenu' + id);
    toBottom = window.innerHeight - mouseY + 160;
    menu.style.bottom = toBottom + "px";
    toLeft = mouseX;
    if (toLeft > 290)
        toLeft -= 230;
    menu.style.left = toLeft + "px";
    menu.style.zIndex = "66668";
    links = JSON.parse(localStorage.getItem("fastLinks"));
    editingLink = links[id];
    menu.innerHTML = `
    <div><input placeholder="Name" value="`+ editingLink.name + `"></div>
    <div><input placeholder="Address"value="`+ editingLink.add + `"></div>
    <div><input placeholder="Logo URL"value="`+ editingLink.img + `"></div>
    <div class="delete" data-i18n="delete" onclick="deleteLinkInPage(`+ id + `)">删除</div>`
        ;
    noSuchCover.className = "opened";
}
function deleteLinkInPage(id) {
    id = document.getElementsByClassName("fastMenu")[0].getAttribute("linkId");
    links = JSON.parse(localStorage.getItem("fastLinks"));
    oriLength = Object.keys(links).length;
    // delete links[id];
    // if(id!= oriLength)//删除了不是最后一项
    for (deleteMove = id; deleteMove < oriLength; deleteMove++) {
        nmxyz = links[Number(deleteMove) + 1];
        links[deleteMove] = nmxyz;
    }
    delete links[oriLength - 1];
    localStorage.setItem("fastLinks", JSON.stringify(links));
    hideMenu(true);
}
function addInPage() {
    links = JSON.parse(localStorage.getItem("fastLinks"));
    oriLength = Object.keys(links).length;
    links[oriLength] = {};
    links[oriLength].name = "";
    links[oriLength].add = "";
    links[oriLength].img = "";
    localStorage.setItem("fastLinks", JSON.stringify(links));
    setQuickAccess();
    fastMenu(oriLength);
}
function hideMenu(nosave = false) {
    if (!nosave & document.getElementsByClassName("fastMenu").length) {
        id = document.getElementsByClassName("fastMenu")[0].getAttribute("linkId");
        links = JSON.parse(localStorage.getItem("fastLinks"));
        editingLink = links[id];
        editingLink.name = document.getElementsByClassName("fastMenu")[0].getElementsByTagName("input")[0].value;
        editingLink.add = document.getElementsByClassName("fastMenu")[0].getElementsByTagName("input")[1].value;
        editingLink.img = document.getElementsByClassName("fastMenu")[0].getElementsByTagName("input")[2].value;
        localStorage.setItem("fastLinks", JSON.stringify(links));
    }
    headerClickMenu.setAttribute("open", "false");
    noSuchCover.className = "";
    document.getElementsByClassName("fastMenu")[0].outerHTML = "";
    setQuickAccess();
}
noSuchCover.onclick = function () {
    hideMenu();
}

function IsURL(strUrl) {
    if (strUrl.slice(0, 7) == "http://" || strUrl.slice(0, 8) == "https://" || strUrl.slice(0, 7) == "ftps://" || strUrl.slice(0, 6) == "ftp://")
        return true;
    else return false;
}

function copy(textToCopy) {
    copyTextBox.innerHTML = textToCopy;
    copyTextBox.select();
    document.execCommand("copy");
    return 0;
}

setInterval(function () {
    var time = new Date();
    timeText = fix(time.getHours()) + ":" + fix(time.getMinutes());
    leftTime.innerHTML = timeText;
    headerlogotext.innerHTML = timeText;
}, 100);

function fix(num) {
    if (num < 10)
        return "0" + num;
    else return num;
}

window.onmousemove = function (event) {
    mouseX = event.screenX;
    mouseY = event.screenY;
};

// 登录账户
window.onload = function () {
    if (localStorage.getItem("showDevBut") == "true") {
        developerButton.style.display = "inline";
    }
    document.getElementsByTagName("body")[0].setAttribute("transition", "true");
    getInfo(function (accountInfo) {
        accountBox.setAttribute("onclick", "window.location.href=`" + logURL + "?name=target.browser_home_page&returnto=" + window.location.href + "&msg=msg.browser_home_page`");
        if (accountInfo == -1) {
            nickBox.innerHTML = "<span data-i18n='account.click_to_log'></span>";
        }
        else if (accountInfo == -2) {
            nickBox.innerHTML = "<span data-i18n='account.unable_to_load'></span>";
        }
        else {
            avatarBox.style.backgroundImage = "url(" + accountInfo['avatar'] + ")";
            nickBox.innerHTML = accountInfo['nick'];
            accountBox.setAttribute("onclick", "window.open(`" + logURL + "/info.html?sessionid=" + getCookie("PHPSESSID") + "`)");
        }
        changeLanguage();
    });
}

synchronizeB.onclick = function () {
    synchronizeBox.setAttribute("open", "true");
    msgBoxCover.className = " open ";
}
synchronizeFastLinksOpen.onclick = function () {
    setFastLink(true);
    synchronizeFastLinksOpen.setAttribute("open", "true");
    synchronizeFastLinksClose.setAttribute("open", "false");
}
synchronizeFastLinksClose.onclick = function () {
    setFastLink(false);
    synchronizeFastLinksClose.setAttribute("open", "true");
    synchronizeFastLinksOpen.setAttribute("open", "false");
}
function setFastLink(to) {
    if (!to)
        setFastLinkTo = "?uninit";
    else
        setFastLinkTo = "";
    setFastLinkResult = loadc(apiURL + "/browser/init.php" + setFastLinkTo);
}

// DIV Enter 打开
function divClick(div, event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        div.click();
    }
}

function alert(msg) {
    alertDate = new Date();
    alertTime = alertDate.getTime();
    new_element = document.createElement('div');
    new_element.setAttribute('id', 'smallMsg' + alertTime);
    new_element.setAttribute('class', 'msgBox smallMsg');
    document.body.appendChild(new_element);
    document.getElementById('smallMsg' + alertTime).innerHTML = `<p>` + msg + `</p>
    <button data-i18n="close" onclick="document.getElementById('smallMsg`+ alertTime + `').setAttribute('open','false'); msgBoxCover.setAttribute('smallMsg','false');document.getElementById('smallMsg` + alertTime + `').outerHTML='';"></button>`;
    changeLanguage();
    document.getElementById('smallMsg' + alertTime).setAttribute("open", "true");
    msgBoxCover.setAttribute("smallMsg", "true");
}
function loadc(name) {
    $.ajax(name, {
        type: "GET",
        async: false,
        data: {},
        crossDomain: true,
        datatype: "jsonp",
        xhrFields: { withCredentials: true },
        success: function (data) {
            let status = data['status'];
            toReturn = data['info'];

        },
        error: function () {
            toReturn = "error";
        }
    });
    return toReturn;
}
// 工程菜单
function showDeveloperMenu() {
    try { showDeveloperMenuNum++; }
    catch (e) { showDeveloperMenuNum = 0; }
    if (showDeveloperMenuNum >= 6) {
        developerMenu.setAttribute("open", "true");
        developerButton.style.display = "inline";
    }
}

function hideDeveloperMenu() {
    showDeveloperMenuNum = 0;
    developerMenu.setAttribute("open", "false");
}

function errorChecker() {
    errorCheckResultBox.innerHTML = "Running...";
    runChecker = new Function(errorCheckInputBox.value);
    try {
        errorCheckResultBox.innerHTML = runChecker();
    } catch (err) {
        errorCheckResultBox.innerHTML += `
---------
`+ err;
    }
}