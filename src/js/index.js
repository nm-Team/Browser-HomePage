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
    localStorage.setItem("bg", "true");
    setBg();
    localStorage.setItem("bgImage", "bing");
    setBgImg();
    localStorage.setItem("shide", "true");
    setSh();
    localStorage.setItem("searchE", "baidu");
    setSearchE();
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
    else window.location.href = searchHead + searchInput.value;
}
searchInput.onfocus = function () {
    if (localStorage.getItem("shide") == "true")
        bodybg.setAttribute("blur", "true");
}
searchInput.onblur = function () {
    bodybg.setAttribute("blur", "false");
}
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
        searchHead = "https://google.com/s?wd=";
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
    console.log("Set background photo to " + toSet);
    setBgImg();
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
    localStorage.setItem("fastLinks", inLinksStr);
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
// fetch

async function getJSON(url) {
    try {
        let response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
        });
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
}
function IsURL(strUrl) {
    var regular = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
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
window.onload = function () {
    setTimeout(() => {
        document.getElementsByTagName("body")[0].setAttribute("transition", "true");
    }, 2000);

}
